/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Factory } from "lucide-react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/steps-entidad/hook";
import { updateFormData } from "../../../../store/steps-entidad/slice";

/**
 * Step 1: Basic Information Form
 */
export default function BasicInfoStep() {
  const dispatch = useAppDispatch();
  const { formData, errors } = useAppSelector((state) => state.registration);

  const handleUpdateFormData = (field: keyof typeof formData, value: any) => {
    dispatch(updateFormData({ field, value }));
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/10">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-white">Información básica</CardTitle>
            <CardDescription className="text-zinc-400">
              Ingrese los datos básicos de la entidad que desea registrar
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Entity Name */}
        <div className="space-y-2">
          <Label htmlFor="nombre" className="text-white font-medium">
            Nombre de la entidad <span className="text-red-400">*</span>
          </Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => handleUpdateFormData("nombre", e.target.value)}
            placeholder="Ej: Tecnología Avanzada S.A."
            className={`bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white focus:ring-white ${
              errors.nombre
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
          />
          {errors.nombre && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full" />
              {errors.nombre}
            </p>
          )}
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label
            htmlFor="industry"
            className="text-white font-medium flex items-center gap-2"
          >
            <Factory className="w-4 h-4" />
            Industria <span className="text-red-400">*</span>
          </Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => handleUpdateFormData("industry", e.target.value)}
            placeholder="Ej: Tecnología, Salud, Educación, Manufactura"
            className={`bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white focus:ring-white ${
              errors.industry
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
          />
          {errors.industry && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full" />
              {errors.industry}
            </p>
          )}
          <p className="text-xs text-zinc-500">
            Especifique el sector o industria principal de su entidad
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
