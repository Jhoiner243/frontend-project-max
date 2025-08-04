"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { CreditCard, Mail, MapPin, Phone, Plus, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateClientMutation,
  useLazyGetClientsQuery,
} from "../../../../store/clients/api";
import { clientCreate } from "../../client.types";

// Simulando los hooks de RTK Query

interface FieldDefinition {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
}

interface ClientCreateDialogProps {
  isSecondDialog?: boolean;
}

export default function ClientCreateDialog({
  isSecondDialog = false,
}: ClientCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<clientCreate>({
    name: "",
    email: "",
    indentification: "",
    phone: "",
    address: "",
  });

  const [createClient] = useCreateClientMutation();
  const [trigger] = useLazyGetClientsQuery();

  const clientFields: FieldDefinition[] = [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Nombre del cliente",
      required: true,
    },
    {
      name: "email",
      label: "Correo electrónico",
      type: "email",
      placeholder: "correo@ejemplo.com",
      required: true,
    },
    {
      name: "identification",
      label: "Número de cédula",
      type: "text",
      placeholder: "1029320392",
      validation: {
        minLength: 10,
        maxLength: 10,
      },
      required: true,
    },
    {
      name: "phone",
      label: "Teléfono",
      type: "text",
      validation: {
        minLength: 10,
        maxLength: 15,
      },
      placeholder: "123-456-7890",
    },
    {
      name: "address",
      label: "Ubicación",
      type: "text",
      placeholder: "Ej: calle 13",
    },
  ];

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "name":
        return <User className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "indentification":
        return <CreditCard className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "address":
        return <MapPin className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    clientFields.forEach((field) => {
      const value = formData[field.name as keyof typeof formData];

      if (field.required && !value.trim()) {
        errors.push(`${field.label} es requerido`);
      }

      if (field.validation) {
        if (
          field.validation.minLength &&
          value.length < field.validation.minLength
        ) {
          errors.push(
            `${field.label} debe tener al menos ${field.validation.minLength} caracteres`
          );
        }
        if (
          field.validation.maxLength &&
          value.length > field.validation.maxLength
        ) {
          errors.push(
            `${field.label} debe tener máximo ${field.validation.maxLength} caracteres`
          );
        }
      }

      if (field.type === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
        errors.push("El correo electrónico no es válido");
      }
    });

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      toast.error("Error de validación");
      return;
    }

    setLoading(true);

    try {
      await createClient(formData);
      await trigger();

      toast.success("Cliente creado");

      setFormData({
        name: "",
        email: "",
        indentification: "",
        phone: "",
        address: "",
      });

      setOpen(false);
    } catch {
      toast.error("Error al crear cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={isSecondDialog ? "ml-4" : ""}
        >
          <Button
            variant={isSecondDialog ? "secondary" : "default"}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            x: isSecondDialog ? 50 : -50,
            y: isSecondDialog ? -20 : 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.3,
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Agregar Cliente
            </DialogTitle>
            <DialogDescription>
              Ingresa los datos del nuevo cliente para agregarlo al sistema
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            {clientFields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <Label htmlFor={field.name} className="flex items-center gap-2">
                  {getFieldIcon(field.name)}
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  required={field.required}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </motion.div>
            ))}
          </form>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="gap-2"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {loading ? "Creando..." : "Crear Cliente"}
              </Button>
            </motion.div>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
