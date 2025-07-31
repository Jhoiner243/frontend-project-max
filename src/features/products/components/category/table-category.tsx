import { DataTable } from "@/components/ui/custom/table-component";
import { useGetCategoriesQuery } from "../../../../store/categories/api";
import CreateCategory from "../category/create-category";

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
];

export default function CategoryPage() {
  const { data: categoryProductos } = useGetCategoriesQuery();

  const category = (categoryProductos ?? []).map((category) => {
    return {
      id: category.id.slice(3, 10).concat("-CAT"),
      name: category.name,
    };
  });

  return (
    <main className="container mx-auto py-4">
      <DataTable
        title="Categorias"
        columns={productColumns}
        data={category}
        onAdd={<CreateCategory />}
      />
    </main>
  );
}
