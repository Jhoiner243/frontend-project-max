/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/ui/data-table/table";
import ClientCreate from "../components/ui/CreateClient";
import { useClient } from "../context/client-context";

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
  const { clients } = useClient();

  const clientData = clients.map((cliente) => {
    return {
      id: cliente.id.slice(3, 10).concat("-CLI"),
      name: cliente.name,
      contact: cliente.name,
      email: cliente.email,
      phone: cliente.phone,
      address: cliente.address,
      status: "Inactivo",
    };
  });

  const handleEditClient = (client: any) => {
    console.log("Editar cliente:", client);
  };

  const handleDeleteClient = (client: any) => {
    console.log("Eliminar cliente:", client);
  };

  const handleExportClients = () => {
    console.log("Exportar clientes");
  };

  return (
    <main className="container mx-auto py-4">
      <DataTable
        title="Clientes"
        columns={clientColumns}
        data={clientData}
        onAdd={<ClientCreate />}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}
        onExport={handleExportClients}
      />
    </main>
  );
}
