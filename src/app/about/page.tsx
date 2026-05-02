"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, ShieldCheck, Star, Users, Heart, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { TextReveal } from "@/components/ui/text-reveal";
import { MobileMenu } from "@/components/ui/mobile-menu";

export default function AboutPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white">
        {/* Navigation - Same as Home but simplified */}
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
        <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 bg-[#1A1060] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-kova-purple rounded-full blur-[180px] opacity-10" />
          <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-kova-green rounded-full blur-[180px] opacity-10" />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <Badge className="mb-8 border-none py-2 px-6 h-auto text-xs rounded-full font-black uppercase tracking-[0.2em]" style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' }}>Our Mission</Badge>
            <TextReveal
              text="Empowering the heartbeat of the economy."
              className="text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-12 justify-center"
            />
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
              We believe every business owner, regardless of their size or location, deserves to look as professional as the services they provide.
            </p>
          </div>
        </section>

        {/* The Story Section */}
        <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <Badge className="bg-kova-mist text-kova-navy border-none py-2 px-4 rounded-full uppercase tracking-widest text-[10px] font-black">The Kova Story</Badge>
              <h2 className="text-5xl md:text-7xl font-black text-kova-navy leading-[1.1] tracking-tight">
                Bridging the gap <br /> since 2024.
              </h2>
              <div className="space-y-6 text-lg text-kova-subtle font-medium leading-relaxed">
                <p>
                  Kova was born in the bustling streets of Lagos, where we saw incredible artisans, caterers, and freelancers doing world-class work but struggling to command the premium prices they deserved.
                </p>
                <p>
                  The barrier wasn't their skill—it was their presentation. In a digital world, an informal WhatsApp message with a blurry bank account photo is a friction point.
                </p>
                <p>
                  We built Kova to be the "Digital Suit" for the informal economy. A way to turn a simple WhatsApp conversation into a premium, branded client experience in under 30 seconds.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(26,16,96,0.2)]">
              <Image
                src="/team.png"
                alt="Entrepreneur working"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-kova-navy/20 mix-blend-multiply" />
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-16 md:py-32 bg-kova-mist px-6">
          <div className="max-w-7xl mx-auto text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-kova-navy tracking-tight">Our Core Values</h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Heart, title: "Empathy First", desc: "We build for real people with real businesses. Every feature starts with a conversation in a workshop or a market." },
              { icon: Zap, title: "Speed is Power", desc: "For a small business, time is literally money. If it takes longer than 30 seconds, it's too slow." },
              { icon: ShieldCheck, title: "Trust by Design", desc: "We ensure every link sent via Kova looks and feels secure, professional, and authoritative." },
            ].map((value, i) => (
              <Card key={i} className="p-10 border-none shadow-xl bg-white hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-kova-mist rounded-2xl flex items-center justify-center mb-8">
                  <value.icon className="w-8 h-8 text-kova-navy" />
                </div>
                <h3 className="text-2xl font-black text-kova-navy mb-4">{value.title}</h3>
                <p className="text-kova-subtle font-medium leading-relaxed">{value.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Global Impact */}
        <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto text-center">
          <div className="space-y-12">
            <Badge className="bg-kova-navy text-white border-none py-2 px-4 rounded-full uppercase tracking-widest text-[10px] font-black">Future Focus</Badge>
            <h2 className="text-6xl md:text-9xl font-black text-kova-navy tracking-tighter">10 Million.</h2>
            <p className="text-2xl md:text-3xl text-kova-subtle font-black max-w-3xl mx-auto leading-tight uppercase tracking-widest">
              MSMEs Digitized by 2030.
            </p>
            <div className="pt-12 flex justify-center">
              <Link href="/onboarding">
                <Button
                  className="h-20 px-16 text-2xl font-black rounded-[2rem] shadow-2xl transition-all hover:scale-105"
                  style={{ backgroundColor: '#A855F7', color: '#FFFFFF' }}
                >
                  Start Your Journey
                </Button>
              </Link>
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
                  <li><Link href="#">Terms</Link></li>
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

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`p-8 rounded-[2rem] border border-kova-mist ${className}`}>
      {children}
    </div>
  );
}
