"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Eye, Server, Smartphone, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { MobileMenu } from "@/components/ui/mobile-menu";

export default function SecurityPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 py-6 bg-white/80 backdrop-blur-xl border-b border-kova-navy/10">
          <div className="flex items-center justify-between px-8 max-w-[1600px] mx-auto">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 relative bg-kova-navy rounded-xl p-1 shadow-lg group-hover:scale-110 transition-all">
                <Image src="/Logo.png" alt="Kova" fill className="object-contain p-1 invert" />
              </div>
              <span className="font-black text-2xl text-kova-navy tracking-tighter">Kova</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/onboarding" className="hidden md:block">
                <Button
                  className="rounded-xl px-8 h-12 font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
                  style={{ backgroundColor: '#A855F7', color: '#FFFFFF' }}
                >
                  Join Kova
                </Button>
              </Link>
              <MobileMenu isScrolled={true} />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 bg-[#1A1060] relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-kova-purple rounded-full blur-[180px] opacity-10" />
          <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-kova-green rounded-full blur-[180px] opacity-10" />

          <div className="max-w-4xl mx-auto relative z-10 space-y-8">
            <Badge className="mb-4 border-none py-2 px-6 h-auto text-xs rounded-full font-black uppercase tracking-[0.2em]" style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }}>Trust & Security</Badge>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tighter">
              Bank-grade security for your craft.
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
              We protect your data with the same intensity you bring to your business. Built on world-class infrastructure.
            </p>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Lock, 
                title: "Data Encryption", 
                desc: "All your invoices, client details, and financial records are encrypted at rest and in transit using industry-standard AES-256 encryption." 
              },
              { 
                icon: ShieldCheck, 
                title: "Official WhatsApp API", 
                desc: "We use the official Meta WhatsApp Business Platform. Every message is end-to-end secure and verified by Meta." 
              },
              { 
                icon: Eye, 
                title: "Privacy First", 
                desc: "Your data is yours. Kova never sells your client lists or transaction history to third parties. Period." 
              },
            ].map((pillar, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-kova-mist/30 border border-kova-mist space-y-8 hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-kova-navy/5">
                  <pillar.icon className="w-8 h-8 text-kova-purple" />
                </div>
                <h3 className="text-2xl font-black text-kova-navy">{pillar.title}</h3>
                <p className="text-kova-subtle font-medium leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Breakdown */}
        <section className="py-16 md:py-32 px-6 bg-white">
          <div className="max-w-5xl mx-auto space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-kova-navy tracking-tight">Financial Infrastructure</h2>
                <p className="text-kova-subtle font-medium leading-relaxed">
                  Kova partners with regulated financial institutions to ensure your payouts are secure. We never touch your funds; we only provide the infrastructure to help you track and request them professionally.
                </p>
                <ul className="space-y-4">
                   {[
                     "PCI-DSS Level 1 Compliant Partners",
                     "Real-time fraud monitoring",
                     "Multi-factor authentication (MFA) via WhatsApp"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 font-bold text-kova-navy">
                       <ArrowRight className="w-4 h-4 text-kova-purple" />
                       {item}
                     </li>
                   ))}
                </ul>
              </div>
              <div className="bg-kova-navy rounded-[3rem] p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-kova-purple rounded-full blur-3xl opacity-20" />
                <Server className="w-20 h-20 text-white/20 mb-8" />
                <div className="space-y-2">
                   <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                   <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                   <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-kova-mist rounded-[3rem] p-12 flex items-center justify-center">
                <Smartphone className="w-32 h-32 text-kova-navy opacity-10" />
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <h2 className="text-4xl font-black text-kova-navy tracking-tight">Identity Protection</h2>
                <p className="text-kova-subtle font-medium leading-relaxed">
                  Your business identity is your most valuable asset. Kova ensures that only you can issue invoices on your behalf through phone-based verification and secure session management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-kova-mist pt-32 pb-12 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-20">
            <div className="max-w-sm space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative bg-kova-navy rounded-xl p-1 shadow-lg">
                  <Image src="/Logo.png" alt="Kova" fill className="object-contain p-1 invert" />
                </div>
                <span className="font-black text-2xl text-kova-navy tracking-tighter">Kova</span>
              </div>
              <p className="text-kova-subtle font-medium leading-relaxed">
                The digital heartbeat of the global informal economy. Built for speed, designed for growth.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
              <div className="space-y-6">
                <p className="text-xs font-black text-kova-navy uppercase tracking-widest">Product</p>
                <ul className="space-y-4 text-sm font-bold text-kova-subtle">
                  <li><Link href="/#features">Features</Link></li>
                  <li><Link href="/#pricing">Pricing</Link></li>
                  <li><Link href="/dashboard">Dashboard</Link></li>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-xs font-black text-kova-navy uppercase tracking-widest">Company</p>
                <ul className="space-y-4 text-sm font-bold text-kova-subtle">
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/security">Security</Link></li>
                  <li><Link href="#">Privacy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-kova-mist flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-kova-subtle/50 text-[10px] font-bold tracking-widest uppercase">© 2026 Kova Technology. All rights reserved.</p>
            <div className="flex gap-8 text-[10px] font-bold text-kova-navy uppercase tracking-widest">
              <span>Made with ❤️ By Blaze Designs</span>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
