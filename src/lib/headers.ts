import { Cookies } from "react-cookie";

export const usePrepareHeaders = (headers: Headers) => {
  const cookies = new Cookies();
  const token = cookies.get("__session");
  if (!token) {
    return headers;
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};
