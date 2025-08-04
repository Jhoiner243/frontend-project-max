import { FacturaStatus } from "../components/ui/estado-invoice";

export interface FacturasEntity {
  id: string;
  detalles: DetallesFacturasEntity[];
  id_cliente: string;
  total: number;
}

export interface DetallesFacturasEntity {
  id_producto: string;
  cantidad: number;
  porcentage_descuento: number;
  precio_venta: number;
}

export interface FacturaSeccion extends FacturasEntity {
  id: string;
  idFactura: number;
  qr: string;
  updatedAt: Date;
  createdAt: Date;
  status: FacturaStatus;
  lastPages: number;
}

export enum StatusFactura {
  Pagada = "Pagada",
  Pendiente = "Pendiente",
  Fiada = "Fiada",
  Vencida = "Vencida",
}

// Para el edit de las facturas y visualización de detalles
// ----------------------------------------------------------------
export interface DetailsItem {
  cantidad: number;
  createdAt: Date;
  precio: number;
  producto: {
    id: string;
    nombre: string;
  };
}

export interface EditDataFactProps {
  id: string;
  number: string;
  clienteId: string;
  status: string;
  total: number;
  createdAt: Date;
  cliente: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  detalles?: DetailsItem[];
}
