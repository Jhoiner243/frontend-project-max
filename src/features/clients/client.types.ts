export interface ClientEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type clientCreate = Omit<ClientEntity, "id">;
