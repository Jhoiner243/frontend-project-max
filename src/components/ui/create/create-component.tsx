/* eslint-disable @typescript-eslint/no-explicit-any */
"\"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EntityForm, type FieldDefinition } from "./entity-form";

interface EntitySheetProps {
  title: string;
  description?: string;
  entityName: string;
  fields: FieldDefinition[];
  onSubmit: (data: any) => Promise<{ success: boolean; message?: string }>;
  triggerButtonText?: string;
  submitButtonText?: string;
  data?: any;
  side?: "top" | "right" | "bottom" | "left";
  size?: "sm" | "default" | "lg" | "xl" | "full" | "content";
}

export function EntitySheet({
  title,
  description,
  entityName,
  fields,
  onSubmit,
  triggerButtonText = `Agregar ${entityName}`,
  submitButtonText = "Guardar",
  side = "right",
  size = "default",
}: EntitySheetProps) {
  const [open, setOpen] = useState(false);

  // Wrapper para el onSubmit que cierra el sheet si es exitoso
  const handleSubmit = async (data: any) => {
    const result = await onSubmit(data);
    if (result.success) {
      setOpen(false);
    }
    return result;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {triggerButtonText}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={side}
        className={`${
          size === "xl"
            ? "sm:max-w-xl"
            : size === "lg"
            ? "sm:max-w-lg"
            : size === "sm"
            ? "sm:max-w-sm"
            : size === "full"
            ? "w-screen"
            : ""
        } overflow-y-auto`}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="py-6">
          <EntityForm
            title=""
            entityName={entityName}
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText={submitButtonText}
            cancelButtonText="Cancelar"
            onCancel={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
