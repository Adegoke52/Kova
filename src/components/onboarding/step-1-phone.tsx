"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  const [error, setError] = useState<string | null>(null);

  const handlePhoneSubmit = async () => {
    if (!data.phone) {
      setError("Please enter a phone number");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: data.phone }),
      });
      
      const result = await response.json();
      if (response.ok) {
        setShowOtp(true);
      } else {
        setError(result.error || "Failed to send OTP");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
    setError(null);
    try {
      const response = await fetch("/api/auth/otp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: data.phone, code }),
      });
      
      if (response.ok) {
        onNext();
      } else {
        const result = await response.json();
        setError(result.error || "Invalid code");
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0")?.focus();
      }
    } catch (err) {
      setError("Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl shadow-kova-navy/5 border border-white">
      <div className="space-y-8">
        {!showOtp ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="space-y-3 text-center">
              <p className="text-kova-subtle font-medium leading-relaxed px-4">
                Enter your <span className="text-kova-navy font-bold">WhatsApp-enabled</span> phone number. We'll send a secure 6-digit code to get your business started.
              </p>
              <Badge className="bg-kova-mist/50 border-kova-purple/20 text-kova-purple text-[9px] font-black uppercase">
                Demo: Any number works for now
              </Badge>
            </div>
            
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-kova-purple px-1">
                 Nigerian Phone Number
               </label>
               <div className="relative group">
                 <input 
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={data.phone}
                  onChange={(e) => updateData({ phone: e.target.value })}
                  className="w-full h-16 pl-14 pr-6 bg-kova-mist/50 border-2 border-transparent focus:border-kova-purple focus:bg-white rounded-2xl outline-none transition-all text-lg font-bold text-kova-navy"
                 />
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center pointer-events-none">
                    <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.119.554 4.188 1.606 6.04L0 24l6.117-1.604a11.845 11.845 0 005.926 1.585h.005c6.635 0 12.032-5.395 12.035-12.032a11.762 11.762 0 00-3.483-8.508z"/>
                    </svg>
                 </div>
               </div>
               {error && (
                 <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-black text-red-500 uppercase tracking-widest text-center">
                   {error}
                 </motion.p>
               )}
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
