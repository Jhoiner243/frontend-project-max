import { useAuth, useOrganization } from "@clerk/clerk-react";
import {
  AlertCircle,
  Camera,
  CheckCircle,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { VITE_API_URL } from "../../../../config/config";
import { useLazyGetInvoicesQuery } from "../../service/api-facturas-update";

interface UploadImageFacturaProps {
  onImageProcessed?: (result: unknown) => void;
  className?: string;
}

export default function UploadImageFactura({
  onImageProcessed,
  className = "",
}: UploadImageFacturaProps) {
  const { getToken } = useAuth();
  const { organization } = useOrganization();
  const [isOpen, setIsOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [refresh] = useLazyGetInvoicesQuery();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      toast.error("Por favor selecciona una imagen válida");
    }
  }, []);

  // Handle file input change
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Camera functionality
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (error) {
      toast.error("No se pudo acceder a la cámara");
      console.error("Camera error:", error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "captured-photo.jpg", {
                type: "image/jpeg",
              });
              handleFileSelect(file);
              stopCamera();
            }
          },
          "image/jpeg",
          0.8
        );
      }
    }
  };

  // Upload image to server
  const uploadImage = async () => {
    if (!selectedImage) return;

    // Check if organization exists
    if (!organization?.id) {
      toast.error("No tienes una organización asignada");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("orgId", organization.id);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          toast.success("Imagen procesada correctamente");
          onImageProcessed?.(response);
          setIsOpen(false);
          resetState();
          refresh({ page: 1, limit: 10 });
        } else {
          toast.error("Error al procesar la imagen");
        }
        setIsUploading(false);
        setUploadProgress(0);
      });

      xhr.addEventListener("error", () => {
        toast.error("Error de conexión");
        setIsUploading(false);
        setUploadProgress(0);
      });

      xhr.open("POST", `${VITE_API_URL}/image/process`);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(formData);
    } catch {
      toast.error("Error al subir la imagen");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  // Reset component state
  const resetState = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className={`flex border-none gap-2 ${className} w-[288px]`}
        onClick={() => setIsOpen(true)}
      >
        <Upload className="w-4 h-4" />
        Subir Imagen
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Subir y procesar imagen
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Camera Dialog */}
            {isCameraOpen && (
              <Card className="border-2 border-blue-200">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Tomar Foto</h3>
                      <Button variant="ghost" size="sm" onClick={stopCamera}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="relative">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg border"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                    </div>

                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={capturePhoto}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Capturar Foto
                      </Button>
                      <Button variant="outline" onClick={stopCamera}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upload Options */}
            {!isCameraOpen && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* File Upload */}
                <Card
                  className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <CardContent className="p-6 text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <h3 className="font-semibold mb-2">Subir Imagen</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Arrastra una imagen aquí o haz clic para seleccionar
                    </p>
                    <Badge variant="outline">JPG, PNG, GIF</Badge>
                  </CardContent>
                </Card>

                {/* Camera */}
                <Card
                  className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={startCamera}
                >
                  <CardContent className="p-6 text-center">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <h3 className="font-semibold mb-2">Tomar Foto</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Usa la cámara para tomar una foto
                    </p>
                    <Badge variant="outline">Cámara</Badge>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* Image Preview */}
            {previewUrl && (
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Vista Previa</h3>
                      <Button variant="ghost" size="sm" onClick={resetState}>
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full max-h-64 object-contain rounded-lg border"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">
                        Imagen seleccionada: {selectedImage?.name}
                      </span>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subiendo imagen...</span>
                          <span>{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Upload Button */}
                    <Button
                      onClick={uploadImage}
                      disabled={isUploading || !organization?.id}
                      className="w-full"
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Procesar Imagen
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-5">
                  <AlertCircle className="w-5 h-5  mt-0.5 text-yellow-200" />
                  <div>
                    <h4 className="font-semibold  mb-1">Instrucciones</h4>
                    <ul className="text-sm  space-y-1">
                      <li>• Sube una imagen clara de la factura</li>
                      <li>• Asegúrate de que el texto sea legible</li>
                      <li>• Formatos soportados: JPG, PNG, GIF</li>
                      <li>• Tamaño máximo recomendado: 10MB</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
