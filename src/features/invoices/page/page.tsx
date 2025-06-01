/* eslint-disable react-refresh/only-export-components */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/custom/table-component";
import { Input } from "../../../components/ui/input";
import { DateRangePicker } from "../components/ui/date-range-picker";
import {
  DropEstadoInvoice,
  FacturaStatus,
} from "../components/ui/estado-invoice";
import SkeletonTableFactura from "../components/ui/skeleton-table-factura";
import { FacturaProvider } from "../context/factura.context";
import { useGetInvoicesQuery } from "../service/api";
import { FacturaSeccion } from "../types/factura.types";

// Definición de columnas para facturas
export type InvoiceRow = {
  id: string;
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
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [sortField, setSortField] = useState<keyof InvoiceRow | null>(null);
  const [searchParams] = useSearchParams();

  // Obtener valores de los parámetros de URL
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = Number(searchParams.get("limit")) || 10;

  const { data: facturasGet, isLoading } = useGetInvoicesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  if (isLoading) {
    return <SkeletonTableFactura />;
  }

  if (!facturasGet || facturasGet.facturas.length === 0) {
    return (
      <main className="container mx-auto py-4">
        <p className="text-center text-gray-500">
          No hay facturas disponibles.
        </p>
      </main>
    );
  }

  const dataFacturas: InvoiceRow[] = facturasGet.facturas.map((factura) => ({
    id: factura.id,
    client: factura.id_cliente,
    date: new Date(factura.createdAt).toISOString(),
    dueDate: new Date(factura.updatedAt).toISOString(),
    amount: factura.total,
    status: factura.status as FacturaStatus,
  }));

  const getSortedInvoices = () => {
    let filteredInvoices = [...dataFacturas];

    //Aply status filter
    if (statusFilter) {
      filteredInvoices = filteredInvoices.filter(
        (invoice) => invoice.status === statusFilter
      );
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
          invoice.id.toLowerCase().includes(term) ||
          invoice.client.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    if (sortField) {
      filteredInvoices.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (aValue === undefined || bValue === undefined) return 0;
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredInvoices;
  };

  // Transformación de datos
  const handleSort = (field: keyof InvoiceRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter(null);
    setDateRange(undefined);
  };

  const sortedInvoices = getSortedInvoices();

  const handleDelete = () => {};
  return (
    <FacturaProvider>
      <main className="container mx-auto py-4">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div></div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Buscar facturas..."
                className="pl-9 w-full sm:w-64 border-slate-200 focus:border-slate-300 focus:ring-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {statusFilter ? `Status: ${statusFilter}` : "Filtrar"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
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
              className="w-full sm:w-auto"
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
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <Badge
                variant="outline"
                className="bg-slate-50 text-slate-700 border-slate-200"
              >
                Buscar: {searchTerm}
                <button className="ml-1" onClick={() => setSearchTerm("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
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
                Date: {format(dateRange.from, "MMM d, yyyy")} -{" "}
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
        <DataTable
          lastPages={facturasGet.lastPages}
          totalItems={facturasGet.totalFact}
          rute="/edit-data"
          columns={invoiceColumns}
          data={sortedInvoices}
          onEdit={handleDelete}
        />
      </main>
    </FacturaProvider>
  );
}
