/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/features/invoices/components/data-table/table-factura";
import { useProductos } from "../../context/producto.context";
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
  const { productos } = useProductos();

  const productosData = productos.map((producto) => {
    return {
      id: producto.id.slice(3, 10).concat("-PROD"),
      name: producto.nombre,
      category: producto.categoryName,
      price: producto.precio_compra,
      stock: producto.stock,
      supplier: producto.categoryName,
      status: "Pocas unidades",
    };
  });
  const handleEditProduct = (product: any) => {
    console.log("Editar producto:", product);
  };

  const handleDeleteProduct = (product: any) => {
    console.log("Eliminar producto:", product);
  };

  const handleExportProducts = () => {
    console.log("Exportar productos");
  };

  return (
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
  );
}
