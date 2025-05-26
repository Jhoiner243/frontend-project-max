import { useGetFacturaByIdQuery } from "@/store/invoices/api";
import { useParams } from "react-router-dom";
import { RoutesForChildren } from "./bread-routes";
import { EditDataFact } from "./edit-data";

export default function EditPageInvoices() {
  const { id } = useParams();
  const { data } = useGetFacturaByIdQuery(id as string);
  if (!data) return [];
  const routes = [
    { route: "/reportes", name: "Reportes" },
    { route: "/edit-data/:id", name: "Vista facturas" },
  ];
  return (
    <div>
      <div className="flex">
        <RoutesForChildren routes={routes} />
      </div>
      <div className="container mx-auto p-4">
        <EditDataFact data={data} />
      </div>
    </div>
  );
}
