/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EntitySheet } from "@/components/ui/create/create-component";
import { type FieldDefinition } from "@/components/ui/create/entity-form";
import { toast } from "sonner";
import { useGetCategoriesQuery } from "../../../../store/categories/api";
import { useCreateProductMutation } from "../../../../store/productos/api";
import { unidadesMedida } from "../../product.type";

interface Unidades {
  id: number;
  name: unidadesMedida;
}

const undidadMedida: Unidades[] = [
  {
    id: 70,
    name: unidadesMedida.Kilogramo,
  },
  {
    id: 414,
    name: unidadesMedida.Galón,
  },
  {
    id: 449,
    name: unidadesMedida.Libra,
  },
  {
    id: 512,
    name: unidadesMedida.Unidad,
  },
  {
    id: 874,
    name: unidadesMedida.Metro,
  },
];

export default function CreateProduct() {
  const [onSubmitProductos, { error }] = useCreateProductMutation();
  const { data: categoryProductos } = useGetCategoriesQuery();
  // Ejemplo de campos para un formulario de clientes
  const productsFields: FieldDefinition[] = [
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
      options: categoryProductos
        ? categoryProductos.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))
        : [],
    },
    {
      name: "unidadMedida",
      label: "Medida",
      type: "select",
      required: true,
      options: undidadMedida.map((unidad) => ({
        value: unidad.name,
        label: unidad.name,
      })),
    },
  ];

  if (error) {
    toast.error("Hubo error al crear el producto");
  }

  // Función para manejar el envío del formulario de clientes
  const handleClientSubmit = async (data: any) => {
    try {
      console.log("DATA", data);
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
        fields={productsFields}
        onSubmit={handleClientSubmit}
      />
    </div>
  );
}
