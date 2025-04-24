import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery } from "@/store/categories/api";
import { CategoryEntity } from "../../products/product.type";

export default function CategoriesComponent() {
  const { data, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) {
    return <SkeletonLoading />;
  }

  if (isError) {
    return <div className="text-red-500">Error al cargar las categorías</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        data?.map((category: CategoryEntity) => (
          <div key={category.id} className="flex items-center gap-2">
            <span>{category.name}</span>
          </div>
        ))
      )}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <div className="flex flex-col gap-4 ">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-6 w-1/2" />
    </div>
  );
}
