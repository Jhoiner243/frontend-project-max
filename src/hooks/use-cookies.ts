import { useCookies } from "react-cookie";

export const useCookiesAuthorize = () => {
  const [cookies] = useCookies(["__session"]);

  return { cookies };
};
