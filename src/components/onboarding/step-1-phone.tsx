"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Step1Props {
  onNext: () => void;
  updateData: (data: any) => void;
  data: any;
}

export function Step1Phone({ onNext, updateData, data }: Step1Props) {
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = async () => {
    setLoading(true);
    // In production, call Supabase Auth OTP
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowOtp(true);
    setLoading(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    if (newOtp.every(digit => digit !== "") && index === 5) {
      handleVerifyOtp(newOtp.join(""));
    }
  };

  const handleVerifyOtp = async (code: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onNext();
    setLoading(false);
  };

  return (
    <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl shadow-kova-navy/5 border border-white">
      <div className="space-y-8">
        {!showOtp ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="space-y-3 text-center">
              <p className="text-kova-subtle font-medium leading-relaxed px-4">
                We'll send a secure verification code to your phone to get your business started.
              </p>
            </div>
            
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-kova-purple px-1">
                 Nigerian Phone Number
               </label>
               <input 
                type="tel"
                placeholder="+234 801 234 5678"
                value={data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
                className="w-full h-16 px-6 bg-kova-mist/50 border-2 border-transparent focus:border-kova-purple focus:bg-white rounded-2xl outline-none transition-all text-lg font-bold text-kova-navy"
               />
            </div>

            <Button 
              className="w-full h-16 text-lg font-black bg-kova-navy text-white rounded-2xl shadow-xl shadow-kova-navy/20 hover:bg-kova-purple transition-all" 
              onClick={handlePhoneSubmit} 
              isLoading={loading}
            >
              Continue
            </Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
            <div className="space-y-3 text-center">
              <p className="text-kova-subtle font-medium leading-relaxed">
                Enter the 6-digit code sent to your phone.
              </p>
            </div>
            <div className="flex justify-between gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-full aspect-square text-center text-2xl font-black bg-kova-mist/50 rounded-2xl border-2 border-transparent focus:border-kova-purple focus:bg-white outline-none transition-all text-kova-navy"
                />
              ))}
            </div>
            <div className="text-center pt-2">
              <button 
                onClick={() => setShowOtp(false)}
                className="text-xs font-black text-kova-purple uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                Resend Code
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
