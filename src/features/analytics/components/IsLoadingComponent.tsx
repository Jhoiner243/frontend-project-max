import { Skeleton } from "@/components/ui/skeleton";

export default function IsLoadingComponent() {
  return (
    <div className="flex justify-center items-center h-80">
      <Skeleton className="h-80 w-full" />
    </div>
  );
}
