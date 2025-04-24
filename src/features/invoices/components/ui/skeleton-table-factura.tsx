import { Skeleton } from "@/components/ui/skeleton";
import { invoiceColumns } from "../../page/page";

export default function SkeletonTableFactura() {
  return (
    <main className="container mx-auto py-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-transparent">
            <tr>
              {invoiceColumns.map((col) => (
                <th
                  key={col.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  <Skeleton className="h-4 w-24" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-transparent">
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {invoiceColumns.map((col) => (
                  <td key={col.id} className="px-6 py-4">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
