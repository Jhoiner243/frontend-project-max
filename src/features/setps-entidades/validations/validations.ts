import type { FormErrors, RegisterEntidad } from "../types/register-entidad";

/**
 * Validates phone number format
 */
export const validatePhoneNumber = (phone: number): boolean => {
  const phoneStr = phone.toString();
  // Basic phone validation: 10-15 digits
  return /^\d{10,15}$/.test(phoneStr);
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates form data for a specific step
 */
export const validateStep = (
  step: number,
  formData: RegisterEntidad
): FormErrors => {
  const errors: FormErrors = {};

  switch (step) {
    case 1: // Basic Information
      if (!formData.nombre.trim()) {
        errors.nombre = "El nombre de la entidad es requerido";
      } else if (formData.nombre.length < 2) {
        errors.nombre = "El nombre debe tener al menos 2 caracteres";
      }

      if (!formData.industry.trim()) {
        errors.industry = "La industria es requerida";
      } else if (formData.industry.length < 2) {
        errors.industry = "La industria debe tener al menos 2 caracteres";
      }
      break;

    case 2: // Plan Selection
      // TypePlan and BillingCycle have default values, minimal validation needed
      if (!formData.typePlan) {
        errors.typePlan = "Debe seleccionar un tipo de plan";
      }
      if (!formData.billingCycle) {
        errors.billingCycle = "Debe seleccionar un ciclo de facturación";
      }
      break;

    case 3: // Contact Information
      if (!formData.contactPhone || formData.contactPhone <= 0) {
        errors.contactPhone = "El teléfono de contacto es requerido";
      } else if (!validatePhoneNumber(formData.contactPhone)) {
        errors.contactPhone =
          "El formato del teléfono no es válido (10-15 dígitos)";
      }

      if (!formData.billingEmail.trim()) {
        errors.billingEmail = "El email de facturación es requerido";
      } else if (!validateEmail(formData.billingEmail)) {
        errors.billingEmail = "El formato del email no es válido";
      }

      if (!formData.billingAddress.trim()) {
        errors.billingAddress = "La dirección de facturación es requerida";
      } else if (formData.billingAddress.length < 10) {
        errors.billingAddress =
          "La dirección debe ser más específica (mínimo 10 caracteres)";
      }
      break;
  }

  return errors;
};

/**
 * Validar todo el formulario
 */
export const validateAllSteps = (formData: RegisterEntidad): FormErrors => {
  const errors: FormErrors = {};

  // Combine all step validations
  for (let step = 1; step <= 3; step++) {
    const stepErrors = validateStep(step, formData);
    Object.assign(errors, stepErrors);
  }

  return errors;
};
