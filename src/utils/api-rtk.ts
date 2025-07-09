import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { VITE_API_URL } from "../config/config";

interface UrlValidationResponse {
  redirectUrl: string;
}
export const useRedirectValidation = (): string => {
  const [url, setUrl] = useState<string>("");
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const response = await fetch(`${VITE_API_URL}/url-validation-redirect`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data: UrlValidationResponse = await response.json();
      if (data.redirectUrl) {
        setUrl(data.redirectUrl);
      }
    };
    fetchData();
  }, [getToken]);

  return url;
};
