"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  MessageSquare,
  Smartphone,
  Zap,
  ShieldCheck,
  Star,
  Plus,
  ArrowRight
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { TextReveal } from "@/components/ui/text-reveal";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  const testimonials = [
    { name: "Kemi Adeyemi", role: "Salon Owner, Lagos", content: "Kova changed how my clients see me. I used to send blurry photos of receipts; now they get a premium link. My referrals have doubled.", rating: 5, avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&auto=format&fit=crop" },
    { name: "Chidi Okafor", role: "Freelance Plumber, Abuja", content: "Getting paid is faster now. Clients see the professional invoice and pay immediately. No more 'I'll call you later' stories.", rating: 5, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&auto=format&fit=crop" },
    { name: "Ngozi Bello", role: "Home Caterer, Port Harcourt", content: "The WhatsApp bot is so simple. I finish a cake delivery, message the bot, and the invoice is sent. It saves me hours every week.", rating: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&auto=format&fit=crop" },
  ];

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "py-4 bg-white/80 backdrop-blur-xl border-b border-kova-navy/10" : "py-6 bg-transparent"
        )}>
          <motion.div
            className="flex items-center justify-between px-8 max-w-[1600px] mx-auto"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={cn(
                "w-10 h-10 relative rounded-xl p-1 shadow-lg group-hover:scale-110 transition-all",
                isScrolled ? "bg-kova-navy" : "bg-white"
              )}>
                <Image src="/Logo.png" alt="Kova" fill className={cn("object-contain p-1", isScrolled && "invert")} />
              </div>
              <span className={cn(
                "font-black text-2xl tracking-tighter transition-colors",
                isScrolled ? "text-kova-navy" : "text-white"
              )}>
                Kova
              </span>
            </Link>

            <div className={cn(
              "hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.25em] transition-colors",
              isScrolled ? "text-kova-navy/60" : "text-white/60"
            )}>
              <Link href="#features" className="hover:text-[#A855F7] transition-colors">Features</Link>
              <Link href="#process" className="hover:text-[#A855F7] transition-colors">Process</Link>
              <Link href="/about" className="hover:text-[#A855F7] transition-colors">About</Link>
              <Link href="#pricing" className="hover:text-[#A855F7] transition-colors">Pricing</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-8">
              <Link
                href="/login"
                className={cn(
                  "hidden sm:block text-[11px] font-black uppercase tracking-[0.2em] transition-colors",
                  isScrolled ? "text-kova-navy hover:text-kova-purple" : "text-white hover:text-[#A855F7]"
                )}
              >
                Client Login
              </Link>
              <Link href="/onboarding">
                <Button
                  className="hidden md:flex rounded-xl px-8 h-12 font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
                  style={{ backgroundColor: '#A855F7', color: '#FFFFFF' }}
                >
                  Join Kova
                </Button>
              </Link>
              {/* Mobile Menu Trigger */}
              <button className={cn(
                "lg:hidden text-[11px] font-black uppercase tracking-[0.2em]",
                isScrolled ? "text-kova-navy" : "text-[#A855F7]"
              )}>
                Menu
              </button>
            </div>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <section
          className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 pt-32 pb-32"
          style={{ backgroundColor: '#1A1060' }}
        >
          {/* Animated Mesh Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <motion.div
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -30, 30, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-30"
              style={{ backgroundColor: '#7F77DD' }}
            />
            <motion.div
              animate={{
                x: [0, -40, 40, 0],
                y: [0, 50, -50, 0],
                scale: [1, 0.9, 1.1, 1],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[0%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-30"
              style={{ backgroundColor: '#1D9E75' }}
            />
          </div>

          <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-left"
            >
              <Badge
                className="mb-8 border-none py-2 px-6 h-auto text-xs rounded-full font-black uppercase tracking-[0.2em]"
                style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }}
              >
                Trusted by 5,000+ Nigerian MSMEs
              </Badge>
              <TextReveal
                text="Your business, seen properly."
                className="text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mb-12 font-medium"
              >
                Send beautifully branded, professional invoices via WhatsApp in under 30 seconds. Look like a premium agency, get paid faster.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/onboarding">
                  <Button
                    className="w-full sm:w-auto h-16 px-12 text-xl font-black rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
                    style={{ backgroundColor: '#A855F7', color: '#FFFFFF' }}
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Button variant="outline" className="w-full sm:w-auto h-16 px-12 text-xl border-white/20 text-white hover:bg-white/10 rounded-2xl">
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            {/* Right Column: Floating Phone Mockup with Connectivity Trails */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, type: "spring", bounce: 0.3 }}
              className="relative w-full max-w-md mx-auto lg:ml-auto group"
            >
              {/* Connectivity Trails (SVG Glows) */}
              <svg className="absolute -inset-20 w-[140%] h-[140%] pointer-events-none z-0 overflow-visible" viewBox="0 0 400 400">
                <motion.path
                  d="M 100 100 Q 200 50 300 100 T 300 300"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="2"
                  strokeDasharray="0 1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 50 300 Q 150 350 350 250"
                  fill="none"
                  stroke="#7F77DD"
                  strokeWidth="1.5"
                  strokeDasharray="0 1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </svg>

              <div className="absolute -inset-4 bg-gradient-to-tr from-kova-purple/20 to-[#A855F7]/20 rounded-[4.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              {/* iPhone 17 Ultra-Thin Frame */}
              <div className="relative aspect-[9/19] bg-[#0A0A0A] rounded-[4rem] border-[6px] border-[#1C1C1C] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col ring-1 ring-white/10">
                {/* Under-Display Sensor (Dynamic Island 2.0) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full flex items-center justify-center border border-white/5 z-20">
                  <div className="w-1.5 h-1.5 rounded-full bg-kova-purple/40 blur-[1px]" />
                </div>

                {/* Status Bar */}
                <div className="h-12 w-full flex items-center justify-between px-10 pt-6 z-10">
                  <span className="text-[11px] font-black text-white/60">9:41</span>
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-2 bg-white/60 rounded-full" />
                    <div className="w-3 h-3 bg-[#A855F7] rounded-full shadow-[0_0_10px_#A855F7]" />
                  </div>
                </div>

                {/* App Content */}
                <div className="flex-1 px-8 pt-12 space-y-10">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white rounded-2xl p-2 shadow-xl">
                      <Image src="/Logo.png" alt="Kova" width={40} height={40} className="object-contain" />
                    </div>
                    <Badge className="bg-kova-green text-white border-none py-1.5 px-4 rounded-full text-[10px] font-black">PAID</Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Invoice #0042</p>
                    <h4 className="text-4xl font-black text-white tracking-tight">₦45,500.00</h4>
                  </div>

                  <div className="h-px w-full bg-white/5" />

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Client</span>
                      <span className="text-sm font-black text-white">Tunde Olowo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Service</span>
                      <span className="text-sm font-black text-white">Logo Identity</span>
                    </div>
                  </div>

                  <div className="pt-8">
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/5 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#A855F7] rounded-xl flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-white">Fast Settlement</span>
                          <span className="text-[9px] font-bold text-white/40">Sent via WhatsApp</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-8">
                  <Button className="w-full h-14 rounded-2xl bg-white text-[#161717] font-black text-sm">
                    View Digital Invoice
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <Badge
              className="mb-4 border-none py-2 px-4 rounded-full uppercase tracking-widest text-[10px] font-black"
              style={{ backgroundColor: '#EEEDFE', color: '#1A1060' }}
            >
              The Gap
            </Badge>
            <h2
              className="text-5xl md:text-6xl font-black tracking-tight"
              style={{ color: '#1A1060' }}
            >
              From informal <br />
              <span style={{ color: '#A855F7' }}>to premium.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { before: "Handwritten receipt", after: "Branded Digital Page", icon: Zap, img: "https://images.unsplash.com/photo-1488459739036-39ee895dd41b?w=800&auto=format&fit=crop" },
              { before: "WhatsApp voice notes", after: "Instant Pay Links", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop" },
              { before: "Generic screenshots", after: "Verified Review Portal", icon: Star, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="space-y-8 group"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                  <Image src={item.img} alt={item.after} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div
                    className="absolute inset-0 opacity-40 mix-blend-multiply"
                    style={{ backgroundColor: '#1A1060' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <p className="text-xs line-through opacity-40 font-bold uppercase tracking-widest" style={{ color: '#666680' }}>
                      {item.before}
                    </p>
                    <ArrowRight className="w-3 h-3 opacity-40" style={{ color: '#666680' }} />
                  </div>
                  <h3 className="text-3xl font-black leading-none" style={{ color: '#1A1060' }}>
                    {item.after}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#666680' }}>
                    Kova bridges the gap between how good you are and how professional you appear to your clients.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-32 bg-kova-mist/30 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <Badge className="bg-kova-navy text-white border-none py-2 px-4 rounded-full uppercase tracking-widest text-[10px] font-black">Process</Badge>
                <h2 className="text-5xl md:text-7xl font-black text-kova-navy leading-[1.1] tracking-tight">
                  Built for the speed <br />of your business.
                </h2>
                <div className="space-y-10">
                  {[
                    { step: 1, title: "Set up in 5 minutes", desc: "Add your business name, logo, and bank details." },
                    { step: 2, title: "Message the Kova Bot", desc: "Whenever you finish a job, tell the bot who it's for and how much." },
                    { step: 3, title: "Forward the link", desc: "Your client gets a professional, branded page via WhatsApp." },
                  ].map((step) => (
                    <motion.div
                      key={step.step}
                      whileInView={{ x: [0, 10, 0] }}
                      className="flex gap-8 group"
                    >
                      <div className="shrink-0 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center font-black text-2xl text-kova-navy group-hover:bg-kova-navy group-hover:text-white transition-colors duration-300">
                        {step.step}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-kova-navy">{step.title}</h4>
                        <p className="text-kova-subtle leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-10 bg-kova-purple/10 rounded-full blur-[100px] animate-pulse" />
                <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-[0_100px_150px_rgba(26,16,96,0.15)]">
                  <Image src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=1200&auto=format&fit=crop" alt="Working with Kova" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-40 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <div className="space-y-6">
                <Badge className="bg-kova-purple text-white border-none py-2 px-4 rounded-full uppercase tracking-widest text-[10px] font-black">Testimonials</Badge>
                <h2 className="text-5xl md:text-7xl font-black text-kova-navy tracking-tighter">Loved by experts.</h2>
              </div>
              <div className="bg-kova-mist/50 p-6 rounded-3xl flex gap-6 items-center">
                <div className="flex -space-x-4">
                  {testimonials.map((t, i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden relative">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-lg font-black text-kova-navy">4.9/5 Rating</p>
                  <p className="text-xs font-bold text-kova-subtle uppercase tracking-widest">From 2,000+ artisans</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <Card key={i} className="p-10 border-none shadow-2xl shadow-kova-mist/50 hover:-translate-y-4 transition-all duration-500 bg-white group">
                  <div className="flex gap-1 mb-8">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 fill-kova-purple text-kova-purple" />)}
                  </div>
                  <p className="text-xl text-kova-body leading-relaxed mb-10 font-medium">"{t.content}"</p>
                  <div className="flex items-center gap-4 border-t border-kova-mist pt-8">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-black text-kova-navy">{t.name}</p>
                      <p className="text-kova-subtle text-xs font-bold uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-40 bg-kova-navy px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-kova-green rounded-full blur-[180px] opacity-10" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-kova-purple rounded-full blur-[180px] opacity-10" />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 py-2 px-6 h-auto text-xs rounded-full">Pricing Plans</Badge>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-24 tracking-tighter">Grow your legacy.</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
              {[
                { name: "Free", price: "₦0", desc: "For getting started", features: ["20 invoices/mo", "WhatsApp bot", "Branded pages"], highlight: false },
                { name: "Pro", price: "₦3,500", period: "/mo", desc: "For growing businesses", features: ["Unlimited invoices", "No branding", "Advanced analytics", "Priority support"], highlight: true },
                { name: "Business", price: "₦8,000", period: "/mo", desc: "For established brands", features: ["Custom domains", "Client portal", "Team accounts"], highlight: false },
              ].map((p, i) => (
                <Card
                  key={i}
                  className={cn(
                    "p-12 text-left relative flex flex-col border-none transition-all duration-500",
                    p.highlight ? "bg-white scale-110 shadow-[0_50px_100px_rgba(0,0,0,0.3)] z-20" : "bg-white/5 backdrop-blur-xl border-white/10 text-white"
                  )}
                >
                  <div className="mb-12">
                    <h4 className={cn("text-xs font-black uppercase tracking-[0.2em] mb-4", p.highlight ? "text-kova-purple" : "text-white/50")}>{p.name}</h4>
                    <div className="flex items-baseline gap-1">
                      <span className={cn("text-5xl font-black", p.highlight ? "text-kova-navy" : "text-white")}>{p.price}</span>
                      <span className="opacity-50 text-sm font-bold">{p.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-6 mb-12 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-4">
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", p.highlight ? "bg-kova-green/10" : "bg-white/10")}>
                          <CheckCircle2 className={cn("w-3 h-3", p.highlight ? "text-kova-green" : "text-white")} />
                        </div>
                        <span className="text-sm font-bold">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={cn("w-full h-16 text-lg font-black rounded-2xl", p.highlight ? "bg-kova-navy text-white hover:bg-kova-purple" : "bg-white text-kova-navy hover:bg-kova-mist")}>
                    Get Started
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 px-6 text-center">
          <motion.div
            whileInView={{ scale: [0.95, 1] }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <h2 className="text-6xl md:text-9xl font-black text-kova-navy tracking-tighter">Ready?</h2>
            <p className="text-2xl text-kova-subtle font-medium max-w-2xl mx-auto">
              Join 5,000+ businesses winning with Kova. Setup takes 5 minutes.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/onboarding">
                <Button className="h-20 px-16 text-2xl bg-kova-navy text-white rounded-[2rem] shadow-2xl shadow-kova-navy/20">
                  Build your business
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-kova-mist bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
            <div className="space-y-8 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative">
                  <Image src="/Logo.png" alt="Kova" fill className="object-contain" />
                </div>
                <h3 className="text-3xl font-black text-kova-navy tracking-tighter">Kova</h3>
              </div>
              <p className="text-kova-subtle font-medium leading-relaxed">
                Empowering the next generation of African artisans and experts with premium client experiences.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-kova-mist rounded-full flex items-center justify-center text-kova-navy hover:bg-kova-navy hover:text-white transition-all cursor-pointer">
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
              <div className="space-y-6">
                <p className="text-xs font-black text-kova-navy uppercase tracking-widest">Product</p>
                <ul className="space-y-4 text-sm font-bold text-kova-subtle">
                  <li><Link href="#">Features</Link></li>
                  <li><Link href="#">Pricing</Link></li>
                   <li><Link href="/login">Login</Link></li>
                   <li><Link href="/dashboard">Dashboard</Link></li>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-xs font-black text-kova-navy uppercase tracking-widest">Company</p>
                <ul className="space-y-4 text-sm font-bold text-kova-subtle">
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="#">Privacy</Link></li>
                  <li><Link href="#">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-kova-mist flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-kova-subtle/50 text-[10px] font-bold tracking-widest uppercase">© 2026 Kova Technology. All rights reserved.</p>
            <div className="flex gap-8 text-[10px] font-bold text-kova-navy uppercase tracking-widest">
              <span>Made with ❤️ By Blaze Designs </span>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}

