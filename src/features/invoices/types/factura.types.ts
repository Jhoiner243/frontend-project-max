export interface FacturasEntity {
  detalles: DetallesFacturasEntity[];
  id_cliente: string;
  total: number ;
}

export interface DetallesFacturasEntity {
  id_producto: string;
  cantidad: number;
  precio_venta: number;
}

export interface FacturaSeccion extends FacturasEntity{
  id: string
  updatedAt: Date;
  createdAt: Date;
  status: StatusFactura
}

export enum StatusFactura {
  Pagada = 'Pagada',
  Pendiente = 'Pendiente',
  Fiada = 'Fiada',
  Vencida = 'Vencida'
}