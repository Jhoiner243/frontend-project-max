import * as XLSX from "xlsx";
import { FacturaStatus } from "../components/ui/estado-invoice";

export interface InvoiceExport {
  id: string;
  cliente: string;
  createdAt: Date;
  horaEmision: string;
  total: number;
  estado: FacturaStatus;
}
export const excelService = ({ data }: { data: InvoiceExport[] }) => {
  const columns = [
    "id",
    "cliente",
    "createdAt",
    "horaEmision",
    "total",
    "estado",
  ];

  const workSheetData = [
    columns,
    ...data.map((invoice) => [
      invoice.id,
      invoice.cliente,
      invoice.createdAt,
      invoice.horaEmision,
      invoice.total,
      invoice.estado,
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(workSheetData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Facturas");
  XLSX.writeFile(workbook, "facturas.xlsx");
};
