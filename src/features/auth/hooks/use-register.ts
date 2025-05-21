import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ZodError } from "zod";
import { RegisterDTO } from "../auth.types";
import { useCreateUserMutation } from "../services/service";
import { registerSchema } from "../validations/auth.validations";

const initialValue: RegisterDTO = {
  user_name: "",
  user_username: "",
  user_lastname: "",
  user_email: "",
  user_password: "",
};

export const useRegisterHook = () => {
  const [newUser, setNewUser] = useState<RegisterDTO>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createUser, { error: createUserError }] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Limpiamos error cuando el usuario empieza a escribir
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validación completa del formulario
      const validatedData = registerSchema.parse(newUser);

      createUser(validatedData);
      navigate("/login"); // Redirigir a la página de login después de crear el usuario
    } catch (err) {
      if (err instanceof ZodError) {
        // Tomamos solo el primer error como mensaje (puedes mostrar todos si querés)
        const firstError = err.errors[0]?.message;
        setError(firstError || "Error en el formulario");
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (createUserError) {
    if (
      "data" in createUserError &&
      createUserError.data &&
      typeof createUserError.data === "object" &&
      "message" in createUserError.data
    ) {
      toast.error((createUserError.data as { message: string }).message);
    } else {
      toast.error("An unexpected error occurred");
    }
  }
  return {
    newUser,
    handleChange,
    handleSubmit,
    error,
    isLoading,
  };
};
