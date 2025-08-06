/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SonnerToast } from "../../../utils/sonner-toast";

// Tipo para definir los campos del formulario
export type FieldDefinition = {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "textarea" | "select";
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // Para campos select
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
};

// Props del componente
interface EntityFormProps {
  title: string;
  description?: string;
  entityName: string;
  fields: FieldDefinition[];
  onSubmit: (data: any) => Promise<{ success: boolean; message?: string }>;
  submitButtonText?: string;
  cancelButtonText?: string;
  onCancel?: () => void;
}

export function EntityForm({
  title,
  description,
  entityName,
  fields,
  onSubmit,
  submitButtonText = "Guardar",
  cancelButtonText = "Cancelar",
  onCancel,
}: EntityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Construir el esquema de validación dinámicamente basado en los campos

  const generateValidationSchema = () => {
    const schema: Record<string, any> = {};

    fields.forEach((field) => {
      let fieldSchema: z.ZodTypeAny;

      // Establecer el tipo base
      switch (field.type) {
        case "email":
          fieldSchema = z.string().email("Email inválido");
          break;
        case "number":
          fieldSchema = z.coerce.number();
          break;
        default:
          fieldSchema = z.string();
          break;
      }

      // Validaciones comunes por tipo
      if (field.type === "number") {
        if (field.validation?.min !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(field.validation.min, {
            message: `Mínimo ${field.validation.min}`,
          });
        }
        if (field.validation?.max !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(field.validation.max, {
            message: `Máximo ${field.validation.max}`,
          });
        }
      }

      // Solo para strings
      if (fieldSchema._def.typeName === "ZodString") {
        if (typeof field.validation?.minLength === "number") {
          fieldSchema = (fieldSchema as z.ZodString).min(
            field.validation.minLength,
            { message: `Mínimo ${field.validation.minLength} caracteres` }
          );
        }

        if (typeof field.validation?.maxLength === "number") {
          fieldSchema = (fieldSchema as z.ZodString).max(
            field.validation.maxLength,
            { message: `Máximo ${field.validation.maxLength} caracteres` }
          );
        }

        if (field.validation?.pattern) {
          fieldSchema = (fieldSchema as z.ZodString).regex(
            field.validation.pattern,
            { message: "Formato inválido" }
          );
        }
      }

      // Requerido u opcional
      if (field.required) {
        if (fieldSchema._def.typeName === "ZodString") {
          fieldSchema = (fieldSchema as z.ZodString).min(
            1,
            `${field.label} es requerido`
          );
        }
      } else {
        fieldSchema = fieldSchema.optional();
      }

      schema[field.name] = fieldSchema;
    });

    return z.object(schema);
  };

  const formSchema = generateValidationSchema();

  // Configurar el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, any>),
  });

  // Manejar el envío del formulario
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const result = await onSubmit(data);

      if (result.success) {
        SonnerToast({
          title: "¡Éxito!",
          description:
            result.message || `${entityName} agregado correctamente.`,
        });
        form.reset();
      } else {
        SonnerToast({
          title: "Error",
          variant: "destructive",
          description:
            result.message || "Ocurrió un error al procesar la solicitud.",
        });
      }
    } catch (error) {
      SonnerToast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error inesperado.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.type === "select" ? (
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value}
                      >
                        <SelectTrigger className="w-[70%]">
                          <SelectValue
                            placeholder={
                              field.placeholder || `Seleccionar ${field.label}`
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...formField}
                      />
                    )}
                  </FormControl>
                  {field.description && (
                    <FormDescription>{field.description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex justify-center gap-2 pt-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {cancelButtonText}
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {submitButtonText}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
