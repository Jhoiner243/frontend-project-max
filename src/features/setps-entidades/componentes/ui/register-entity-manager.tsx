"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAppDispatch, useAppSelector } from "@/store/steps-entidad/hook";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  setCreatedEntity,
  setCurrentStep,
  setErrors,
  setIsSubmitting,
} from "../../../../store/steps-entidad/slice";
import { useCreateEntidadMutation } from "../../api";
import { validateAllSteps, validateStep } from "../../validations/validations";
import BasicInfoStep from "./basic-info-step";
import ContactInfoStep from "./contact-info-step";
import PlanSelectionStep from "./plan-selection-step";
import ReviewStep from "./review-step";

/**
 * Step configuration
 */
const steps = [
  {
    id: 1,
    title: "Información Básica",
    description: "Datos generales de la entidad",
    component: BasicInfoStep,
  },
  {
    id: 2,
    title: "Plan y Facturación",
    description: "Selección de plan y ciclo",
    component: PlanSelectionStep,
  },
  {
    id: 3,
    title: "Información de Contacto",
    description: "Datos de contacto y facturación",
    component: ContactInfoStep,
  },
  {
    id: 4,
    title: "Revisar y Confirmar",
    description: "Verificación final de datos",
    component: ReviewStep,
  },
];

/**
 * Main Registration Manager Component
 */
export default function RegisterEntityManager() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Redux state selectors
  const { formData, currentStep, isSubmitting } = useAppSelector(
    (state) => state.registration
  );
  const [createEntity] = useCreateEntidadMutation();

  const [submitError, setSubmitError] = useState<string>("");
  const [animationDirection, setAnimationDirection] = useState<
    "forward" | "backward"
  >("forward");

  // Calculate progress percentage
  const progress = (currentStep / steps.length) * 100;

  /**
   * Valida el paso actual y pasa al siguiente paso
   */
  const handleNextStep = () => {
    const stepErrors = validateStep(currentStep, formData);

    if (Object.keys(stepErrors).length === 0) {
      dispatch(setErrors({}));
      setAnimationDirection("forward");
      dispatch(setCurrentStep(Math.min(currentStep + 1, steps.length)));
      setSubmitError("");
    } else {
      dispatch(setErrors(stepErrors));
    }
  };

  /**
   * Moves to previous step
   */
  const handlePrevStep = () => {
    setAnimationDirection("backward");
    dispatch(setCurrentStep(Math.max(currentStep - 1, 1)));
    dispatch(setErrors({}));
    setSubmitError("");
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async () => {
    // Final validation of all steps
    const allErrors = validateAllSteps(formData);

    if (Object.keys(allErrors).length > 0) {
      dispatch(setErrors(allErrors));
      // Go back to first step with errors
      for (let step = 1; step <= 3; step++) {
        const stepErrors = validateStep(step, formData);
        if (Object.keys(stepErrors).length > 0) {
          setAnimationDirection("backward");
          dispatch(setCurrentStep(step));
          break;
        }
      }
      return;
    }

    dispatch(setIsSubmitting(true));
    setSubmitError("");

    try {
      const response = await createEntity(formData).unwrap();

      if (response && response.datos) {
        dispatch(setCreatedEntity(response.datos));
        // Navigate to the created entity page
      } else {
        setSubmitError("Error desconocido al crear la entidad");
      }
    } catch {
      setSubmitError("Error de conexión. Por favor, intente nuevamente.");
    } finally {
      dispatch(setIsSubmitting(false));
    }
  };

  // Get current step component
  const CurrentStepComponent = steps[currentStep - 1]?.component;

  // Animation variants
  const variants = {
    enter: (direction: string) => ({
      x: direction === "forward" ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "forward" ? -20 : 20,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-black">
      <Button
        onClick={() => navigate("/register-entity")}
        className="flex  absolute ml-[10%] mt-20  bg-black cursor-default  rounded-full p-2 font-medium   dark:bg-white/80 dark:transition dark:duration-200 dark:hover:bg-white"
      >
        <ArrowLeft className="m-1 w-5 h-5 group-hover:translate-x-3 transition-transform" />
        Back
      </Button>
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Header */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Registro de Entidad
          </h1>
          <p className="text-zinc-400">
            Complete el proceso de registro siguiendo los pasos indicados
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="mb-6">
            <Progress value={progress} className="h-2 bg-zinc-800">
              <div
                className="h-full bg-white transition-all duration-300 ease-in-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </Progress>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  {currentStep > step.id ? (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-black" />
                    </div>
                  ) : currentStep === step.id ? (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <span className="text-sm font-bold text-black">
                        {step.id}
                      </span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-zinc-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-zinc-400">
                        {step.id}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-white" : "text-zinc-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-zinc-500 hidden md:block">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <p className="text-red-400 text-sm">{submitError}</p>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="mb-8 min-h-[500px]">
          <AnimatePresence mode="wait" custom={animationDirection}>
            <motion.div
              key={currentStep}
              custom={animationDirection}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.3 }}
            >
              {CurrentStepComponent && <CurrentStepComponent />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-2 bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="text-sm text-zinc-400">
            Paso {currentStep} de {steps.length}
          </div>

          {currentStep < steps.length ? (
            <Button
              onClick={handleNextStep}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Completar Registro
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
