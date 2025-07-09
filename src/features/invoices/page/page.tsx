/* eslint-disable react-refresh/only-export-components */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/custom/table-component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateParam } from "@/utils/update-search-param";
import {
  endOfDay,
  format,
  isWithinInterval,
  parseISO,
  startOfDay,
} from "date-fns";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Filter,
  Loader,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DateRangePicker } from "../components/ui/date-range-picker";
import {
  DropEstadoInvoice,
  FacturaStatus,
} from "../components/ui/estado-invoice";
import SkeletonTableFactura from "../components/ui/skeleton-table-factura";
import { FacturaProvider } from "../context/factura.context";
import {
  useGetAllInvoicesStatusQuery,
  useGetInvoicesQuery,
} from "../service/api-facturas-update";
import { excelService, InvoiceExport } from "../service/excel.service";
import { FacturaSeccion } from "../types/factura.types";

// Definición de columnas para facturas
export type InvoiceRow = {
  id: string;
  idFactura: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  status: FacturaStatus;
};

export const invoiceColumns = [
  { id: "id", label: "Nº Factura", sortable: true },
  { id: "client", label: "Cliente", sortable: true },
  {
    id: "date",
    label: "Fecha emisión",
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    id: "dueDate",
    label: "Hora emisión",
    sortable: true,
    render: (value: string) =>
      new Date(value)
        .toLocaleTimeString()
        .split("  ")
        .toString()
        .toUpperCase()
        .slice(0, 13),
  },
  {
    id: "amount",
    label: "Importe",
    sortable: true,
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    id: "status",
    label: "Estado",
    sortable: true,
    render: (value: FacturaStatus, row: FacturaSeccion) => (
      <DropEstadoInvoice statusI={value} value={row} />
    ),
  },
];

export default function PageDataTableFactura() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchParams] = useSearchParams();
  const { updateSearchParams } = useUpdateParam();
  const navigate = useNavigate();

  // Obtener valores de los parámetros de URL
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = Number(searchParams.get("limit")) || 10;
  const status: FacturaStatus = searchParams.get("status") as FacturaStatus;
  const skip = !status;
  const { data: facturasGetApi, isLoading } = useGetInvoicesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const { data } = useGetAllInvoicesStatusQuery(
    {
      page: currentPage,
      limit: itemsPerPage,
      status: status,
    },
    {
      skip,
    }
  );

  const [facturasGet, setFacturasGet] = useState(facturasGetApi);
  // Si hay un llamado a la api por estatus se establece los nuevos datos en el estado
  useEffect(() => {
    if (data) {
      setFacturasGet(data);
    } else {
      setFacturasGet(facturasGetApi);
    }
  }, [data, facturasGetApi]);

  //Actualizamos el estatus en la url para el llamado a la api con ese valor
  useEffect(() => {
    if (statusFilter) {
      updateSearchParams({ ["status"]: statusFilter });
    } else {
      setFacturasGet(facturasGetApi);
    }
  }, [updateSearchParams, statusFilter, facturasGetApi]);

  const dataFacturas = useMemo<InvoiceRow[]>(
    () =>
      facturasGet
        ? facturasGet.facturas.map((factura) => ({
            id: factura.id,
            idFactura: factura.id,
            client: factura.id_cliente,
            date: new Date(factura.createdAt).toISOString(),
            dueDate: new Date(factura.createdAt).toISOString(),
            amount: factura.total,
            status: factura.status as FacturaStatus,
          }))
        : [],
    [facturasGet]
  );

  const getSortedInvoices = useCallback(() => {
    let filteredInvoices = [...dataFacturas];

    //Aply status filter
    if (data) {
      filteredInvoices = filteredInvoices.filter(
        (invoice) => invoice.status === statusFilter
      );
    }
    if (statusFilter === null && facturasGetApi) {
      filteredInvoices = facturasGetApi?.facturas.map((factura) => ({
        id: factura.idFactura.toString().padStart(5, "0"),
        idFactura: factura.id,
        client: factura.id_cliente,
        date: new Date(factura.createdAt).toISOString(),
        dueDate: new Date(factura.updatedAt).toISOString(),
        amount: factura.total,
        status: factura.status as FacturaStatus,
      }));
    }

    // Apply date range filter
    if (dateRange?.from && dateRange?.to) {
      filteredInvoices = filteredInvoices.filter((invoice) => {
        const invoiceDate = parseISO(invoice.date);
        return isWithinInterval(invoiceDate, {
          start: startOfDay(dateRange.from!),
          end: endOfDay(dateRange.to!),
        });
      });
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredInvoices = filteredInvoices.filter(
        (invoice) =>
          invoice.idFactura || invoice.client.toLowerCase().includes(term)
      );
    }

    return filteredInvoices;
  }, [data, dataFacturas, dateRange, facturasGetApi, searchTerm, statusFilter]);

  if (!facturasGet && isLoading) {
    return <SkeletonTableFactura />;
  } else if (!facturasGet) {
    return (
      <div className="flex justify-center items-center ">
        <Loader className="w-4 h-3 animate-spin" />
        Cargando...
      </div>
    );
  }

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter(null);
    setDateRange(undefined);
  };

  const sortedInvoices = getSortedInvoices();
  const handleExport = () => {
    const exportData: InvoiceExport[] = sortedInvoices.map((invoice) => ({
      id: invoice.id,
      idFactura: invoice.idFactura,
      cliente: invoice.client,
      createdAt: new Date(invoice.date),
      horaEmision: new Date(invoice.date)
        .toLocaleTimeString()
        .split("  ")
        .toString()
        .toUpperCase()
        .slice(0, 13),
      total: invoice.amount,
      estado: invoice.status,
    }));

    excelService({ data: exportData });
  };
  const handleView = (id: string) => navigate(`/edit-data/${id}`);
  return (
    <FacturaProvider>
      <main className="w-full">
        <div className="flex justify-end">
          <div className="flex flex-col space-y-4 sm:flex-row  sm:gap-4 sm:absolute">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-slate-200   w-[112px] overflow-hidden"
                >
                  {statusFilter ? null : <Filter className="mr-2 h-4 w-4" />}
                  {statusFilter ? `${statusFilter}` : "Filtrar"}
                  {statusFilter ? null : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  Todos los estados
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Pagada")}>
                  <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />
                  Pagada
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Pendiente")}>
                  <Clock className="mr-2 h-4 w-4 text-amber-600" />
                  Pendiente
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Fiada")}>
                  <AlertTriangle className="mr-2 h-4 w-4 text-red-600" />
                  Fiada
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DateRangePicker
              date={dateRange}
              onDateChange={setDateRange}
              align="end"
              className="mr-2"
            />

            {(searchTerm || statusFilter || dateRange) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFilters}
                className="h-10 w-10 border border-slate-200"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Active filters */}
        {(searchTerm || statusFilter || dateRange) && (
          <div className="flex flex-wrap gap-2">
            {statusFilter && (
              <Badge
                variant="outline"
                className="bg-slate-50 text-slate-700 border-slate-200"
              >
                Estados: {statusFilter}
                <button className="ml-1" onClick={() => setStatusFilter(null)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {dateRange?.from && dateRange?.to && (
              <Badge
                variant="outline"
                className="bg-slate-50 text-slate-700 border-slate-200"
              >
                Fecha: {format(dateRange.from, "MMM d, yyyy")} -{" "}
                {format(dateRange.to, "MMM d, yyyy")}
                <button
                  className="ml-1"
                  onClick={() => setDateRange(undefined)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-6 text-xs text-slate-600"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
        <div className="pt-8">
          <DataTable
            lastPages={facturasGet.lastPages}
            totalItems={facturasGet.totalFact}
            rute="/edit-data"
            columns={invoiceColumns}
            data={sortedInvoices}
            onEdit={handleView}
            onExport={handleExport}
          />
        </div>
      </main>
    </FacturaProvider>
  );
}
