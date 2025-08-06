import { Copy, Download, ScanQrCode } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { CardContent } from "../../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { ScanTextIcon } from "./icon";

export default function QrDialog({ qrs }: { qrs: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopyQR = async () => {
    try {
      await navigator.clipboard.writeText(qrs);
      toast.success("URL del QR copiada al portapapeles");
    } catch {
      toast.error("Error al copiar la URL");
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = qrs;
    link.download = "qr-factura.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR descargado");
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-200"
        >
          <ScanTextIcon className="w-4 h-4 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-5">
        <div className="space-y-4">
          <p className="text-2xl  text-center mb-10 border-1 rounded-2xl border-white/10 p-4 ">
            Escanea este código QR para ver la factura en tu dispositivo móvil
          </p>
          <CardContent className="rounded-xl p-4 bg-white ">
            <div className="relative">
              {qrs ? (
                <div className="flex justify-center items-center">
                  <div className="relative">
                    {!imageLoaded && !imageError && (
                      <div className="w-64 h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    )}

                    {imageError && (
                      <div className="w-64 h-64 bg-red-50 border-2 border-red-200 rounded-lg flex flex-col items-center justify-center text-red-600">
                        <ScanQrCode className="w-12 h-12 mb-2" />
                        <p className="text-sm font-medium">
                          Error al cargar el QR
                        </p>
                        <p className="text-xs text-red-500">
                          URL inválida o imagen no disponible
                        </p>
                      </div>
                    )}

                    <img
                      src={qrs.trim()}
                      alt="Código QR de la factura"
                      width={256}
                      height={256}
                      className={`rounded-lg shadow-lg transition-opacity duration-300 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      style={{ display: imageLoaded ? "block" : "none" }}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-64 h-64 bg-slate-100/40 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500">
                  <ScanQrCode className="w-12 h-12 mb-2" />
                  <p className="text-sm font-medium">QR no disponible</p>
                  <p className="text-xs">Esta factura no tiene código QR</p>
                </div>
              )}
            </div>
          </CardContent>
          {qrs && !imageError && (
            <div className="flex flex-col gap-2 mt-8">
              <div className="flex gap-2 justify-center">
                <Button
                  size="sm"
                  onClick={handleCopyQR}
                  className="flex-1"
                  variant="outline"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar URL
                </Button>

                <Button
                  size="sm"
                  onClick={handleDownloadQR}
                  className="flex-1"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
