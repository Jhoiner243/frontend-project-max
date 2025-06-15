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
import { Textarea } from "@/components/ui/textarea";
// import { RootState } from "@reduxjs/toolkit/query";
import { Mail, MapPin, Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store"; // Adjust the path to where your store's RootState is exported
import { updateFormData } from "../../../../store/steps-entidad/slice";

/**
 * Step 3: Contact Information Form
 */
export default function ContactInfoStep() {
  const { formData, errors } = useSelector(
    (state: RootState) => state.registration
  );

  const dispath = useDispatch();

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/10">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-white">
              Información de Contacto
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Proporcione los datos de contacto y facturación de la entidad
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Phone */}
        <div className="space-y-2">
          <Label
            htmlFor="contactPhone"
            className="text-white font-medium flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Teléfono de Contacto <span className="text-red-400">*</span>
          </Label>
          <Input
            id="contactPhone"
            type="tel"
            value={formData.contactPhone || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
              dispath(
                updateFormData({
                  field: "contactPhone",
                  value: value ? value.toString() : "",
                })
              );
            }}
            placeholder="Ej: 1234567890"
            className={`bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white focus:ring-white ${
              errors.contactPhone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
          />
          {errors.contactPhone && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full" />
              {errors.contactPhone}
            </p>
          )}
          <p className="text-xs text-zinc-500">
            Ingrese solo números (10-15 dígitos)
          </p>
        </div>

        {/* Billing Email */}
        <div className="space-y-2">
          <Label
            htmlFor="billingEmail"
            className="text-white font-medium flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Email de Facturación <span className="text-red-400">*</span>
          </Label>
          <Input
            id="billingEmail"
            type="email"
            value={formData.billingEmail}
            onChange={(e) => {
              const value = e.target.value;
              dispath(
                updateFormData({
                  field: "billingEmail",
                  value: value.toString(),
                })
              );
            }}
            placeholder="facturacion@empresa.com"
            className={`bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white focus:ring-white ${
              errors.billingEmail
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
          />
          {errors.billingEmail && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full" />
              {errors.billingEmail}
            </p>
          )}
          <p className="text-xs text-zinc-500">
            Este email se utilizará para enviar las facturas
          </p>
        </div>

        {/* Billing Address */}
        <div className="space-y-2">
          <Label
            htmlFor="billingAddress"
            className="text-white font-medium flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Dirección de Facturación <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="billingAddress"
            value={formData.billingAddress}
            onChange={(e) => {
              const value = e.target.value;
              dispath(
                updateFormData({
                  field: "billingAddress",
                  value: value,
                })
              );
            }}
            placeholder="Calle, número, colonia, ciudad, estado, código postal"
            className={`min-h-[100px] resize-none bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white focus:ring-white ${
              errors.billingAddress
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
          />
          {errors.billingAddress && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-400 rounded-full" />
              {errors.billingAddress}
            </p>
          )}
          <p className="text-xs text-zinc-500">
            Proporcione la dirección completa para facturación
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
