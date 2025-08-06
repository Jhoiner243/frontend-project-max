"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useOrganizationList } from "@clerk/clerk-react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle,
  CreditCard,
  Factory,
  FileText,
  Loader,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BillingCycle,
  CreatedEntity,
  TypePlan,
} from "../../types/register-entidad";
import { getEntityById } from "./get-by-id";

/**
 * Entity Details Page Component for React
 */
export default function EntityDetailsPage() {
  const [entity, setEntity] = useState<CreatedEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const params = useParams();
  const id = params.id as string;
  const { setActive } = useOrganizationList();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        setLoading(true);
        if (id) {
          const findData = await getEntityById();
          setEntity(findData);
        }
      } catch {
        setError(`Error al cargar la información de la entidad`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEntity();
    }
  }, [id]);

  const handleNewRegistration = () => {
    navigate("/");
  };

  const handleClick = async () => {
    try {
      if (setActive) {
        if (entity) {
          await setActive({ organization: entity.organizationId });
          navigate("/dashboard");
          localStorage.removeItem("entities");
        }
      }
    } catch (error) {
      console.error("Error al activar organización:", error);
    }
  };

  const planLabels = {
    [TypePlan.BASIC]: "Gratuito",
    [TypePlan.PREMIUM]: "Premium",
    [TypePlan.ENTERPRISE]: "Enterprise",
  };

  const cycleLabels = {
    [BillingCycle.MONTHLY]: "Mensual",
    [BillingCycle.QUARTERLY]: "Trimestral",
    [BillingCycle.YEARLY]: "Anual",
  };

  const statusColors = {
    active: "bg-green-900 text-green-300 border-green-800",
    pending: "bg-yellow-900 text-yellow-300 border-yellow-800",
    inactive: "bg-zinc-800 text-zinc-300 border-zinc-700",
  };

  const statusLabels = {
    active: "Activa",
    pending: "Pendiente",
    inactive: "Inactiva",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-10 h-10 animate-spin text-white/80" />
          <p className="text-zinc-400">Cargando información de la entidad...</p>
        </div>
      </div>
    );
  }

  if (error || !entity) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-2xl mx-auto p-6 pt-20">
          <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <p className="text-red-400">{error || "Entidad no encontrada"}</p>
            </div>
          </div>
          <div className="text-center">
            <Button
              onClick={handleNewRegistration}
              className="bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto p-6 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/20 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-green-400 mb-2">
            ¡Registro completado!
          </h1>
          <p className="text-zinc-400">
            La entidad ha sido registrada exitosamente en el sistema
          </p>
        </div>

        {/* Entity Information */}
        <Card className="mb-6 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/10">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">
                    Información de la entidad
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-zinc-400">
                    <FileText className="w-4 h-4" />
                    ID: {entity.id} • Creada el{" "}
                    {new Date(entity.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </CardDescription>
                </div>
              </div>
              <Badge className={statusColors[entity.status]}>
                {statusLabels[entity.status]}
              </Badge>
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
                  <p className="font-medium text-lg text-white">
                    {entity.nombre}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Industria</p>
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4 text-zinc-400" />
                    <p className="font-medium text-white">{entity.industry}</p>
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
                  <Badge className="bg-zinc-800 text-white border-zinc-700 text-base px-3 py-1">
                    {planLabels[entity.typePlan]}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Ciclo de facturación</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <p className="font-medium text-white">
                      {cycleLabels[entity.billingCycle]}
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
                    <p className="text-sm text-zinc-400">
                      Teléfono de contacto
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-zinc-400" />
                      <p className="font-medium text-white">
                        {entity.contactPhone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">
                      Email de facturación
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-zinc-400" />
                      <p className="font-medium text-white">
                        {entity.billingEmail}
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
                      {entity.billingAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleClick}
            className="bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800 flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Comenzar
          </Button>
          <Button
            onClick={handleNewRegistration}
            className="bg-white text-black hover:bg-zinc-200 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            Registrar nueva entidad
          </Button>
        </div>
      </div>
    </div>
  );
}
