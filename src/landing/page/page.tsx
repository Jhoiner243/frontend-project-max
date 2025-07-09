"use client";

import {
  ArrowRight,
  BarChart3,
  Bell,
  Brain,
  Check,
  Lightbulb,
  Menu,
  Package,
  Play,
  Receipt,
  Shield,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

function FillstepLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      title: "Gestión Inteligente de Ventas",
      description:
        "Optimiza todo tu proceso de ventas con automatización inteligente e insights en tiempo real.",
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      title: "Facturación Automatizada",
      description:
        "Genera, envía y rastrea facturas profesionales con recordatorios automáticos de pago.",
      icon: <Receipt className="w-8 h-8" />,
    },
    {
      title: "Inventario Inteligente",
      description:
        "Gestión inteligente de productos y categorías con alertas predictivas de stock y análisis.",
      icon: <Package className="w-8 h-8" />,
    },
    {
      title: "Asistente de IA para Datos",
      description:
        "Haz preguntas sobre tus datos empresariales en lenguaje natural y obtén insights instantáneos.",
      icon: <Brain className="w-8 h-8" />,
    },
    {
      title: "Notificaciones Inteligentes",
      description:
        "Mantente informado con alertas inteligentes sobre niveles de stock, tendencias de ventas y oportunidades.",
      icon: <Bell className="w-8 h-8" />,
    },
    {
      title: "Analíticas Avanzadas",
      description:
        "Visualiza el rendimiento de tu negocio con dashboards interactivos y reportes detallados.",
      icon: <BarChart3 className="w-8 h-8" />,
    },
  ];

  const values = [
    {
      title: "Innovación Primero",
      description:
        "Aprovechamos tecnología de vanguardia para resolver desafíos empresariales reales con soluciones elegantes.",
      icon: <Lightbulb className="w-10 h-10" />,
    },
    {
      title: "Orientados a Resultados",
      description:
        "Cada funcionalidad está diseñada para generar un impacto medible en el crecimiento y eficiencia de tu negocio.",
      icon: <Target className="w-10 h-10" />,
    },
    {
      title: "Nivel Empresarial",
      description:
        "Construido con la seguridad, escalabilidad y confiabilidad que las empresas demandan.",
      icon: <Shield className="w-10 h-10" />,
    },
  ];

  const plans = [
    {
      name: "Inicial",
      price: "Gratis",
      period: "para siempre",
      description:
        "Perfecto para emprendedores y equipos pequeños que comienzan",
      features: [
        "Hasta 100 productos",
        "50 facturas por mes",
        "Dashboard de análisis básico",
        "Soporte por email",
        "1 miembro del equipo",
        "Acceso a app móvil",
      ],
      cta: "Comenzar Gratis",
      popular: false,
    },
    {
      name: "Profesional",
      price: "$49",
      period: "/mes",
      description:
        "Ideal para negocios en crecimiento listos para escalar operaciones",
      features: [
        "Productos y facturas ilimitados",
        "Asistente conversacional de IA",
        "Análisis y reportes avanzados",
        "Notificaciones inteligentes",
        "Hasta 10 miembros del equipo",
        "Soporte prioritario",
        "Acceso a API",
        "Integraciones personalizadas",
      ],
      cta: "Prueba de 30 Días",
      popular: true,
    },
    {
      name: "Empresarial",
      price: "Personalizado",
      period: "",
      description: "Para organizaciones grandes con requisitos específicos",
      features: [
        "Todo en Profesional",
        "Miembros de equipo ilimitados",
        "Entrenamiento personalizado de IA",
        "Gerente de cuenta dedicado",
        "Soporte telefónico 24/7",
        "Garantías SLA",
        "Implementación on-premise",
        "Desarrollo personalizado",
      ],
      cta: "Contactar Ventas",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">F</span>
              </div>
              <div>
                <div className="text-2xl font-bold">Fillstep</div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  Software Empresarial
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              <a
                href="#soluciones"
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                Soluciones
              </a>
              <a
                href="#plataforma"
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                Plataforma
              </a>
              <a
                href="#precios"
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                Precios
              </a>
              <a
                href="#recursos"
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                Recursos
              </a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/login"
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                Iniciar Sesión
              </Link>
              <Link to="/home-entitys">
                <Button className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300 py-3 rounded-full font-medium">
                  Prueba Gratuita
                </Button>
              </Link>
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
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-white/10 animate-in slide-in-from-top duration-200">
            <div className="px-6 py-8 space-y-6">
              <a
                href="#soluciones"
                className="block text-lg text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Soluciones
              </a>
              <a
                href="#plataforma"
                className="block text-lg text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Plataforma
              </a>
              <a
                href="#precios"
                className="block text-lg text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Precios
              </a>
              <a
                href="#recursos"
                className="block text-lg text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recursos
              </a>
              <div className="pt-6 border-t border-white/10 space-y-4">
                <Link to="/login" className="block text-lg text-white/80">
                  Iniciar Sesión
                </Link>
                <Link to="/register-entity">
                  <Button className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300 py-3 rounded-full font-medium">
                    Prueba Gratuita
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto animate-in fade-in duration-1000">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-12">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm text-white/80">
                Lanzando Nuestra Plataforma Revolucionaria
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold mb-8 leading-none">
              <span className="block">Inteligencia</span>
              <span className="block text-white/40">Empresarial</span>
            </h1>

            <p className="text-xl lg:text-2xl text-white/60 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transforma las operaciones de tu negocio con gestión de ventas
              potenciada por IA, facturación automatizada y análisis
              inteligentes.
            </p>

            <p className="text-lg text-white/40 mb-16 max-w-2xl mx-auto">
              La plataforma SaaS integral que escala con tu negocio, desde
              startup hasta empresa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
              <button className="bg-white text-black hover:bg-white/90 transition-all duration-300 px-8 py-4 rounded-full text-lg font-medium group flex items-center">
                Comenzar Prueba Gratuita
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-white border border-white/20 hover:bg-white/5 transition-all duration-300 px-8 py-4 rounded-full text-lg font-medium group flex items-center">
                <Play className="mr-2 w-5 h-5" />
                Ver Demostración
              </button>
            </div>

            <div className="flex items-center justify-center space-x-12 text-sm text-white/40">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <span>30 días gratis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <span>Configuración en minutos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-3xl"></div>
            <div className="relative border border-white/10 rounded-3xl overflow-hidden">
              <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                <div className="text-white/40 text-lg">Dashboard Preview</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-white/40 uppercase tracking-wider mb-12">
              Confiado por empresas innovadoras en todo el mundo
            </p>
            <div className="flex items-center justify-center space-x-16 lg:space-x-24 opacity-30">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="text-white/60 text-lg font-medium">
                  Empresa {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section id="plataforma" className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="inline-block text-sm text-white/40 uppercase tracking-wider mb-8">
              Nuestra Base
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              Construido para el Futuro
              <br />
              <span className="text-white/40">de los Negocios</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              No solo estamos construyendo software—estamos creando la base para
              las operaciones empresariales de próxima generación.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24 mb-32">
            {values.map((value, i) => (
              <div
                key={i}
                className="text-center group animate-in fade-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="mb-8 flex justify-center text-white/80 group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6">{value.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center border border-white/10 rounded-3xl p-16 lg:p-24 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <h3 className="text-3xl lg:text-4xl font-bold mb-8">
              Nuestra Misión
            </h3>
            <p className="text-xl text-white/60 max-w-4xl mx-auto leading-relaxed">
              Democratizar la tecnología de nivel empresarial y empoderar a
              empresas de todos los tamaños para competir en igualdad de
              condiciones. Creemos que las herramientas poderosas deben ser
              accesibles, intuitivas y transformadoras.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="soluciones" className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="inline-block text-sm text-white/40 uppercase tracking-wider mb-8">
              Capacidades de la Plataforma
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              Todo lo que tu Negocio
              <br />
              <span className="text-white/40">Necesita</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Un conjunto integral de herramientas diseñadas para optimizar
              operaciones, impulsar productividad y acelerar el crecimiento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-32">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group animate-in fade-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="mb-8 text-white/60 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 group-hover:text-white/90 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* AI Showcase */}
          <div className="border border-white/10 rounded-3xl p-12 lg:p-16 animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 text-sm text-white/60 mb-8">
                  <Brain className="w-4 h-4" />
                  <span>Inteligencia Potenciada por IA</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-8">
                  Tus Datos Empresariales,
                  <br />
                  <span className="text-white/40">Conversacionales</span>
                </h3>
                <p className="text-xl text-white/60 mb-12 leading-relaxed">
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
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-1 h-1 bg-white/40 rounded-full mt-3"></div>
                      <span className="text-white/60 italic">"{question}"</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-white/10 rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Asistente IA</div>
                    <div className="text-sm text-white/60">
                      Siempre listo para ayudar
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-white/80">
                      "Muéstrame mis productos más vendidos este mes"
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="font-medium mb-4">
                      Aquí están tus 3 productos principales:
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">
                          Laptop Premium Pro
                        </span>
                        <span className="text-white">+24% ventas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">
                          Audífonos Inalámbricos
                        </span>
                        <span className="text-white">+18% ventas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Serie Smart Watch</span>
                        <span className="text-white">+15% ventas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precios" className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="inline-block text-sm text-white/40 uppercase tracking-wider mb-8">
              Precios Transparentes
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              Escala a tu Propio
              <br />
              <span className="text-white/40">Ritmo</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Comienza gratis y crece con confianza. Sin tarifas ocultas, sin
              compromisos a largo plazo.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 lg:p-12 ${
                  plan.popular
                    ? "border-2 border-white bg-white/5"
                    : "border border-white/10 hover:border-white/20"
                } rounded-3xl transition-all duration-300 group animate-in fade-in slide-in-from-bottom`}
                style={{
                  animationDelay: `${i * 200}ms`,
                  animationDuration: "1000ms",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium">
                      Más Popular
                    </div>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl lg:text-5xl font-bold">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-white/60 ml-2">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-white/60">{plan.description}</p>
                </div>
                <div className="space-y-4 mb-12">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`w-full py-4 rounded-full font-medium transition-all duration-300 ${
                    plan.popular
                      ? "bg-black text-white hover:bg-black/80"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center border border-white/10 rounded-3xl p-16 lg:p-24 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              ¿Listo para Transformar
              <br />
              <span className="text-white/40">tu Negocio?</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
              Únete a miles de empresas visionarias que ya han revolucionado sus
              operaciones con Fillstep. Comienza tu viaje hacia la gestión
              empresarial inteligente hoy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <button className="bg-white text-black hover:bg-white/90 transition-all duration-300 px-8 py-4 rounded-full text-lg font-medium group flex items-center">
                Comenzar Prueba Gratuita
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-white border border-white/20 hover:bg-white/5 transition-all duration-300 px-8 py-4 rounded-full text-lg font-medium">
                Agendar Demostración
              </button>
            </div>
            <div className="flex items-center justify-center space-x-12 text-sm text-white/40">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Configuración en 5 minutos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Seguridad empresarial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="recursos" className="border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">F</span>
                </div>
                <div>
                  <div className="text-2xl font-bold">Fillstep</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">
                    Software Empresarial
                  </div>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed">
                Empoderando empresas con soluciones de software inteligentes que
                impulsan crecimiento, eficiencia e innovación.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Plataforma</h4>
              <div className="space-y-3">
                <a
                  href="#soluciones"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Características
                </a>
                <a
                  href="#precios"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Precios
                </a>
                <a
                  href="#"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Integraciones
                </a>
                <a
                  href="#"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Documentación API
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Empresa</h4>
              <div className="space-y-3">
                <a
                  href="#plataforma"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Acerca de Nosotros
                </a>
                <a
                  href="#"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Carreras
                </a>
                <a
                  href="#"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Kit de Prensa
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Soporte</h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Centro de Ayuda
                </a>
                <a
                  href="#"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Documentación
                </a>
                <a
                  href="#"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Comunidad
                </a>
                <a
                  href="#"
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  Contáctanos
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 space-y-4 md:space-y-0">
            <p className="text-white/40">
              &copy; {new Date().getFullYear()} Fillstep Software Empresarial.
              Todos los derechos reservados.
            </p>
            <div className="flex space-x-8">
              <a
                href="#"
                className="text-white/40 hover:text-white/60 transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-white/40 hover:text-white/60 transition-colors"
              >
                Términos de Servicio
              </a>
              <a
                href="#"
                className="text-white/40 hover:text-white/60 transition-colors"
              >
                Seguridad
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FillstepLanding;
