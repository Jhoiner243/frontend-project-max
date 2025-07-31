export interface ClientEntity {
  id: string;
  indentification: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type clientCreate = Omit<ClientEntity, "id">;
