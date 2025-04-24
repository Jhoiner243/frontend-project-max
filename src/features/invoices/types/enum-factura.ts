import { FacturasEntity } from "./factura.types";

enum EnumFact {
  ELIMINAR = 'eliminar producto',
  AGREGAR = 'agregar producto',
  ELIMINARFACT = 'eliminar factura',
}


export interface FacturaAction {
  type: EnumFact,
  payload: FacturasEntity
}