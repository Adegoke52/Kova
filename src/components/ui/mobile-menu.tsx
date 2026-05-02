"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Zap, ShieldCheck, Star, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isScrolled?: boolean;
}

export function MobileMenu({ isScrolled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = [
    { name: "Features", href: "/#features", icon: Zap },
    { name: "Process", href: "/#how-it-works", icon: ShieldCheck },
    { name: "Pricing", href: "/#pricing", icon: Star },
    { name: "About Us", href: "/about", icon: Users },
    { name: "Security", href: "/security", icon: ShieldCheck },
  ];

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-xl transition-all active:scale-95",
          isScrolled ? "bg-kova-navy text-white shadow-lg" : "bg-white/10 text-white backdrop-blur-md border border-white/20"
        )}
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-[#0A0620] flex flex-col p-6 overflow-y-auto"
          >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-kova-purple rounded-full blur-[120px] opacity-20" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-kova-green rounded-full blur-[120px] opacity-10" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center mb-16">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg">
                  <img src="/Logo.png" alt="Kova" className="w-full h-full object-contain" />
                </div>
                <span className="font-black text-2xl text-white tracking-tighter">Kova</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-xl border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="relative z-10 flex flex-col gap-4 mb-auto">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-[#A855F7]" />
                      </div>
                      <span className="text-xl font-black text-white">{item.name}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                   <Button variant="outline" className="w-full h-16 rounded-2xl bg-white border-white text-kova-purple font-black text-sm uppercase tracking-widest hover:bg-kova-mist transition-all shadow-lg">
                     Login
                   </Button>
                </Link>
                <Link href="/onboarding" onClick={() => setIsOpen(false)}>
                   <Button className="w-full h-16 rounded-2xl bg-[#A855F7] text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-[#A855F7]/20">
                     Join Now
                   </Button>
                </Link>
              </div>
              <p className="text-center text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                Dignity Infrastructure for Artisans
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
