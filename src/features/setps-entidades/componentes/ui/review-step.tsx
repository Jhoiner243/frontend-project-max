"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle,
  CreditCard,
  Factory,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useAppSelector } from "../../../../store/steps-entidad/hook";
import { BillingCycle, TypePlan } from "../../types/register-entidad";

/**
 * Step 4: Review and Confirmation
 */
export default function ReviewStep() {
  const { formData } = useAppSelector((state) => state.registration);

  const planLabels = {
    [TypePlan.BASIC]: "Básico",
    [TypePlan.PREMIUM]: "Premium",
    [TypePlan.ENTERPRISE]: "Enterprise",
  };

  const cycleLabels = {
    [BillingCycle.MONTHLY]: "Mensual",
    [BillingCycle.QUARTERLY]: "Trimestral",
    [BillingCycle.YEARLY]: "Anual",
  };

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-900/20">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <CardTitle className="text-white">Revisar información</CardTitle>
              <CardDescription className="text-zinc-400">
                Verifique que todos los datos sean correctos antes de proceder
                con el registro
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Building2 className="w-4 h-4" />
              INFORMACIÓN BÁSICA
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
              <div>
                <p className="text-sm text-zinc-400">Nombre de la entidad</p>
                <p className="font-medium text-white">{formData.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Industria</p>
                <div className="flex items-center gap-2">
                  <Factory className="w-4 h-4 text-zinc-400" />
                  <p className="font-medium text-white">{formData.industry}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-zinc-700" />

          {/* Plan Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <CreditCard className="w-4 h-4" />
              PLAN Y FACTURACIÓN
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
              <div>
                <p className="text-sm text-zinc-400">Tipo de plan</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-zinc-800 text-white border-zinc-700 capitalize">
                    {planLabels[formData.typePlan]}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Ciclo de facturación</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  <p className="font-medium text-white">
                    {cycleLabels[formData.billingCycle]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-zinc-700" />

          {/* Contact Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Phone className="w-4 h-4" />
              INFORMACIÓN DE CONTACTO
            </div>
            <div className="space-y-4 pl-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-400">Teléfono de contacto</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-zinc-400" />
                    <p className="font-medium text-white">
                      {formData.contactPhone}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Email de facturación</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-zinc-400" />
                    <p className="font-medium text-white">
                      {formData.billingEmail}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-zinc-400">
                  Dirección de facturación
                </p>
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                  <p className="font-medium leading-relaxed text-white">
                    {formData.billingAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="bg-yellow-900/20 border-yellow-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-1 rounded-full bg-yellow-900/20 flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <p className="font-medium text-yellow-400">Importante</p>
              <p className="text-sm text-yellow-300/80 mt-1">
                Al proceder con el registro, acepta nuestros términos y
                condiciones. La información proporcionada será utilizada para la
                creación de su cuenta y el procesamiento de pagos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
