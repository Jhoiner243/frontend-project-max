/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Check, CreditCard } from "lucide-react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/steps-entidad/hook";
import { updateFormData } from "../../../../store/steps-entidad/slice";
import { BillingCycle, TypePlan } from "../../types/register-entidad";

/**
 * Step 2: Plan Selection Form
 */
export default function PlanSelectionStep() {
  const dispatch = useAppDispatch();
  const { formData, errors } = useAppSelector((state) => state.registration);

  const handleUpdateFormData = (field: keyof typeof formData, value: any) => {
    dispatch(updateFormData({ field, value }));
  };

  const planFeatures = {
    [TypePlan.BASIC]: [
      "Hasta 5 usuarios",
      "10GB de almacenamiento",
      "Soporte por email",
      "Funciones básicas",
    ],
    [TypePlan.PREMIUM]: [
      "Hasta 25 usuarios",
      "100GB de almacenamiento",
      "Soporte prioritario",
      "Funciones avanzadas",
      "Integraciones API",
    ],
    [TypePlan.ENTERPRISE]: [
      "Usuarios ilimitados",
      "Almacenamiento ilimitado",
      "Soporte 24/7",
      "Todas las funciones",
      "Integraciones personalizadas",
      "Gestor de cuenta dedicado",
    ],
  };

  const planPrices = {
    [TypePlan.BASIC]: { monthly: 29, quarterly: 79, yearly: 299 },
    [TypePlan.PREMIUM]: { monthly: 79, quarterly: 219, yearly: 799 },
    [TypePlan.ENTERPRISE]: { monthly: 199, quarterly: 549, yearly: 1999 },
  };

  const getPrice = (plan: TypePlan, cycle: BillingCycle) => {
    const prices = planPrices[plan];
    switch (cycle) {
      case BillingCycle.MONTHLY:
        return prices.monthly;
      case BillingCycle.QUARTERLY:
        return prices.quarterly;
      case BillingCycle.YEARLY:
        return prices.yearly;
      default:
        return prices.monthly;
    }
  };

  const getSavings = (plan: TypePlan, cycle: BillingCycle) => {
    const prices = planPrices[plan];
    const monthlyTotal =
      prices.monthly * (cycle === BillingCycle.QUARTERLY ? 3 : 12);
    const cyclePrice = getPrice(plan, cycle);
    return cycle !== BillingCycle.MONTHLY
      ? Math.round(((monthlyTotal - cyclePrice) / monthlyTotal) * 100)
      : 0;
  };

  return (
    <div className="space-y-6">
      {/* Plan Type Selection */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/10">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white">Selección de plan</CardTitle>
              <CardDescription className="text-zinc-400">
                Elija el plan que mejor se adapte a las necesidades de su
                entidad
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-white font-medium">
              Tipo de plan <span className="text-red-400">*</span>
            </Label>
            <RadioGroup
              value={formData.typePlan}
              onValueChange={(value) =>
                handleUpdateFormData("typePlan", value as TypePlan)
              }
              className="space-y-4"
            >
              {Object.values(TypePlan).map((plan) => (
                <div key={plan} className="relative">
                  <div
                    className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors cursor-pointer ${
                      formData.typePlan === plan
                        ? "border-white bg-white/5"
                        : "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50"
                    }`}
                  >
                    <RadioGroupItem
                      value={plan}
                      id={plan}
                      className="border-zinc-600 text-white"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor={plan}
                          className="text-white font-medium capitalize cursor-pointer"
                        >
                          {plan === TypePlan.BASIC && "Básico"}
                          {plan === TypePlan.PREMIUM && "Premium"}
                          {plan === TypePlan.ENTERPRISE && "Enterprise"}
                        </Label>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">
                            ${getPrice(plan, formData.billingCycle)}
                            <span className="text-sm font-normal text-zinc-400">
                              /
                              {formData.billingCycle === BillingCycle.MONTHLY
                                ? "mes"
                                : formData.billingCycle ===
                                  BillingCycle.QUARTERLY
                                ? "trimestre"
                                : "año"}
                            </span>
                          </div>
                          {getSavings(plan, formData.billingCycle) > 0 && (
                            <Badge className="bg-green-900 text-green-300 border-green-800 text-xs">
                              Ahorra {getSavings(plan, formData.billingCycle)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {planFeatures[plan].map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-zinc-400"
                          >
                            <Check className="w-3 h-3 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
            {errors.typePlan && (
              <p className="text-sm text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full" />
                {errors.typePlan}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Billing Cycle Selection */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/10">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white">Ciclo de facturación</CardTitle>
              <CardDescription className="text-zinc-400">
                Seleccione la frecuencia de facturación que prefiera
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-white font-medium">
              Frecuencia de pago <span className="text-red-400">*</span>
            </Label>
            <RadioGroup
              value={formData.billingCycle}
              onValueChange={(value) =>
                handleUpdateFormData("billingCycle", value as BillingCycle)
              }
              className="space-y-3"
            >
              {Object.values(BillingCycle).map((cycle) => (
                <div
                  key={cycle}
                  className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors cursor-pointer ${
                    formData.billingCycle === cycle
                      ? "border-white bg-white/5"
                      : "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50"
                  }`}
                >
                  <RadioGroupItem
                    value={cycle}
                    id={cycle}
                    className="border-zinc-600 text-white"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor={cycle}
                        className="text-white font-medium cursor-pointer"
                      >
                        {cycle === BillingCycle.MONTHLY && "Mensual"}
                        {cycle === BillingCycle.QUARTERLY && "Trimestral"}
                        {cycle === BillingCycle.YEARLY && "Anual"}
                      </Label>
                      {getSavings(formData.typePlan, cycle) > 0 && (
                        <Badge className="bg-green-900 text-green-300 border-green-800">
                          Ahorra {getSavings(formData.typePlan, cycle)}%
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">
                      {cycle === BillingCycle.MONTHLY && "Facturación cada mes"}
                      {cycle === BillingCycle.QUARTERLY &&
                        "Facturación cada 3 meses"}
                      {cycle === BillingCycle.YEARLY &&
                        "Facturación anual con descuento"}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
            {errors.billingCycle && (
              <p className="text-sm text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full" />
                {errors.billingCycle}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
