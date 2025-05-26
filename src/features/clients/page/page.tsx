import { DataTable } from "@/components/ui/custom/table-component";
import { useState } from "react";
import { AlertDelete } from "../../../components/ui/custom/delete-alert";
import {
  useDeleteClientMutation,
  useGetClientsQuery,
  useLazyGetClientsQuery,
} from "../../../store/clients/api";
import SkeletonTableFactura from "../../invoices/components/ui/skeleton-table-factura";
import ClientCreate from "../components/ui/CreateClient";

// Definición de columnas para clientes
const clientColumns = [
  {
    id: "id",
    label: "ID",
    sortable: true,
  },
  {
    id: "name",
    label: "Nombre",
    sortable: true,
  },
  {
    id: "contact",
    label: "Contacto",
    sortable: true,
  },
  {
    id: "email",
    label: "Email",
    sortable: true,
  },
  {
    id: "phone",
    label: "Teléfono",
    sortable: true,
  },
  {
    id: "status",
    label: "Estado",
    sortable: true,
    render: (value: string) => {
      const className =
        value === "Activo"
          ? "px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
          : "px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800";

      return <span className={className}>{value}</span>;
    },
  },
];

export default function ClientesPage() {
  const { data: clients, isLoading } = useGetClientsQuery();
  const [onDeleteClient, { isSuccess, isLoading: loading }] =
    useDeleteClientMutation();
  const [trigger] = useLazyGetClientsQuery();
  const [id, setId] = useState("");
  const [expand, setExpand] = useState(false);
  const clientData = (clients ?? []).map((cliente) => {
    return {
      id: cliente.id,
      name: cliente.name,
      contact: cliente.name,
      email: cliente.email,
      phone: cliente.phone,
      address: cliente.address,
      status: "Inactivo",
    };
  });
  if (isLoading) {
    return <SkeletonTableFactura />;
  }
  const handleDeleteClient = (id: string) => {
    setId(id);
    setExpand(true);
  };

  const handleEditClient = () => {};

  const handleExportClients = () => {};

  return (
    <div>
      <AlertDelete
        trigger={trigger}
        expand={expand}
        setExpand={setExpand}
        id={id}
        isLoading={loading}
        isSuccess={isSuccess}
        onDelete={onDeleteClient}
      />
      <main className="container mx-auto py-4">
        <DataTable
          title="Clientes"
          columns={clientColumns}
          data={clientData}
          onAdd={<ClientCreate />}
          onDelete={handleDeleteClient}
          onEdit={handleEditClient}
          onExport={handleExportClients}
        />
      </main>
    </div>
  );
}
