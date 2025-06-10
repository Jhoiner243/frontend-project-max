/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/ui/custom/table-component";
import { useState } from "react";
import { AlertDelete } from "../../../../components/ui/custom/delete-alert";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useUpdateProductMutation,
} from "../../../../store/productos/api";
import SkeletonTableFactura from "../../../invoices/components/ui/skeleton-table-factura";
import CreateProduct from "./creat-product";
import { EditProduct } from "./edit-product";
import { RenderInputTable } from "./render-input-table";

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
    render: (producto: any) => <RenderInputTable producto={producto} />,
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
  const [onSubmitUpdate] = useUpdateProductMutation();
  const { data: productos, isLoading } = useGetProductsQuery();
  const [productId, setProductId] = useState("");
  const [deleteProduct, { isSuccess, isLoading: loading }] =
    useDeleteProductMutation();
  const [trigger] = useLazyGetProductsQuery();
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [id, setId] = useState("");
  const status = (stock: number) => {
    if (stock > 1 && stock < 15) return "Pocas unidades";
    if (stock === 0) return "Agotado";
    return "Disponible";
  };

  if (isLoading) {
    return <SkeletonTableFactura />;
  }

  const productosData = (productos ?? []).map((producto) => {
    return {
      id: producto.id,
      name: producto.nombre,
      category: producto.categoryName,
      price: producto.precio_compra,
      stock: producto,
      supplier: producto.categoryName,
      status: status(producto.stock),
    };
  });

  const handleDeleteProduct = (id: string) => {
    setId(id);
    setExpand(true);
  };

  const handleUpdate = (id: string) => {
    setProductId(id);
    setOpen(true);
  };

  return (
    <div>
      {open === true && (
        <EditProduct
          id={productId}
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
        onDelete={deleteProduct}
      />
      <main className="container mx-auto py-4">
        <DataTable
          title="Productos"
          columns={productColumns}
          data={productosData}
          onAdd={<CreateProduct />}
          onEdit={handleUpdate}
          onDelete={handleDeleteProduct}
        />
      </main>
    </div>
  );
}
