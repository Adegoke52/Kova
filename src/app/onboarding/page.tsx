"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Step1Phone } from "@/components/onboarding/step-1-phone";
import { Step2Identity } from "@/components/onboarding/step-2-identity";
import { Step3Color } from "@/components/onboarding/step-3-color";
import { Step4Payment } from "@/components/onboarding/step-4-payment";
import { Step5Success } from "@/components/onboarding/step-5-success";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    logoUrl: "",
    brandColor: "#1A1060",
    bankName: "",
    accountNumber: "",
    accountName: "",
    location: "",
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleComplete = async () => {
    const { supabase } = await import("@/lib/supabase");
    
    const { error } = await supabase
      .from('businesses')
      .upsert({
        phone: formData.phone,
        business_name: formData.name,
        location: formData.location,
        brand_color: formData.brandColor,
        bank_name: formData.bankName,
        account_number: formData.accountNumber,
        account_name: formData.accountName,
      }, { onConflict: 'phone' });

    if (error) {
      console.error("Save Error:", error);
      throw error;
    }

    // Fallback for dashboard demo
    localStorage.setItem('kova_onboarding', JSON.stringify(formData));
    
    setStep(5);
  };

  const steps = [
    { id: 1, title: "Phone" },
    { id: 2, title: "Identity" },
    { id: 3, title: "Brand" },
    { id: 4, title: "Payment" },
  ];

  return (
    <main 
      className="min-h-screen flex flex-col items-center p-6 pt-12 relative overflow-hidden"
      style={{ backgroundColor: '#EEEDFE' }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg pointer-events-none">
        <div 
          className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: '#7F77DD' }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 w-full max-w-md flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          {step > 1 && step < 5 && (
            <button 
              onClick={prevStep}
              className="p-3 bg-white hover:bg-white/80 rounded-2xl transition-all shadow-sm border border-kova-navy/5"
            >
              <ChevronLeft className="w-5 h-5 text-kova-navy" />
            </button>
          )}
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kova-purple mb-1">
              {step < 5 ? `Step ${step} of 4` : "Welcome to Kova"}
            </span>
            <h1 className="text-2xl font-black text-kova-navy tracking-tight">
              {step === 1 && "Verify your phone"}
              {step === 2 && "Business details"}
              {step === 3 && "Brand identity"}
              {step === 4 && "Payment info"}
              {step === 5 && "You're all set!"}
            </h1>
          </div>
        </div>
        <div className="w-12 h-12 relative">
          <Image src="/Logo.png" alt="Kova" fill className="object-contain" />
        </div>
      </div>

      {/* Progress Bar */}
      {step < 5 && (
        <div className="relative z-10 w-full max-w-md h-2 bg-white rounded-full mb-12 overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            className="h-full bg-kova-purple rounded-full"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            {step === 1 && <Step1Phone onNext={nextStep} updateData={updateFormData} data={formData} />}
            {step === 2 && <Step2Identity onNext={nextStep} updateData={updateFormData} data={formData} />}
            {step === 3 && <Step3Color onNext={nextStep} updateData={updateFormData} data={formData} />}
            {step === 4 && <Step4Payment onNext={handleComplete} updateData={updateFormData} data={formData} />}
            {step === 5 && <Step5Success data={formData} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
