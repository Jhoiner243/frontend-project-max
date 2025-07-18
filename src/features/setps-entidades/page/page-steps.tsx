import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrganization } from "@clerk/clerk-react";
import { ArrowRight, CheckCircle, Clock, Shield } from "lucide-react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function HomePage() {
  const { organization } = useOrganization();
  const navigate = useNavigate();

  const redirectToRegisterEntity = () => {
    if (!organization?.id) {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(
            () => resolve("No tienes una organización asignada"),
            1500
          );
        }),
        {
          loading: "Verificando...",
          success: {
            message: "No tienes una organización asignada.",
            description: "Por favor, crea una organización",
            icon: null,
          },
          error: "No tienes una organización asignada",
        }
      );
      setTimeout(() => navigate("/registro-entidad"), 1200);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-black to-slate-800 relative overflow-hidden justify-center items-center h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12"></div>
        <Toaster className="z-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent transform skew-x-12"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2, bounce: 1 }}
        className="container mx-auto px-4 py-16 relative z-10"
      >
        {/* Main Card */}
        <div className="flex justify-center items-center min-w-max">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-slate-900/80 border border-zinc-700/50 hover:border-zinc-600/70 transition-all duration-500 w-full max-w-2xl backdrop-blur-xl shadow-2xl hover:shadow-lg hover:shadow-sky-500/10 group">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-white mb-3">
                Registro de Entidad
              </CardTitle>
              <CardDescription className="text-lg text-zinc-300 max-w-md mx-auto">
                Complete el proceso de registro en 4 simples pasos y obtenga su
                certificación oficial
              </CardDescription>
            </CardHeader>

            <CardContent
              className="space-y-6 px-8 pb-8 
            "
            >
              {/* Primary Action */}
              <Link to="/registro-entidad" className="block">
                <Button
                  size="lg"
                  className="w-full h-14 bg-gradient-to-r from-black-600 to-purple-950  hover:to- text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                >
                  <span className="flex items-center gap-3">
                    Comenzar Registro
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </Button>
              </Link>

              {/* Secondary Action */}

              <Button
                size="lg"
                className="w-full h-14 bg-transparent border-2 border-zinc-600 hover:border-zinc-500 text-white hover:bg-white/5 font-semibold text-lg transition-all duration-300"
                onClick={() => redirectToRegisterEntity()}
              >
                Ya tengo una cuenta - Ingresar
              </Button>

              {/* Help Text */}
              <div className="text-center pt-4">
                <p className="text-sm text-zinc-400">
                  ¿Necesita ayuda?{" "}
                  <Link
                    to="/ayuda"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                  >
                    Consulte nuestra guía
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-zinc-300">100% Seguro</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-zinc-300">Proceso Rápido</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-zinc-300">Guía Paso a Paso</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
