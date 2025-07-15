/* eslint-disable no-case-declarations */
import { useState } from "react";
import { DetallesFacturasEntity, FacturasEntity } from "../types/factura.types";
export enum FacturaAction {
  ADD_PRODUCT = "ADD_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  CLEAR_INVOICE = "CLEAR_INVOICE",
  ADD_CLIENT = "ADD_CLIENT",
}

// Interfaces para acciones
export type FacturaActionType =
  | { type: FacturaAction.ADD_PRODUCT; payload: DetallesFacturasEntity }
  | { type: FacturaAction.REMOVE_PRODUCT; payload: { idProducto: string } }
  | { type: FacturaAction.CLEAR_INVOICE }
  | { type: FacturaAction.ADD_CLIENT; payload: { id_cliente: string } };

export const initialValues: FacturasEntity = {
  id: "",
  id_cliente: "",
  total: 0,
  detalles: [],
};

// Reductor separado para mejor testabilidad
export function facturaReducer(
  state: FacturasEntity,
  action: FacturaActionType
): FacturasEntity {
  switch (action.type) {
    case FacturaAction.ADD_PRODUCT:
      return {
        ...state,
        detalles: [...state.detalles, action.payload],
        total:
          state.total + action.payload.cantidad * action.payload.precio_venta,
      };
    case FacturaAction.ADD_CLIENT:
      return {
        ...state,
        id_cliente: action.payload.id_cliente,
      };

    case FacturaAction.REMOVE_PRODUCT:
      return {
        ...state,
        detalles: state.detalles.filter(
          (detalle) => detalle.id_producto !== action.payload.idProducto
        ),
        total: state.detalles.reduce((acc, curr) => {
          if (curr.id_producto !== action.payload.idProducto) {
            return acc + curr.cantidad * curr.precio_venta;
          }
          return acc;
        }, 0),
      };

    case FacturaAction.CLEAR_INVOICE:
      return initialValues;

    default:
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
  }
}

export default function useFacturaHook() {
  const [cantidad, setCantidad] = useState<number | undefined>(undefined);
  const [precio, setPrecio] = useState<number | undefined>(undefined);
  const [selected, setSelected] = useState<string>("");

  return {
    cantidad,
    precio,
    setPrecio,
    selected,
    setSelected,
    setCantidad,
  };
}
