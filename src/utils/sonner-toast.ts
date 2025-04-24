import React from "react";
import { toast } from "sonner";

interface ToastOptions {
  // Define the properties of ToastOptions based on the related code or documentation
  richColors?: boolean;
  [key: string]: unknown;
}

interface IToastProps extends ToastOptions {
  title: string;
  description: string;
  style?: React.CSSProperties;
}

export const SonnerToast = ({
  title,
  description,
  style,
  ...props
}: IToastProps) => {
  toast(title, {
    description,
    style,
    ...props,
  });
  return null;
};
