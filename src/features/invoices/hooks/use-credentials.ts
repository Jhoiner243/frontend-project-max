import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { VITE_API_URL } from "../../../config/config";

interface CookiesResponseAccess {
  refresh_token_factus: string;
  access_token_factus: string;
}

export const useDownloadFact = () => {
  const { getToken } = useAuth();
  const [credentials, setCredentials] = useState<CookiesResponseAccess | null>(
    null
  );

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const token = await getToken();

        const response = await fetch(`${VITE_API_URL}/credentials`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Error fetching credentials: ${response.status} ${response.statusText}`
          );
        }

        const data: CookiesResponseAccess = await response.json();
        setCredentials(data);

        const cookie = new Cookies();
        cookie.set("refresh_token_factus", data.refresh_token_factus, {
          path: "/",
        });
        cookie.set("access_token_factus", data.access_token_factus, {
          path: "/",
        });
      } catch (err) {
        console.error("useDownloadFact error:", err);
      }
    };

    fetchCredentials();
  }, [getToken]);

  return credentials;
};
