import { TipoPeriodo } from "./profit.entity";

export interface PedidosAnalitica {
  periodo: string;
  pedidos: number;
}

export interface ProductosAnalitica {
  semana: string;
  productos: productos[];
}

interface productos {
  cantidad: number;
  producto: string;
}

export interface ClientesAnalitica {
  semana: string;
  clientes: {
    cliente: string;
    pedidos: number;
  }[];
}

export interface Diario {
  periodo: string;
  pedidos: number;
}

export interface IResultRate {
  periodo: TipoPeriodo;
  fechaActual: string;
  fechaAnterior: string;
  porcentaje: number;
}
