import { ProductEntity } from "../../products/product.type";

export interface PedidosAnalitica {
  periodo: string;
  pedidos: number;
}

export interface ProductosAnalitica {
  semana: string;
  productos: Pick<ProductEntity, "stock" | "id">;
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
