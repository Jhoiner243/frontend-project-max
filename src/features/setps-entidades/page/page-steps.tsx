import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle,
  Clock,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12"></div>
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
        <Button
          onClick={() => navigate("/")}
          className="flex  absolute ml-[5%] mt-20  bg-transparent cursor-default  rounded-full p-2 font-medium hover:bg-black/50   "
        >
          <ArrowLeft className="m-1 w-5 h-5 " />
          Back
        </Button>
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className=" inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-8 backdrop-blur-sm border border-white/10">
            <Building2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 leading-tight">
            Sistema de Registro
            <br />
            <span className="text-4xl md:text-3xl">de Entidades</span>
          </h1>

          {/* Feature Pills */}
        </div>

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
              <Link to="/login" className="block">
                <Button
                  size="lg"
                  className="w-full h-14 bg-transparent border-2 border-zinc-600 hover:border-zinc-500 text-white hover:bg-white/5 font-semibold text-lg transition-all duration-300"
                >
                  Ya tengo una cuenta - Ingresar
                </Button>
              </Link>

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
        <div className="flex flex-wrap justify-center gap-4 mb-12 mt-10">
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
