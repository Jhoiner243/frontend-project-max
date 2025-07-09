import { CreatedEntity } from "../../types/register-entidad";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const getEntityById = async (): Promise<CreatedEntity | null> => {
  await delay(500);

  return JSON.parse(localStorage.getItem("entities") || "[]");
};
