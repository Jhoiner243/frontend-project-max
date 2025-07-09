/**
 * Enum for available plan types
 */
export enum TypePlan {
  BASIC = "Gratuito",
  PREMIUM = "Basico",
  ENTERPRISE = "Premium",
}

/**
 * Enum for billing cycle options
 */
export enum BillingCycle {
  MONTHLY = "Mensual",
  QUARTERLY = "Quincenal",
  YEARLY = "Anual",
}

/**
 * Interface for entity registration data
 */
export interface RegisterEntidad {
  nombre: string;
  typePlan: TypePlan;
  billingCycle: BillingCycle;
  industry: string;
  contactPhone: number;
  billingEmail: string;
  billingAddress: string;
  createBy: string;
}

/**
 * Interface for created entity with ID
 */
export interface CreatedEntity extends RegisterEntidad {
  id: string;
  organizationId: string;
  createdAt: Date;
  status: "active" | "pending" | "inactive";
}

/**
 * Interface for form validation errors
 */
export interface FormErrors {
  nombre?: string;
  typePlan?: string;
  createBy?: string;
  billingCycle?: string;
  industry?: string;
  contactPhone?: string;
  billingEmail?: string;
  billingAddress?: string;
}

/**
 * Interface for API response
 */
export interface ApiResponse {
  success: boolean;
  data?: CreatedEntity;
  error?: string;
}
