import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ZodError } from "zod";
import { LoginDTO } from "../auth.types";
import { useLoginUserMutation } from "../services/service";
import { loginSchema } from "../validations/auth.validations";

const initialValue: LoginDTO = {
  user_email: "",
  user_password: "",
};

export const useLoginHook = () => {
  const [loginData, setLoginData] = useState<LoginDTO>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginUser, { error: createUserError }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Name:", name, "Value:", value); // Verifica el nombre y valor del input
    setLoginData((prev) => ({
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
      const validatedData = loginSchema.parse(loginData);

      console.log("Formulario válido:", validatedData);
      const result = await loginUser(validatedData).unwrap();
      localStorage.setItem("access_token", result.accessToken);
      if (result.message === "User not found") {
        toast.error("Usuario no encontrado");
        return;
      } else if (result.message === "User logged in") navigate("/");
    } catch (err) {
      if (err instanceof ZodError) {
        // Tomamos solo el primer error como mensaje (puedes mostrar todos si querés)
        const firstError = err.errors[0]?.message;
        setError(firstError || "Error en el formulario");
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
    loginData,
    handleChange,
    handleSubmit,
    error,
    isLoading,
  };
};
