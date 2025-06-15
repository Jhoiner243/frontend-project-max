/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, CheckCircle, Circle } from "lucide-react";
import { useState } from "react";
import {
  BillingCycle,
  RegisterEntidad,
  TypePlan,
} from "../../types/register-entidad";

const steps = [
  {
    id: 1,
    title: "Información Básica",
    description: "Datos generales de la entidad",
  },
  {
    id: 2,
    title: "Plan y Facturación",
    description: "Selecciona tu plan y ciclo de facturación",
  },
  {
    id: 3,
    title: "Información de Contacto",
    description: "Datos de contacto y facturación",
  },
];

export default function RegisterEntityStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegisterEntidad>({
    nombre: "",
    typePlan: TypePlan.BASIC,
    billingCycle: BillingCycle.MONTHLY,
    industry: "",
    contactPhone: 0,
    billingEmail: "",
    billingAddress: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterEntidad>>({});

  const updateFormData = (field: keyof RegisterEntidad, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<RegisterEntidad> = {};

    switch (step) {
      case 1:
        if (!formData.nombre.trim())
          newErrors.nombre = "El nombre es requerido";
        if (!formData.industry.trim())
          newErrors.industry = "La industria es requerida";
        break;
      case 2:
        // TypePlan and BillingCycle have default values, so no validation needed
        break;
      case 3:
        if (!formData.contactPhone || formData.contactPhone <= 0) {
          newErrors.contactPhone = 0;
        }
        if (!formData.billingEmail.trim()) {
          newErrors.billingEmail = "El email de facturación es requerido";
        } else if (!/\S+@\S+\.\S+/.test(formData.billingEmail)) {
          newErrors.billingEmail = "El email no es válido";
        }
        if (!formData.billingAddress.trim()) {
          newErrors.billingAddress = "La dirección de facturación es requerida";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("Datos del registro:", formData);
      // Aquí puedes enviar los datos a tu API
      alert("¡Registro completado exitosamente!");
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Registro de Entidad
        </h1>
        <p className="text-muted-foreground text-center">
          Complete los siguientes pasos para registrar su entidad
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="mb-4" />
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                {currentStep > step.id ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : currentStep === step.id ? (
                  <Circle className="w-6 h-6 text-blue-600 fill-blue-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
              </div>
              <div className="text-center">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la Entidad *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => updateFormData("nombre", e.target.value)}
                  placeholder="Ingrese el nombre de la entidad"
                  className={errors.nombre ? "border-red-500" : ""}
                />
                {errors.nombre && (
                  <p className="text-sm text-red-500">{errors.nombre}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industria *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => updateFormData("industry", e.target.value)}
                  placeholder="Ej: Tecnología, Salud, Educación"
                  className={errors.industry ? "border-red-500" : ""}
                />
                {errors.industry && (
                  <p className="text-sm text-red-500">{errors.industry}</p>
                )}
              </div>
            </>
          )}

          {/* Step 2: Plan and Billing */}
          {currentStep === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="typePlan">Tipo de Plan</Label>
                <Select
                  value={formData.typePlan}
                  onValueChange={(value) =>
                    updateFormData("typePlan", value as TypePlan)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TypePlan.BASIC}>Básico</SelectItem>
                    <SelectItem value={TypePlan.PREMIUM}>Premium</SelectItem>
                    <SelectItem value={TypePlan.ENTERPRISE}>
                      Enterprise
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingCycle">Ciclo de Facturación</Label>
                <Select
                  value={formData.billingCycle}
                  onValueChange={(value) =>
                    updateFormData("billingCycle", value as BillingCycle)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el ciclo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={BillingCycle.MONTHLY}>
                      Mensual
                    </SelectItem>
                    <SelectItem value={BillingCycle.YEARLY}>Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Resumen del Plan</h4>
                <p className="text-sm text-muted-foreground">
                  Plan: <span className="font-medium">{formData.typePlan}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Facturación:{" "}
                  <span className="font-medium">{formData.billingCycle}</span>
                </p>
              </div>
            </>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Teléfono de Contacto *</Label>
                <Input
                  id="contactPhone"
                  type="number"
                  value={formData.contactPhone || ""}
                  onChange={(e) =>
                    updateFormData(
                      "contactPhone",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="Ej: 1234567890"
                  className={errors.contactPhone ? "border-red-500" : ""}
                />
                {errors.contactPhone && (
                  <p className="text-sm text-red-500">{errors.contactPhone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingEmail">Email de Facturación *</Label>
                <Input
                  id="billingEmail"
                  type="email"
                  value={formData.billingEmail}
                  onChange={(e) =>
                    updateFormData("billingEmail", e.target.value)
                  }
                  placeholder="facturacion@empresa.com"
                  className={errors.billingEmail ? "border-red-500" : ""}
                />
                {errors.billingEmail && (
                  <p className="text-sm text-red-500">{errors.billingEmail}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingAddress">
                  Dirección de Facturación *
                </Label>
                <Textarea
                  id="billingAddress"
                  value={formData.billingAddress}
                  onChange={(e) =>
                    updateFormData("billingAddress", e.target.value)
                  }
                  placeholder="Ingrese la dirección completa de facturación"
                  className={`min-h-[100px] ${
                    errors.billingAddress ? "border-red-500" : ""
                  }`}
                />
                {errors.billingAddress && (
                  <p className="text-sm text-red-500">
                    {errors.billingAddress}
                  </p>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </Button>

        {currentStep < steps.length ? (
          <Button onClick={nextStep} className="flex items-center gap-2">
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700"
          >
            Completar Registro
          </Button>
        )}
      </div>
    </div>
  );
}
