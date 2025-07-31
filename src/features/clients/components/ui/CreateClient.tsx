/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EntitySheet } from "@/components/ui/create/create-component";
import { type FieldDefinition } from "@/components/ui/create/entity-form";
import {
  useCreateClientMutation,
  useGetClientsQuery,
  useLazyGetClientsQuery,
} from "../../../../store/clients/api";

// const clientValidations = z.object({
//   name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
//   email: z.string().email({ message: "El correo electrónico no es válido" }),
//   phone: z.string().min(10, { message: "El teléfono debe tener al menos 10 caracteres" }),
//   address: z.string().min(2, { message: "La dirección debe tener al menos 2 caracteres" }),
// });

export default function ClientCreate() {
  const [createClient] = useCreateClientMutation();
  const { data } = useGetClientsQuery();
  const [trigger] = useLazyGetClientsQuery();
  // Ejemplo de campos para un formulario de clientes
  const clientFields: FieldDefinition[] = [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Nombre del cliente",
      required: true,
    },
    {
      name: "email",
      label: "Correo electrónico",
      type: "email",
      placeholder: "correo@ejemplo.com",
      required: true,
    },
    {
      name: "identification",
      label: "Número de cedula",
      type: "text",
      placeholder: "1029320392",
      validation: {
        minLength: 10,
        maxLength: 10,
      },
      required: true,
    },
    {
      name: "phone",
      label: "Teléfono",
      type: "text",
      validation: {
        minLength: 10,
        maxLength: 15,
      },
      placeholder: "123-456-7890",
    },
    {
      name: "address",
      label: "Ubicación",
      type: "text",
      placeholder: "Ej: calle 13",
    },
  ];

  // Función para manejar el envío del formulario de clientes
  const handleClientSubmit = async (data: any) => {
    try {
      createClient(data);
      trigger();
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Error al crear el cliente",
      };
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <EntitySheet
        data={data}
        title="Agregar cliente"
        description="Ingresa los datos del nuevo cliente"
        entityName="Cliente"
        fields={clientFields}
        onSubmit={handleClientSubmit}
      />
    </div>
  );
}
