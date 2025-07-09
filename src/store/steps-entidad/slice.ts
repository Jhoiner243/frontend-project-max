import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  BillingCycle,
  CreatedEntity,
  FormErrors,
  RegisterEntidad,
  TypePlan,
} from "../../features/setps-entidades/types/register-entidad";

/**
 * Initial form data with default values
 */
const initialFormData: RegisterEntidad = {
  nombre: "",
  typePlan: TypePlan.BASIC,
  billingCycle: BillingCycle.MONTHLY,
  createBy: "",
  industry: "",
  contactPhone: 0,
  billingEmail: "",
  billingAddress: "",
};

/**
 * Interface for the registration state
 */
interface RegistrationState {
  // Form data
  formData: RegisterEntidad;

  // UI state
  currentStep: number;
  isSubmitting: boolean;
  errors: FormErrors;

  // Created entity
  createdEntity: CreatedEntity | null;
}

/**
 * Initial state
 */
const initialState: RegistrationState = {
  formData: initialFormData,
  currentStep: 1,
  isSubmitting: false,
  errors: {},
  createdEntity: null,
};

/**
 * Registration slice
 */
const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    updateFormData: <K extends keyof RegisterEntidad>(
      state: RegistrationState,
      action: PayloadAction<{ field: K; value: RegisterEntidad[K] }>
    ) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
      if (state.errors[field]) {
        delete state.errors[field];
      }
    },

    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    setErrors: (state, action: PayloadAction<FormErrors>) => {
      state.errors = action.payload;
    },

    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },

    setCreatedEntity: (state, action: PayloadAction<CreatedEntity | null>) => {
      state.createdEntity = action.payload;
    },

    resetForm: (state) => {
      state.formData = initialFormData;
      state.currentStep = 1;
      state.errors = {};
      state.createdEntity = null;
      state.isSubmitting = false;
    },

    clearError: (state, action: PayloadAction<keyof RegisterEntidad>) => {
      const field = action.payload;
      if (state.errors[field]) {
        delete state.errors[field];
      }
    },
  },
});

const persistConfig = {
  key: "registration",
  storage,
  whitelist: ["formData", "currentStep"],
};

export const {
  updateFormData,
  setCurrentStep,
  setErrors,
  setIsSubmitting,
  setCreatedEntity,
  resetForm,
  clearError,
} = registrationSlice.actions;

export default persistReducer(persistConfig, registrationSlice.reducer);
