/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { Cookies } from "react-cookie";
import { downloadPdfFromBase64 } from "../service/dowloand-facturas";
import { useDownloadFact } from "./use-credentials";

export interface IResponseFacturaBase64 {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  file_name: string;
  pdf_base_64_encoded: string;
}

const URL_BASE_FACTURA =
  "https://api-sandbox.factus.com.co/v1/bills/download-pdf";

export function UseFacturaViewer() {
  const credentials = useDownloadFact();
  const cookies = new Cookies();

  const downloadPdf = useCallback(
    async (number: string) => {
      try {
        // Wait for credentials to be available
        if (!credentials) {
          console.error("Credentials not available yet");
          return;
        }

        const response = await fetch(`${URL_BASE_FACTURA}/${number}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${cookies.get("access_token_factus")}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Error downloading PDF: ${response.status} ${response.statusText}`
          );
        }

        const data: IResponseFacturaBase64 = await response.json();
        downloadPdfFromBase64(
          data.data.pdf_base_64_encoded,
          `factura-${number}.pdf`
        );
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    },
    [credentials, cookies]
  );

  return { downloadPdf, credentials };
}
