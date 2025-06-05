/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignUp, SignUpButton, useAuth, useSignUp } from "@clerk/clerk-react";
import { useState } from "react";

export function Register() {
  const { signUp, setActive } = useSignUp();
  const { getToken } = useAuth(); // <-- aquí obtenés el token
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!signUp) throw new Error("signUp no disponible");

      // Preparar verificación de correo
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Simulación de verificación (reemplazar en producción)
      const complete = await signUp.attemptEmailAddressVerification({
        code: "000000", // En producción pedilo al usuario
      });

      if (complete.status === "complete") {
        if (setActive) {
          await setActive({ session: complete.createdSessionId });
        }

        // ✅ Obtener token JWT del usuario ya autenticado
        const token = await getToken();

        if (!token) throw new Error("No se pudo obtener el token");

        // Enviar petición vacía al backend con el token en headers
        const response = await fetch("http://localhost:3003/register", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error al registrar en el backend");
        }

        console.log("✅ Usuario registrado correctamente en backend");
      } else {
        throw new Error("No se pudo activar la sesión.");
      }
    } catch (err: any) {
      console.error("Error al registrar:", err);
      setError(err.message || "Error desconocido");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <SignUp />
        <SignUpButton>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Registrar
          </button>
        </SignUpButton>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
