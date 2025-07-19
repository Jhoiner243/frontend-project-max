"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Brain,
  ExternalLink,
  Globe,
  Grip,
  Menu,
  Package,
  Receipt,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Spotlight } from "../../features/ai/components/spotligth";
import { SpotlightPreview } from "../components/spooligth-title";

export default function FillstepLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const features = [
    {
      title: "Gestión Inteligente de Ventas",
      description:
        "Optimiza todo tu proceso de ventas con automatización inteligente e insights en tiempo real.",
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: "bg-black",
      stats: "↗ 45% más ventas",
    },
    {
      title: "Facturación Automatizada",
      description:
        "Genera, envía y rastrea facturas profesionales con recordatorios automáticos de pago.",
      icon: <Receipt className="w-8 h-8" />,
      gradient: "bg-black",
      stats: "⚡ 80% menos tiempo",
    },
    {
      title: "Inventario Inteligente",
      description:
        "Gestión inteligente de productos y categorías con alertas predictivas de stock y análisis.",
      icon: <Package className="w-8 h-8" />,
      gradient: "bg-black",
      stats: "📦 99% precisión",
    },
    {
      title: "Asistente de IA para Datos",
      description:
        "Haz preguntas sobre tus datos empresariales en lenguaje natural y obtén insights instantáneos.",
      icon: <Brain className="w-8 h-8" />,
      gradient: "bg-black",
      stats: "🧠 IA Avanzada",
    },
    {
      title: "Notificaciones Inteligentes",
      description:
        "Mantente informado con alertas inteligentes sobre niveles de stock, tendencias de ventas y oportunidades.",
      icon: <Bell className="w-8 h-8" />,
      gradient: "bg-black",
      stats: "🔔 Tiempo real",
    },
    {
      title: "Analíticas Avanzadas",
      description:
        "Visualiza el rendimiento de tu negocio con dashboards interactivos y reportes detallados.",
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: "from-black to ",
      stats: "📊 Insights profundos",
    },
  ];

  const projects = [
    {
      id: 1,
      name: "FillStep CRM",
      description: "Plataforma completa para gestión de ventas y CRM",
      status: "Beta",
      category: "Ventas",
      growth: "+24%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-black",

      url: "/login",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleProjectStart = (project: string) => {
    window.open(project, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Background Effects */}
      <Spotlight
        width={1000}
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)"
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full z-50  backdrop-blur-xl "
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-black font-bold text-xl">F</span>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  FillStep
                </div>
              </div>
            </motion.div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-6">
              <Button
                className="bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-white transition-all duration-300 py-3 px-6 rounded-2xl font-medium shadow-2xl hover:shadow-white/20 hover:scale-105"
                onClick={() => setIsOpen(true)}
              >
                Ver Proyectos
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-6 py-8 space-y-6">
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-white transition-all duration-300 py-3 rounded-2xl font-medium">
                        Ver Proyectos
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/20 rounded-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          Nuestros Proyectos
                        </DialogTitle>
                        <DialogDescription className="text-white/60 text-sm">
                          Explora nuestras soluciones empresariales
                        </DialogDescription>
                      </DialogHeader>

                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-4 mt-6"
                      >
                        {projects.map((project) => (
                          <motion.div key={project.id} variants={itemVariants}>
                            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                  <div
                                    className={`w-12 h-12 ${project.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                                  >
                                    {project.icon}
                                  </div>
                                  <Badge
                                    variant={
                                      project.status === "Activo"
                                        ? "default"
                                        : project.status === "Beta"
                                        ? "secondary"
                                        : "outline"
                                    }
                                    className="text-xs"
                                  >
                                    {project.status}
                                  </Badge>
                                </div>
                                <CardTitle className="text-white text-base">
                                  {project.name}
                                </CardTitle>
                                <CardDescription className="text-white/60 text-sm">
                                  {project.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleProjectStart(project.url)
                                  }
                                  className="w-full bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-white transition-all duration-300 rounded-xl"
                                >
                                  <span>Iniciar Proyecto</span>
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </Button>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex justify-center items-center overflow-hidden">
        {/* Hero Background Effects */}

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            ></motion.div>

            <SpotlightPreview />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-12 font-light"
            >
              Transformando la forma en que las empresas{" "}
              <span className=" from-white to-gray-500  ">
                gestionan sus operaciones
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20"
            >
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-white to-white/80 text-black hover:from-gray-100 hover:to-white px-5 py-2 rounded-full text-lg font-semibold group flex items-center shadow-2xl hover:shadow-white/40 hover:duration-300"
                  >
                    <Grip className="mr-3 w-6 h-6 " />
                    Nuestras apps
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="min-h-[80%] md:min-h-[10vh] overflow-y-auto   bg-black/95 backdrop-blur-xl border border-white/20 ">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className=" lg:grid-cols-3 gap-8 mt-8 "
                  >
                    {projects.map((project) => (
                      <motion.div key={project.id} variants={itemVariants}>
                        <Card className="bg-white/5 backdrop-blur-xl border-white/4  hover:border-white/30 transition-all duration-100 group h-full  relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 "></div>
                          <CardHeader className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                              <div
                                className={`w-16 h-16 ${project.color} rounded-3xl flex items-center justify-center text-white shadow-2xl bg-gradient-to-br from-white/5 `}
                              >
                                {project.icon}
                              </div>
                              <CardTitle className=" text-white text-2xl font-bold text-left">
                                {project.name}
                              </CardTitle>
                              <div className="flex flex-col items-end space-y-2">
                                <Badge
                                  variant={
                                    project.status === "Activo"
                                      ? "default"
                                      : project.status === "Beta"
                                      ? "secondary"
                                      : "outline"
                                  }
                                  className="text-xs font-medium"
                                >
                                  {project.status}
                                </Badge>
                              </div>
                            </div>

                            <CardDescription className="text-white/70 leading-relaxed text-base">
                              {project.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6 relative z-10">
                            <div className="flex items-center justify-between mb-6">
                              <Badge
                                variant="outline"
                                className="text-sm border-white/20 text-white/60 px-3 py-1"
                              >
                                {project.category}
                              </Badge>
                            </div>
                            <Button
                              onClick={() => handleProjectStart(project.url)}
                              className="w-full bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-white/89 font-semibold rounded-2xl shadow-2xl py-3 text-base"
                            >
                              <span>Comenzar Ahora</span>
                              <Rocket className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="soluciones" className="py-32 lg:py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 mb-8">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white/90">
                Características Principales
              </span>
            </div>

            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Descubre las herramientas que transformarán la manera en que
              gestionas tu empresa
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-32"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 h-full relative overflow-hidden">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>

                    <div className="mb-4">
                      <Badge
                        variant="outline"
                        className="text-xs border-white/20 text-white/60 mb-4"
                      >
                        {feature.stats}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-white/90 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                      {feature.description}
                    </p>

                    <div className="mt-6 flex items-center text-white/40 group-hover:text-white/60 transition-colors duration-300">
                      <span className="text-sm font-medium">Explorar</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* AI Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 lg:p-16 relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                <div>
                  <h3 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Tus Datos Empresariales,
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Conversacionales
                    </span>
                  </h3>

                  <p className="text-xl text-white/70 mb-12 leading-relaxed">
                    Haz preguntas complejas sobre tu negocio en español simple.
                    Nuestra IA entiende el contexto, analiza patrones y entrega
                    insights accionables al instante.
                  </p>

                  <div className="space-y-6">
                    {[
                      "¿Qué productos están en tendencia este trimestre?",
                      "Muéstrame clientes en riesgo de abandono",
                      "¿Cuál es mi tasa de rotación de inventario?",
                      "Predice las ventas del próximo mes",
                    ].map((question, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                        <span className="text-white/70 italic font-medium">
                          "{question}"
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>

                    <div className="flex items-center space-x-4 mb-8 relative z-10">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <Brain className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-white">
                          Asistente IA
                        </div>
                        <div className="text-sm text-white/60 font-medium">
                          Siempre listo para ayudar
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                        <p className="text-white/90 font-medium">
                          "Muéstrame mis productos más vendidos este mes"
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                        <p className="font-semibold mb-6 text-white">
                          Aquí están tus 3 productos principales:
                        </p>
                        <div className="space-y-4">
                          {[
                            {
                              name: "Laptop Premium Pro",
                              growth: "+24% ventas",
                              color: "from-green-400 to-emerald-400",
                            },
                            {
                              name: "Audífonos Inalámbricos",
                              growth: "+18% ventas",
                              color: "from-blue-400 to-cyan-400",
                            },
                            {
                              name: "Serie Smart Watch",
                              growth: "+15% ventas",
                              color: "from-purple-400 to-pink-400",
                            },
                          ].map((product, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center p-3 bg-white/5 rounded-xl"
                            >
                              <span className="text-white/70 font-medium">
                                {product.name}
                              </span>
                              <span
                                className={`bg-gradient-to-r ${product.color} bg-clip-text text-transparent font-bold`}
                              >
                                {product.growth}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {projects.map((project) => (
                <div className="flex justify-center items-center mt-12 relative z-10">
                  <Button
                    onClick={() => handleProjectStart(project.url)}
                    className="bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-white transition-all duration-300 px-10 py-4 rounded-2xl text-lg font-semibold group flex items-center shadow-2xl hover:shadow-white/20 hover:scale-105"
                  >
                    <Brain className="mr-3 w-6 h-6" />
                    Ingresar y Probar
                    <Sparkles className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="recursos"
        className="relative border-t border-white/10 py-20 overflow-hidden"
      >
        {/* Footer Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-12 mb-16"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-black font-bold text-xl">F</span>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Fillstep
                  </div>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-medium">
                    Software Empresarial
                  </div>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed">
                Empoderando empresas con soluciones de software inteligentes que
                impulsan crecimiento, eficiencia e innovación.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Globe className="w-5 h-5" />, label: "Web" },
                  { icon: <Activity className="w-5 h-5" />, label: "Status" },
                  { icon: <Shield className="w-5 h-5" />, label: "Security" },
                ].map((social, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  >
                    {social.icon}
                  </motion.div>
                ))}
              </div>
            </div>

            {[
              {
                title: "Plataforma",
                links: [
                  { name: "Características", href: "#soluciones" },
                  { name: "Precios", href: "#precios" },
                  { name: "Integraciones", href: "#" },
                  { name: "Documentación API", href: "#" },
                ],
              },
              {
                title: "Empresa",
                links: [
                  { name: "Acerca de Nosotros", href: "#plataforma" },
                  { name: "Carreras", href: "#" },
                  { name: "Blog", href: "#" },
                  { name: "Kit de Prensa", href: "#" },
                ],
              },
              {
                title: "Soporte",
                links: [
                  { name: "Centro de Ayuda", href: "#" },
                  { name: "Documentación", href: "#" },
                  { name: "Comunidad", href: "#" },
                  { name: "Contáctanos", href: "#" },
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-lg font-bold text-white">
                  {section.title}
                </h4>
                <div className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <a
                      key={linkIdx}
                      href={link.href}
                      className="block text-white/60 hover:text-white transition-colors duration-300 font-medium relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 space-y-4 md:space-y-0"
          >
            <p className="text-white/40 font-medium">
              &copy; {new Date().getFullYear()} Fillstep Software Empresarial.
              Todos los derechos reservados.
            </p>
            <div className="flex space-x-8">
              {[
                "Política de Privacidad",
                "Términos de Servicio",
                "Seguridad",
              ].map((link, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-white/40 hover:text-white/60 transition-colors duration-300 font-medium relative group"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
