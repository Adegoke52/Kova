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
      {/* Mini Preview */}
      <Card className="bg-kova-white overflow-hidden border-2 border-kova-mist shadow-sm">
        <div className="p-4 bg-kova-mist/50 border-b border-kova-mist flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold" style={{ color: data.brandColor }}>
              {data.name?.substring(0, 2).toUpperCase() || "KS"}
            </div>
            <span className="text-xs font-bold text-kova-navy">{data.name || "Business Name"}</span>
          </div>
          <Smartphone className="w-4 h-4 text-kova-subtle" />
        </div>
        <div className="p-6">
          <div className="h-4 w-24 bg-kova-mist rounded-full mb-3" />
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-kova-mist rounded-full" />
              <div className="h-6 w-32 rounded-lg" style={{ backgroundColor: data.brandColor + "20" }} />
            </div>
            <div className="h-10 w-24 rounded-xl" style={{ backgroundColor: data.brandColor }} />
          </div>
        </div>
      </Card>

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
