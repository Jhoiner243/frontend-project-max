import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrganization } from "@clerk/clerk-react";
import { Separator } from "@radix-ui/react-select";
import {
  Building,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { UseFacturaViewer } from "../../hooks/use-dowloand";
import { EditDataFactProps } from "../../types/factura.types";

export const EditDataFact = ({ data }: { data: EditDataFactProps }) => {
  const { id } = useParams();
  const { downloadPdf, credentials } = UseFacturaViewer();
  const { organization } = useOrganization();

  const handleDownload = () => {
    if (data.number) {
      downloadPdf(data.number);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pagada":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 px-3 py-1">
            <CheckCircle className="w-3 h-3 mr-1" />
            Pagada
          </Badge>
        );
      case "Pendiente":
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 px-3 py-1">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        );
    }
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "COP",
    }).format(amount);
  };

  const formatCurrencyTwo = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currencyDisplay: "symbol",
      currency: "COP",
    }).format(amount);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-4 mb-2">
            <FileText className="h-7 w-7" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold ">
                Factura {id?.slice(5, 12).concat("- INV")}
              </h1>
              <p className=" flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Emitida el {formatDate(data.createdAt.toString())}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {getStatusBadge(data.status)}
          <div className="text-left lg:text-right">
            <p className="text-sm ">Importe Total</p>
            <p className="text-2xl lg:text-3xl font-bold">
              {formatCurrency(data.total)}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 
            Panel izquierdo de las facturas
          */}
        <div className="xl:col-span-2 space-y-6">
          {/* Información de empresas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Empresa emisora */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 ">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <span>Empresa Emisora</span>
                    <p className="text-sm font-normal ">Datos del emisor</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-bold text-lg ">FillStep CRM</p>
                  <div className="space-y-1">
                    <p className="text-sm  flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {organization?.name}
                    </p>
                    <p className="text-sm  flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {data.cliente.phone}
                    </p>
                    <p className="text-sm  flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      {data.cliente.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cliente */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 ">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span>Cliente</span>
                    <p className="text-sm font-normal ">Datos del cliente</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 font-bold text-sm">
                      {getInitials(data.cliente.name)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-lg ">{data.cliente.name}</p>
                    <p className="text-sm ">{data.cliente.email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm  flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {data.cliente.phone}
                  </p>
                  <p className="text-sm  flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    {data.cliente.address}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-sm ">NIF/CIF</p>
                  <p className="font-mono font-semibold ">{data.clienteId}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Información de fechas y pago */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 ">
                <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                </div>
                Detalles de Facturación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium ">Fecha de Emisión</p>
                  <p className="font-bold ">
                    {formatDate(data.createdAt.toString())}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium ">Fecha de Vencimiento</p>
                  <p className="font-bold ">
                    {formatDate(data.createdAt.toString())}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium ">Método de Pago</p>
                  <p className="font-bold  flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Efectivo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalles de los artículos */}
          <Card className="border-0">
            <CardHeader>
              <CardTitle className="">Detalles de Facturación</CardTitle>
              <CardDescription>
                Servicios y productos incluidos en esta factura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-bold ">
                        Nombre producto
                      </TableHead>
                      <TableHead className="text-center font-bold ">
                        Cantidad
                      </TableHead>
                      <TableHead className="text-right font-bold ">
                        Precio Unitario
                      </TableHead>
                      <TableHead className="text-right font-bold ">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.detalles &&
                      data.detalles.map((item) => (
                        <TableRow
                          key={item.producto.id}
                          className="border-slate-100 "
                        >
                          <TableCell className="font-medium py-4">
                            {item.producto.nombre}
                          </TableCell>
                          <TableCell className="text-center  font-medium">
                            {item.cantidad}
                          </TableCell>
                          <TableCell className="text-right  font-medium">
                            {formatCurrencyTwo(item.precio)}
                          </TableCell>
                          <TableCell className="text-right font-bold ">
                            {formatCurrency(item.cantidad * item.precio)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

              <Separator className="my-6 bg-slate-200" />

              <div className="space-y-3">
                <div className="flex justify-between ">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">
                    {formatCurrency(data.total)}
                  </span>
                </div>
                <Separator className="bg-slate-300" />
                <div className="flex justify-between text-xl font-bold   p-4 rounded-xl border border-slate-200">
                  <span>Total:</span>
                  <span className="flex items-center gap-2 dark:text-blue-200">
                    <DollarSign className="h-5 w-5" />
                    {formatCurrency(data.total)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Panel derecho de la factura */}
        <div className="space-y-6">
          {/* Vista previa del PDF mejorada */}
          <Card className="border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 ">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 text-purple-600" />
                </div>
                Vista Previa
              </CardTitle>
              <CardDescription>
                Previsualización del documento PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Marco del documento */}
                <div className=" p-4 rounded-2xl">
                  <div className=" rounded-xl shadow-2xl overflow-hidden border border-slate-200">
                    <div className="aspect-[3/4] bg-white p-6 text-xs relative">
                      {/* Header del documento */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mb-3 shadow-lg"></div>
                          <p className="font-bold text-slate-900 text-sm">
                            FillStep
                          </p>
                          <p className="text-slate-600 text-xs">
                            {data.cliente.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <h1 className="text-xl font-bold text-slate-900 mb-1">
                            FACTURA
                          </h1>
                          <p className="text-slate-600 font-semibold">
                            {data.id}
                          </p>
                        </div>
                      </div>

                      {/* Información del cliente */}
                      <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="font-bold text-slate-900">
                          {data.cliente.name}
                        </p>
                        <p className="text-slate-600">{data.cliente.email}</p>
                        <p className="text-slate-600">{data.cliente.address}</p>
                      </div>

                      {/* Fechas */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-black">
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <p className="text-slate-600 font-medium">
                            Fecha de emisión:
                          </p>
                          <p className="font-bold">
                            {formatDate(data.createdAt.toString())}
                          </p>
                        </div>
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <p className="text-slate-600 font-medium">
                            Fecha de vencimiento:
                          </p>
                          <p className="font-bold">
                            {formatDate(data.createdAt.toString())}
                          </p>
                        </div>
                      </div>

                      {/* Tabla simplificada */}
                      <div className="border border-slate-300 rounded-lg mb-4 overflow-hidden">
                        <div className="bg-slate-100 p-2 border-b border-slate-300">
                          <div className="grid grid-cols-4 gap-2 text-xs font-bold text-black">
                            <span>Producto</span>
                            <span className="text-center">Cant.</span>
                            <span className="text-right">Precio</span>
                            <span className="text-right">Total</span>
                          </div>
                        </div>
                        {data.detalles?.slice(0, 2).map((item) => (
                          <div
                            key={item.precio}
                            className="p-2 border-b border-slate-100 last:border-b-0 bg-white text-black"
                          >
                            <div className="grid grid-cols-4 gap-2 text-xs  text-black">
                              <span className="text-left">
                                {item.producto.nombre}
                              </span>
                              <span className="text-center">
                                {item.cantidad}
                              </span>
                              <span className="text-right">
                                {formatCurrencyTwo(item.precio)}
                              </span>
                              <span className="text-right font-bold">
                                {formatCurrencyTwo(item.cantidad * item.precio)}
                              </span>
                            </div>
                          </div>
                        ))}
                        {data.detalles &&
                          data.detalles.map(
                            (product) => product.producto.nombre
                          ).length > 2 && (
                            <div className="p-2 text-center text-slate-500 text-xs bg-slate-50">
                              ... y {data.detalles.length - 2} artículos más
                            </div>
                          )}
                      </div>

                      {/* Total */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-black">
                        <div className="text-right space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Subtotal:</span>
                            <span className="font-medium">
                              {formatCurrency(data.total)}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>IVA:</span>
                            <span className="font-medium">00.0</span>
                          </div>
                          <div className="flex justify-between font-bold text-sm pt-1 border-t border-slate-300">
                            <span>Total:</span>
                            <span className="text-blue-700">
                              {formatCurrency(data.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Watermark de vista previa */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/5 text-black/20 font-bold text-2xl lg:text-4xl rotate-45 select-none">
                    VISTA PREVIA
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDownload}
                disabled={!credentials}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                {credentials ? "Descargar PDF" : "Cargando credenciales..."}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
