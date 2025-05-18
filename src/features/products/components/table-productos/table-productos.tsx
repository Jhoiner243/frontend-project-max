/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/ui/custom/table-component";
import { useState } from "react";
import { AlertDelete } from "../../../../components/ui/custom/delete-alert";
import {
  useDeleteProductMutation,
  useLazyGetProductsQuery,
} from "../../../../store/productos/api";
import { useProductosContext } from "../../context/producto.context";
import CreateProduct from "./creat-product";

// Definición de columnas para productos
const productColumns = [
  {
    id: "id",
    label: "Código",
    sortable: true,
  },
  {
    id: "name",
    label: "Nombre",
    sortable: true,
  },
  {
    id: "category",
    label: "Categoría",
    sortable: true,
  },
  {
    id: "price",
    label: "Precio",
    sortable: true,
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    id: "stock",
    label: "Stock",
    sortable: true,
  },
  {
    id: "supplier",
    label: "Proveedor",
    sortable: true,
  },
  {
    id: "status",
    label: "Estado",
    sortable: true,
    render: (value: string) => {
      let className = "px-2 py-1 rounded-full text-xs font-medium";

      if (value === "Disponible") {
        className += " bg-green-100 text-green-800";
      } else if (value === "Pocas unidades") {
        className += " bg-yellow-100 text-yellow-800";
      } else if (value === "Agotado") {
        className += " bg-red-100 text-red-800";
      }

      return <span className={className}>{value}</span>;
    },
  },
];

export default function ProductosPage() {
  const { productos } = useProductosContext();
  const [deleteProduct, { isSuccess, isLoading }] = useDeleteProductMutation();
  const [trigger] = useLazyGetProductsQuery();
  const [expand, setExpand] = useState(false);
  const [id, setId] = useState("");
  const status = (stock: number) => {
    if (stock === 10 && stock < 15) return "Pocas unidades";
    if (stock === 0) return "Agotado";
    return "Disponible";
  };
  const productosData = productos.map((producto) => {
    return {
      id: producto.id,
      name: producto.nombre,
      category: producto.categoryName,
      price: producto.precio_compra,
      stock: producto.stock,
      supplier: producto.categoryName,
      status: status(producto.stock),
    };
  });
  const handleEditProduct = (product: any) => {
    console.log("Editar producto:", product);
  };

  const handleDeleteProduct = (id: string) => {
    setId(id);
    setExpand(true);
  };

  const handleExportProducts = () => {
    console.log("Exportar productos");
  };

  return (
    <div>
      <AlertDelete
        trigger={trigger}
        expand={expand}
        setExpand={setExpand}
        id={id}
        isLoading={isLoading}
        isSuccess={isSuccess}
        onDelete={deleteProduct}
      />
      <main className="container mx-auto py-4">
        <DataTable
          title="Productos"
          columns={productColumns}
          data={productosData}
          onAdd={<CreateProduct />}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onExport={handleExportProducts}
        />
      </main>
    </div>
  );
}
