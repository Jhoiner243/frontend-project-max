/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EntitySheet } from "@/components/ui/create/create-component";
import { type FieldDefinition } from "@/components/ui/create/entity-form";
import { useCategory } from "../../context/category.context";
import { useProductosContext } from "../../context/producto.context";

export default function CreateProduct() {
  const { onSubmitProductos } = useProductosContext();
  const { categoryProductos } = useCategory();
  // Ejemplo de campos para un formulario de clientes
  const clientFields: FieldDefinition[] = [
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      placeholder: "Nombre del producto",
      required: true,
    },
    {
      name: "precio_compra",
      label: "Precio producto",
      type: "number",
      placeholder: "Precio del producto",
      required: true,
    },
    {
      name: "stock",
      label: "Cantidad",
      type: "number",
      placeholder: "Cantidad",
      required: true,
    },
    {
      name: "categoryId",
      label: "Categoria",
      type: "select",
      required: true,
      options: categoryProductos.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })),
    },
  ];

  // Función para manejar el envío del formulario de clientes
  const handleClientSubmit = async (data: any) => {
    try {
      onSubmitProductos(data);
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
        title="Agregar producto"
        description="Ingresa los datos del nuevo producto"
        entityName="producto"
        fields={clientFields}
        onSubmit={handleClientSubmit}
      />
    </div>
  );
}
