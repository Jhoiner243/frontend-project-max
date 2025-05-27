import { useParams } from "react-router-dom";
import { useGetFacturaByIdQuery } from "../../../../store/invoices/api";
import { RoutesForChildren } from "./bread-routes";
import { EditDataFact } from "./edit-data";
import { InvoiceSkeleton } from "./skeleton-visualizer";

export default function EditPageInvoices() {
  const { id } = useParams();
  const { data, isLoading } = useGetFacturaByIdQuery(id as string);

  const routes = [
    { route: "/reportes", name: "Reportes" },
    { route: `/edit-data/${id}`, name: "Vista facturas" },
  ];

  if (isLoading) {
    return <InvoiceSkeleton key={id} />;
  }

  if (!data) {
    return (
      <div className="text-center text-red-500">No se encontró la factura.</div>
    );
  }

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
