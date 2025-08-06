export interface ProductEntity {
  id: string;
  nombre: string;
  precio_compra: number;
  stock: number;
  categoryId: string;
  unidadMedida: unidadesMedida;
}
export type ProductCreate = Omit<ProductEntity, "id">;

export interface ProductoSeccion extends ProductEntity {
  categoryName: string;
}
export interface CategoryEntity {
  id: string;
  name: string;
}

export enum unidadesMedida {
  Kilogramo = "KGM",
  Libra = "LBR",
  Metro = "MTR",
  Galón = "GLL",
  Unidad = "UND",
}

export type CategoryCreate = Omit<CategoryEntity, "id">;
