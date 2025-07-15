import { DataTable } from "@/components/ui/custom/table-component";
import { useState } from "react";
import { AlertDelete } from "../../../components/ui/custom/delete-alert";
import {
  useDeleteClientMutation,
  useGetClientsQuery,
  useLazyGetClientsQuery,
  useUpdateClientMutation,
} from "../../../store/clients/api";
import SkeletonTableFactura from "../../invoices/components/ui/skeleton-table-factura";
import ClientCreate from "../components/ui/CreateClient";
import { EditClient } from "../components/ui/edit-client";

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
  const [onSubmitUpdate] = useUpdateClientMutation();
  const [trigger] = useLazyGetClientsQuery();
  const [id, setId] = useState("");
  const [ClientId, setClientId] = useState("");
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);

  const clientData = (clients?.clientes ?? []).map((cliente) => {
    return {
      id: cliente.id,
      name: cliente.name,
      contact: cliente.name,
      email: cliente.email,
      phone: cliente.phone,
      address: cliente.address,
      status: "Activo",
    };
  });
  if (isLoading) {
    return <SkeletonTableFactura />;
  }
  const handleDeleteClient = (id: string) => {
    setId(id);
    setExpand(true);
  };

  const handleUpdate = (id: string) => {
    setClientId(id);
    setOpen(true);
  };

  const handleExportClients = () => {};

  const handleAddClient = () => {
    return <ClientCreate />;
  };

  return (
    <div>
      {open === true && (
        <EditClient
          id={ClientId}
          open={open}
          setOpen={setOpen}
          onSubmit={onSubmitUpdate}
        />
      )}

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
          lastPages={clients?.lastPage}
          totalItems={clients?.total}
          onAdd={handleAddClient()}
          onDelete={handleDeleteClient}
          onEdit={handleUpdate}
          onExport={handleExportClients}
        />
      </main>
    </div>
  );
}
