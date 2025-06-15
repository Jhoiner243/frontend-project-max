/**
 * Enum for available plan types
 */
export enum TypePlan {
  BASIC = "basic",
  PREMIUM = "premium",
  ENTERPRISE = "enterprise",
}

/**
 * Enum for billing cycle options
 */
export enum BillingCycle {
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  YEARLY = "yearly",
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
}

/**
 * Interface for created entity with ID
 */
export interface CreatedEntity extends RegisterEntidad {
  id: string;
  createdAt: Date;
  status: "active" | "pending" | "inactive";
}

/**
 * Interface for form validation errors
 */
export interface FormErrors {
  nombre?: string;
  typePlan?: string;
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
