import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Building,
  Calendar,
  CreditCard,
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

export function InvoiceSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 lg:p-6 space-y-6">
        {/* Header skeleton */}
        <Card className="shadow-lg">
          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4 mb-2">
                  <FileText className="h-7 w-7 text-muted-foreground" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <div className="text-left lg:text-right space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Panel izquierdo - Datos de la factura */}
          <div className="xl:col-span-2 space-y-6">
            {/* Información de empresas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Empresa emisora skeleton */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <span>Empresa Emisora</span>
                      <p className="text-sm font-normal text-muted-foreground">
                        Datos del emisor
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cliente skeleton */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span>Cliente</span>
                      <p className="text-sm font-normal text-muted-foreground">
                        Datos del cliente
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-36" />
                      <Skeleton className="h-4 w-44" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <div className="pt-2 border-t space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Información de fechas y pago skeleton */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  Detalles de Facturación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detalles de los artículos skeleton */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Detalles de Facturación</CardTitle>
                <CardDescription>
                  Servicios y productos incluidos en esta factura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="space-y-4">
                    {/* Table header */}
                    <div className="grid grid-cols-4 gap-4 p-3 bg-muted rounded-lg">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16 mx-auto" />
                      <Skeleton className="h-4 w-20 ml-auto" />
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </div>

                    {/* Table rows */}
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="grid grid-cols-4 gap-4 p-3 border-b"
                      >
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-8 mx-auto" />
                        <Skeleton className="h-4 w-16 ml-auto" />
                        <Skeleton className="h-4 w-20 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Separator />
                  <div className="flex justify-between p-4 rounded-xl border bg-muted">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel derecho - Vista previa del PDF skeleton */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                    <Eye className="h-4 w-4 text-primary" />
                  </div>
                  Vista Previa
                </CardTitle>
                <CardDescription>
                  Previsualización del documento PDF
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Marco del documento skeleton */}
                  <div className="bg-muted p-4 rounded-2xl">
                    <div className="bg-card rounded-xl shadow-2xl overflow-hidden border">
                      <div className="aspect-[3/4] bg-card p-6 space-y-4">
                        {/* Header del documento skeleton */}
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <Skeleton className="w-12 h-12 rounded-xl" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                          <div className="text-right space-y-1">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>

                        {/* Cliente info skeleton */}
                        <div className="p-3 bg-muted rounded-lg space-y-1 border">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-40" />
                          <Skeleton className="h-3 w-48" />
                        </div>

                        {/* Fechas skeleton */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-muted p-2 rounded space-y-1 border">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                          <div className="bg-muted p-2 rounded space-y-1 border">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>

                        {/* Tabla skeleton */}
                        <div className="border rounded overflow-hidden">
                          <div className="bg-muted p-2 grid grid-cols-4 gap-1">
                            <Skeleton className="h-3 w-12" />
                            <Skeleton className="h-3 w-8" />
                            <Skeleton className="h-3 w-10" />
                            <Skeleton className="h-3 w-10" />
                          </div>
                          {[1, 2].map((row) => (
                            <div
                              key={row}
                              className="p-2 grid grid-cols-4 gap-1 border-t bg-card"
                            >
                              <Skeleton className="h-3 w-full" />
                              <Skeleton className="h-3 w-4" />
                              <Skeleton className="h-3 w-8" />
                              <Skeleton className="h-3 w-10" />
                            </div>
                          ))}
                        </div>

                        {/* Total skeleton */}
                        <div className="bg-muted p-3 rounded space-y-2 border">
                          <div className="flex justify-between">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-12" />
                          </div>
                          <div className="flex justify-between">
                            <Skeleton className="h-3 w-12" />
                            <Skeleton className="h-3 w-8" />
                          </div>
                          <div className="flex justify-between pt-1 border-t">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Watermark skeleton */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-muted-foreground/20 font-bold text-2xl lg:text-4xl rotate-45 select-none">
                      CARGANDO...
                    </div>
                  </div>
                </div>

                {/* Download button skeleton */}
                <div className="mt-4">
                  <div className="w-full h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground font-medium">
                      Cargando...
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-xs text-muted-foreground text-center bg-muted p-2 rounded-lg border">
                  📄 Cargando vista previa del documento...
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
