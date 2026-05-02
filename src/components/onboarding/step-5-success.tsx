"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface Step5Props {
  data: any;
}

export function Step5Success({ data }: Step5Props) {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#1A1060", "#7F77DD", "#1D9E75"]
    });
  }, []);

  const botNumber = process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || "+14155238886";
  const whatsappUrl = `https://wa.me/${botNumber.replace("+", "")}?text=start`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8 py-8"
    >
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
          className="w-24 h-24 bg-kova-green/10 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="w-16 h-16 text-kova-green" />
        </motion.div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-black text-kova-navy">You're Premium.</h2>
        <p className="text-kova-subtle">
          {data.name} is ready to shine. Your business profile is live and your Kova bot is waiting.
        </p>
      </div>

      <div className="bg-white p-6 rounded-[32px] border-2 border-kova-mist shadow-sm space-y-4">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 bg-kova-purple/10 rounded-full flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6 text-kova-purple" />
          </div>
          <div>
            <p className="text-xs font-bold text-kova-subtle uppercase tracking-widest">Your Kova Bot</p>
            <p className="font-bold text-kova-navy">{botNumber}</p>
          </div>
        </div>
        <p className="text-sm text-kova-subtle text-left leading-relaxed">
          Save this number. Whenever you finish a job, just message the bot to send your branded invoice.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <Link href={whatsappUrl} target="_blank" className="block w-full">
          <Button className="w-full h-16 rounded-2xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3">
            Send your first invoice
            <ExternalLink className="w-5 h-5" />
          </Button>
        </Link>
        
        <Link 
          href="/dashboard" 
          className="block w-full py-4 text-kova-navy font-bold text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
        >
          Go to Dashboard
        </Link>
      </div>
    </motion.div>
  );
}
