"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Step3Props {
  onNext: () => void;
  updateData: (data: any) => void;
  data: any;
}

export function Step3Color({ onNext, updateData, data }: Step3Props) {
  const colors = [
    { name: "Navy", hex: "#1A1060" },
    { name: "Purple", hex: "#7F77DD" },
    { name: "Deep Teal", hex: "#1D9E75" },
    { name: "Crimson", hex: "#9E1D1D" },
    { name: "Forest", hex: "#1D5C9E" },
    { name: "Amber", hex: "#9E7B1D" },
    { name: "Slate", hex: "#475569" },
    { name: "Rose", hex: "#E11D48" },
    { name: "Indigo", hex: "#4F46E5" },
    { name: "Violet", hex: "#7C3AED" },
    { name: "Emerald", hex: "#10B981" },
    { name: "Bordeaux", hex: "#881337" },
  ];

  return (
    <div className="space-y-8">
      {/* Premium Live Preview */}
      <div className="relative mb-12">
        <div className="absolute -inset-4 bg-white/40 blur-2xl rounded-[3rem] -z-10" />
        <div className="bg-white rounded-[2.5rem] border border-white shadow-2xl overflow-hidden relative">
          {/* Header Strip */}
          <div className="h-2 w-full" style={{ backgroundColor: data.brandColor }} />
          
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-kova-mist flex items-center justify-center p-2">
                   <div className="w-full h-full rounded-sm" style={{ backgroundColor: data.brandColor }} />
                </div>
                <h4 className="text-sm font-black text-kova-navy tracking-tight">{data.name || "Your Business"}</h4>
              </div>
              <Badge className="text-[8px] border-kova-green/20 text-kova-green font-black px-3 py-1 rounded-full uppercase tracking-widest bg-kova-green/5">
                Paid
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-kova-subtle">Amount Due</p>
              <h3 className="text-3xl font-black text-kova-navy tracking-tighter">₦45,500.00</h3>
            </div>

            <div className="pt-4 space-y-3">
              <div className="h-px w-full bg-kova-mist" />
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-kova-subtle uppercase tracking-widest">Client</span>
                <span className="text-[10px] font-black text-kova-navy">Tunde Olowo</span>
              </div>
            </div>

            <Button 
              className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg"
              style={{ backgroundColor: data.brandColor, color: '#FFFFFF' }}
            >
              View Detailed Invoice
            </Button>
          </div>
        </div>
        
        {/* Floating Accent */}
        <div 
          className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-3xl opacity-20 transition-colors duration-500"
          style={{ backgroundColor: data.brandColor }}
        />
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <p className="label-kova">Select Brand Colour</p>
          <div className="grid grid-cols-4 gap-4">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => updateData({ brandColor: c.hex })}
                className={cn(
                  "relative w-full aspect-square rounded-2xl flex items-center justify-center transition-all active:scale-90",
                  data.brandColor === c.hex ? "ring-4 ring-offset-2 ring-kova-purple/30" : ""
                )}
                style={{ backgroundColor: c.hex }}
              >
                {data.brandColor === c.hex && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
          
          <Button className="w-full mt-4" onClick={onNext}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
