/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EntitySheet } from "@/components/ui/create/create-component";
import { type FieldDefinition } from "@/components/ui/create/entity-form";
import { useCategory } from "../../context/category.context";

export default function CreateCategory() {
  const { onSubmitCategory } = useCategory();
  // Ejemplo de campos para un formulario de clientes
  const clientFields: FieldDefinition[] = [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Nombre de la categoria",
      required: true,
    },
  ];

  // Función para manejar el envío del formulario de clientes
  const handleClientSubmit = async (data: any) => {
    try {
      onSubmitCategory(data);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Error al crear el categoria",
      };
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <EntitySheet
        title="Agregar categoria"
        description="Ingresa los datos de la categoria"
        entityName="categoria"
        fields={clientFields}
        onSubmit={handleClientSubmit}
      />
    </div>
  );
}
