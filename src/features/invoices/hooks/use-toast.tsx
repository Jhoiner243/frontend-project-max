// hooks/use-toast.ts
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast";
import * as React from "react";

type ToastOptions = {
  title?: string;
  description?: string;
  duration?: number;
};

export function useToast() {
  const [toasts, setToasts] = React.useState<Array<{ id: number } & ToastOptions>>([]);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...options }]);

    // Remover el toast después de 'duration' milisegundos (default 5s)
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, options.duration ?? 5000);
  }, []);

  // Componente contenedor de toasts
  const ToastContainer = React.useCallback(() => {
    return (
      <>
        {toasts.map((t) => (
          <Toast key={t.id}>
            {t.title && <ToastTitle>{t.title}</ToastTitle>}
            {t.description && <ToastDescription>{t.description}</ToastDescription>}
            <ToastClose />
          </Toast>
        ))}
      </>,
      [toasts]
    );
  }, [toasts]);

  return { toast, ToastContainer };
}
