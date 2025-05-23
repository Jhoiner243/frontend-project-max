/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EntitySheet } from "@/components/ui/create/create-component";
import { type FieldDefinition } from "@/components/ui/create/entity-form";
import { useCreateClientMutation } from "../../../../store/clients/api";

export default function ClientCreate() {
  const [createClient] = useCreateClientMutation();
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
      name: "phone",
      label: "Teléfono",
      validation: {
        max: 10,
        min: 10,
      },
      type: "text",
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
      await createClient(data);
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
        title="Agregar Cliente"
        description="Ingresa los datos del nuevo cliente"
        entityName="Cliente"
        fields={clientFields}
        onSubmit={handleClientSubmit}
      />
    </div>
  );
}
