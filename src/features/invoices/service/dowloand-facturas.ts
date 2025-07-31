// Por ejemplo, en un hook o componente React
export function downloadPdfFromBase64(
  base64: string,
  fileName = "factura.pdf"
) {
  // 1. Si viene con prefijo data:application/pdf;base64, lo quitamos
  const cleaned = base64.replace(/^data:application\/pdf;base64,/, "");

  // 2. Decodificamos el Base64 a bytes
  const byteCharacters = atob(cleaned);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // 3. Creamos un Blob de tipo PDF
  const blob = new Blob([byteArray], { type: "application/pdf" });

  // 4. Y lanzamos la descarga
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
