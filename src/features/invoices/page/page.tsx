/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "../components/data-table/table-factura";
import SkeletonTableFactura from "../components/ui/skeleton-table-factura";
import { FacturaProvider } from "../context/factura.context";
import { useGetInvoicesQuery } from "../service/api";

// Definición de columnas para facturas
export const invoiceColumns = [
  { id: "id", label: "Nº Factura", sortable: true },
  { id: "client", label: "Cliente", sortable: true },
  {
    id: "date",
    label: "Fecha Emisión",
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    id: "dueDate",
    label: "Fecha Vencimiento",
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString(),
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
    render: (value: string) => {
      let className = "px-2 py-1 rounded-full text-xs font-medium";
      if (value === "Pagada") className += " bg-green-100 text-green-800";
      if (value === "Pendiente") className += " bg-yellow-100 text-yellow-800";
      if (value === "Vencida") className += " bg-red-100 text-red-800";
      return <span className={className}>{value}</span>;
    },
  },
];

export default function PageDataTableFactura() {
  const { data: facturasGet, isLoading } = useGetInvoicesQuery();

  // Mientras carga, mostramos un table skeleton con 5 filas de placeholder
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
  const dataFacturas = facturasGet.map((factura) => ({
    id: factura.id.slice(3, 10).concat(" -INV"),
    client: factura.id_cliente,
    date: factura.createdAt,
    dueDate: factura.updatedAt,
    amount: factura.total,
    status: factura.status,
  }));

  // Handlers
  const handleEditInvoice = (item: any) => console.log("Editar factura:", item);
  const handleDeleteInvoice = (invoice: any) =>
    console.log("Eliminar factura:", invoice);
  const handleExportInvoices = () => console.log("Exportar facturas");

  return (
    <FacturaProvider>
      <main className="container mx-auto py-4">
        <DataTable
          title="Facturas"
          columns={invoiceColumns}
          data={dataFacturas}
          onEdit={handleEditInvoice}
          onDelete={handleDeleteInvoice}
          onExport={handleExportInvoices}
        />
      </main>
    </FacturaProvider>
  );
}
