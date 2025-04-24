export interface ProductEntity {
  id: string;
  nombre: string;
  precio_compra: number;
  stock: number;
  categoryId: string;
}
export type ProductCreate = Omit<ProductEntity, "id">;

export interface ProductoSeccion extends ProductEntity {
  categoryName: string;
}
export interface CategoryEntity {
  id: string;
  name: string;
}

export type CategoryCreate = Omit<CategoryEntity, "id">;
