/* eslint-disable react-refresh/only-export-components */

import { DataTable } from "../../../components/ui/custom/table-component";
import {
  DropEstadoInvoice,
  FacturaStatus,
} from "../components/ui/estado-invoice";
import SkeletonTableFactura from "../components/ui/skeleton-table-factura";
import { FacturaProvider } from "../context/factura.context";
import { useGetInvoicesQuery } from "../service/api";
import { FacturaSeccion } from "../types/factura.types";

// Definición de columnas para facturas
type InvoiceRow = {
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
      new Date(value).toLocaleTimeString().split(" ")[0],
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
  const { data: facturasGet, isLoading } = useGetInvoicesQuery();

  if (isLoading) {
    return <SkeletonTableFactura />;
  }

  if (!facturasGet || facturasGet.length === 0) {
    return (
      <main className="container mx-auto py-4">
        <p className="text-center text-gray-500">
          No hay facturas disponibles.
        </p>
      </main>
    );
  }

  // Transformación de datos
  const dataFacturas: InvoiceRow[] = facturasGet.map((factura) => ({
    id: factura.id,
    client: factura.id_cliente,
    date: new Date(factura.createdAt).toISOString(),
    dueDate: new Date(factura.updatedAt).toISOString(),
    amount: factura.total,
    status: factura.status as FacturaStatus,
  }));
  const handleDelete = () => {};
  return (
    <FacturaProvider>
      <main className="container mx-auto py-4">
        <DataTable
          title="Facturas"
          columns={invoiceColumns}
          data={dataFacturas}
          onEdit={handleDelete}
        />
      </main>
    </FacturaProvider>
  );
}
