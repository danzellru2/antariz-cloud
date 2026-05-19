import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Cloud, Database,
  Shield, Server, Cpu, Code2, Sparkles,
  Mail, MessageCircle, Smartphone
} from "lucide-react";

// Logos
import logoHorizontal from "./logo/logo_horizontal.png";
import iconoOutline from "./logo/icono_outline.png";

const GithubIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.3 6-1.5 6-6.76a5.2 5.2 0 0 0-1.3-3.5 5 5 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C6.3 1.1 5.2 1.4 5.2 1.4a5 5 0 0 0-.1 3.4 5.2 5.2 0 0 0-1.3 3.5c0 5.2 3 6.4 6 6.76a4.8 4.8 0 0 0-1 3.24v4" /><path d="M5 19c-3 1-3-2-3-2" /></svg>
);

const LinkedinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);

const TwitterIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);

export default function PortfolioEmpresa3D() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State for Resend
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Error enviando con Resend:', await res.json());
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth, standard animations for entry
  // Scroll parallax hooks removed for high performance and buttery smooth native scroll

  return (
    <div ref={containerRef} className="min-h-[350vh] w-full overflow-x-hidden relative text-white selection:bg-white selection:text-black font-sans bg-[#020202]">

      {/* Top Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          backgroundColor: isScrolled ? "rgba(2, 2, 2, 0.45)" : "rgba(0, 0, 0, 0)",
          backdropFilter: isScrolled ? "blur(30px)" : "blur(0px)",
          borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0)",
          paddingTop: isScrolled ? "1rem" : "1.75rem",
          paddingBottom: isScrolled ? "1rem" : "1.75rem",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center transition-all duration-300"
      >
        <img src={logoHorizontal} alt="Antariz Cloud" className="h-8 md:h-9 object-contain opacity-95 transition-all duration-300" />
        
        {/* Menu Links for Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#arquitectura" className="group relative text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors duration-300">
            <span>Arquitectura</span>
            <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#obras" className="group relative text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors duration-300">
            <span>Obras Maestras</span>
            <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
          </a>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Button
              onClick={() => setIsContactOpen(true)}
              className="rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium px-6 py-5 text-sm transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.02)]"
            >
              Iniciar Proyecto
            </Button>
          </motion.div>
        </div>

        {/* Contact Button for Mobile */}
        <motion.div
          className="md:hidden"
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsContactOpen(true)}
            className="rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 text-white text-xs px-4 py-2 cursor-pointer"
          >
            Contacto
          </Button>
        </motion.div>
      </motion.nav>

      {/* Contact Modal (Pill Dock) */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto py-6"
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8 p-4 md:p-6 bg-black/30 backdrop-blur-[40px] border border-white/20 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_0_80px_rgba(255,255,255,0.1)]"
            >
              <ContactIcon
                Icon={Mail}
                label="Email"
                onClick={() => {
                  setIsContactOpen(false);
                  setIsFormOpen(true);
                }}
              />
              <ContactIcon Icon={MessageCircle} label="WhatsApp" href="#" />
              <ContactIcon Icon={LinkedinIcon} label="LinkedIn" href="#" />
              <ContactIcon Icon={GithubIcon} label="GitHub" href="#" />
              <ContactIcon Icon={TwitterIcon} label="Twitter" href="#" />
              <ContactIcon Icon={InstagramIcon} label="Instagram" href="#" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] overflow-y-auto flex flex-col items-center justify-start md:justify-center bg-black/60 backdrop-blur-sm px-4 py-8 md:py-12 gap-4 sm:gap-6"
            onClick={() => setIsFormOpen(false)}
          >
            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-5 sm:p-8 md:p-10 bg-black/30 backdrop-blur-[40px] border border-white/20 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_0_80px_rgba(255,255,255,0.1)] relative"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-zinc-500 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="mb-5 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1 sm:mb-2">Conecta con Nosotros</h3>
                <p className="text-zinc-400 font-light text-xs sm:text-sm md:text-base leading-relaxed">Inicia tu evolución en la nube. Déjanos un mensaje y nuestro equipo se contactará contigo a la brevedad.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 sm:gap-5">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 sm:mb-2">Nombre completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 sm:py-3.5 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-light text-sm sm:text-base"
                    placeholder="Ej. Elon Musk"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 sm:mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 sm:py-3.5 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-light text-sm sm:text-base"
                    placeholder="contacto@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 sm:mb-2">Proyecto o Mensaje</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 sm:py-3.5 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-light resize-none text-sm sm:text-base"
                    placeholder="¿Cómo podemos potenciar tu infraestructura?"
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center">
                    ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                    Hubo un error al enviar el mensaje. Revisa la consola o inténtalo más tarde.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-base sm:text-lg py-4 sm:py-6 rounded-xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </motion.div>

            {/* Pill Dock Container (Separated) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8 p-3 sm:p-4 md:p-6 bg-black/30 backdrop-blur-[40px] border border-white/20 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_0_80px_rgba(255,255,255,0.1)]"
            >
              <ContactIcon Icon={MessageCircle} label="WhatsApp" href="#" />
              <ContactIcon Icon={LinkedinIcon} label="LinkedIn" href="#" />
              <ContactIcon Icon={GithubIcon} label="GitHub" href="#" />
              <ContactIcon Icon={TwitterIcon} label="Twitter" href="#" />
              <ContactIcon Icon={InstagramIcon} label="Instagram" href="#" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Optimized Background (Pure Grays/Blacks - 100% Static Blur to avoid continuous GPU redraws) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-white opacity-[0.04] blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] rounded-full bg-zinc-400 opacity-[0.03] blur-[100px] md:blur-[150px]" />
        <div className="absolute top-[30%] left-[40%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-zinc-300 opacity-[0.02] blur-[120px] md:blur-[180px]" />
        {/* Static grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-4 overflow-visible">
        {/* Spline Background */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center"
        >
          {/* Fading the iframe smoothly using a CSS mask so it NEVER creates a hard line */}
          <div className="w-full h-full relative [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]">
            {!isMobile && (
              <iframe
                src="https://my.spline.design/untitled-robotscene"
                frameBorder="0"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                title="3D Hero"
              />
            )}
            {/* Soft vignette that fades to transparent, NOT black */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-full max-w-7xl mx-auto text-center mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles size={14} className="text-zinc-500" />
            <span className="text-xs md:text-sm font-semibold tracking-[0.3em] text-zinc-400 uppercase text-center">
              Next-Gen Cloud Solutions
            </span>
            <Sparkles size={14} className="text-zinc-500 hidden sm:block" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-800 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            ANTARIZ
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="block italic font-light tracking-tight text-zinc-500/50 mt-2 md:mt-0"
            >
              CLOUD
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-8 md:mt-16 text-base md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light px-4"
          >
            Sistemas que trascienden el límite de lo posible.
            Elegancia en código, poder en la nube.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 md:mt-14"
          >
            <Button
              onClick={() => setIsContactOpen(true)}
              className="rounded-none relative group overflow-hidden bg-white/5 backdrop-blur-xl border border-white/20 text-white px-8 py-6 md:px-12 md:py-8 text-base md:text-lg font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Conocer la infraestructura <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 md:py-24 px-4 z-20 border-y border-white/5 bg-black/25 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "30+", label: "Sistemas Desplegados" },
            { value: "20+", label: "Clientes Satisfechos" },
            { value: "30+", label: "Usuarios Activos" },
            { value: "99.99%", label: "Uptime en Cloud" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center p-4 md:p-6 group relative"
            >
              <h3 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2 group-hover:scale-105 transition-transform duration-500 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm font-mono tracking-widest text-zinc-500 uppercase">
                {stat.label}
              </p>
              {/* Subtle accent light */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Systems Section */}
      <section id="arquitectura" className="relative py-24 md:py-32 px-4 md:px-8 z-20 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-32 text-center md:text-left">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4">Arquitectura.</h2>
            <p className="text-lg md:text-2xl text-zinc-500 font-light max-w-2xl mx-auto md:mx-0">
              Desarrollamos con el stack tecnológico más avanzado del mercado. Sistemas construidos para escalar y perdurar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code2, title: "Frontend Engineering", desc: "Interfaces reactivas de renderizado ultra-rápido y arquitecturas composables.", tags: ["React", "Next.js", "Vue", "TailwindCSS"] },
              { icon: Server, title: "Backend Systems", desc: "APIs robustas, microservicios y procesamiento paralelo de alta concurrencia.", tags: ["Node.js", "Python", "Go", "Java"] },
              { icon: Cloud, title: "Cloud Native", desc: "Despliegues elásticos en entornos serverless y contenedores orquestados.", tags: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
              { icon: Database, title: "Data Engineering", desc: "Bases de datos distribuidas y lagos de datos para análisis en tiempo real.", tags: ["PostgreSQL", "MongoDB", "Redis", "GraphQL"] },
              { icon: Smartphone, title: "Mobile Apps", desc: "Aplicaciones nativas e híbridas para ecosistemas iOS y Android.", tags: ["React Native", "Flutter", "Swift"] },
              { icon: Shield, title: "Cyber Defense", desc: "Protocolos de seguridad criptográfica y arquitecturas Zero Trust.", tags: ["OAuth2", "JWT", "WAF", "IAM"] },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: isMobile ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full"
              >
                <div className="h-full relative flex flex-col justify-between bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-6 md:p-8 overflow-hidden hover:border-white/20 transition-colors duration-300">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    <item.icon className="text-zinc-600 group-hover:text-white transition-colors duration-300 mb-6 md:mb-8" size={32} strokeWidth={1} />
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-zinc-200 group-hover:text-white">{item.title}</h3>
                    <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-light group-hover:text-zinc-400 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 md:px-3 py-1 bg-white/[0.03] border border-white/10 text-[10px] md:text-xs font-mono text-zinc-400 rounded-md group-hover:border-white/20 group-hover:text-zinc-300 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0 transform hidden md:block">
                    <ArrowRight className="text-white/30" size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Parallax Section */}
      <section id="obras" className="relative py-24 md:py-48 px-4 md:px-8 overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase">Obras</h2>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-light italic text-zinc-600 uppercase">Maestras</h2>
            </div>
            <p className="text-base md:text-xl text-zinc-500 max-w-sm text-left md:text-right font-light">
              Donde la obsidiana se encuentra con el cristal. Soluciones construidas para liderar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Column 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8 md:gap-16"
            >
              <ProjectCard
                title="WorkHR System"
                category="HR Platform"
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                desc="Plataforma empresarial de recursos humanos con analíticas en tiempo real y gestión de nóminas."
                href="https://www.workhr.site/"
              />
              <ProjectCard
                title="Flowi Workspace"
                category="SaaS / Productivity"
                image="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop"
                desc="Entorno de trabajo inteligente para equipos de alto rendimiento, optimizado por IA."
                href="https://www.flowi.site/"
              />
              <ProjectCard
                title="Apex Dashboard"
                category="Business Metrics"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                desc="Panel de administración sencillo para la visualización de ventas, inventarios y métricas mensuales de comercios locales."
              />
            </motion.div>

            {/* Column 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="flex flex-col gap-8 md:gap-16 md:mt-32"
            >
              <ProjectCard
                title="Grupo Empresarial Portal"
                category="Corporate Web Platform"
                image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop"
                desc="Portal corporativo interactivo de alto rendimiento para división de real estate y legal."
              />
              <ProjectCard
                title="Casita System"
                category="Inventory & POS"
                image="https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2940&auto=format&fit=crop"
                desc="Sistema integral de control de inventario, roles de usuario y registro de movimientos financieros."
              />
              <ProjectCard
                title="Vesta Inmobiliaria"
                category="Real Estate Web"
                image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2746&auto=format&fit=crop"
                desc="Sitio web con catálogo interactivo de propiedades de la zona y formulario integrado para agendar visitas directamente."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative py-24 md:py-32 px-4 md:px-8 z-20 border-t border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 text-center md:text-left">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4">Nuestra Tecnología.</h2>
            <p className="text-lg md:text-2xl text-zinc-500 font-light max-w-2xl mx-auto md:mx-0">
              Implementamos herramientas robustas y lenguajes modernos para garantizar un rendimiento implacable.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React / Next.js", desc: "Estructuras web reactivas e híbridas", level: "Avanzado" },
              { name: "Node.js / Go", desc: "APIs veloces de alta concurrencia", level: "Avanzado" },
              { name: "AWS Cloud", desc: "Infraestructura elástica y serverless", level: "Experto" },
              { name: "PostgreSQL / Redis", desc: "Persistencia escalable e instantánea", level: "Experto" },
              { name: "Docker / K8s", desc: "Contenedores y orquestación ágil", level: "Avanzado" },
              { name: "TailwindCSS", desc: "Diseño modular de alta fidelidad", level: "Experto" },
              { name: "TypeScript", desc: "Tipado estricto para código seguro", level: "Avanzado" },
              { name: "CI / CD", desc: "Despliegues automatizados sin fricción", level: "Experto" }
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 bg-[#0a0a0a]/60 backdrop-blur-md border border-white/5 rounded-2xl hover:border-white/20 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-[10px] font-mono tracking-wider text-zinc-600 uppercase block mb-2">{tech.level}</span>
                <h4 className="text-lg md:text-xl font-bold text-zinc-200 group-hover:text-white mb-2 transition-colors">{tech.name}</h4>
                <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{tech.desc}</p>
                
                {/* Micro glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.01)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 md:py-40 px-4 text-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl mx-auto"
        >

          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight mb-8">
            INICIA LA <br />
            <span className="italic font-light text-zinc-500">EVOLUCIÓN</span>
          </h2>

          <div className="mt-12 md:mt-16 px-4">
            <Button
              onClick={() => setIsFormOpen(true)}
              className="rounded-none bg-white/5 backdrop-blur-xl border border-white/20 text-white px-8 py-6 md:px-16 md:py-10 text-lg md:text-xl font-bold hover:bg-white/10 hover:border-white/40 transition-all duration-300 w-full sm:w-auto"
            >
              Contactar a Antariz
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// Subcomponent for Contact Icons inside the Modal
function ContactIcon({ Icon, label, href, onClick }) {
  const Component = onClick ? motion.button : motion.a;
  return (
    <Component
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      whileHover={{ scale: 1.15, y: -8 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
    >
      <Icon className="text-zinc-400 group-hover:text-white transition-colors" size={24} />
      {/* Tooltip */}
      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none z-50">
        <span className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white text-xs font-medium rounded-md shadow-2xl whitespace-nowrap block">
          {label}
        </span>
      </div>
    </Component>
  );
}

// Subcomponent for Obsidian Project Cards
function ProjectCard({ title, category, image, desc, href }) {
  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-pointer"
    >
      <a href={href} target="_blank" rel="noreferrer" className="block relative overflow-hidden aspect-[4/5] sm:aspect-square md:aspect-[4/5] bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-4 md:p-6 flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />

        <div className="relative overflow-hidden w-full h-[65%] border border-white/5 z-10">
          <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-20" />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-105 group-hover:scale-100"
          />
          <div className="absolute top-3 left-3 md:top-4 md:left-4 z-30">
            <span className="px-2 py-1 md:px-3 md:py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[10px] md:text-xs font-mono tracking-widest text-white uppercase">
              {category}
            </span>
          </div>
        </div>

        <div className="mt-4 md:mt-6 z-10">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-zinc-200 group-hover:text-white transition-colors">{title}</h3>
          <p className="text-zinc-500 font-light text-sm md:text-lg line-clamp-3 md:line-clamp-none">{desc}</p>
        </div>
      </a>
    </motion.div>
  );
}
