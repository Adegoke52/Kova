"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [showWhatsAppLogin, setShowWhatsAppLogin] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    if (!phone) return setError("Please enter your number");
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const result = await response.json();
      if (response.ok) {
        setShowOtp(true);
      } else {
        setError(result.message || "Failed to send OTP");
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

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    const code = otp.join("");
    try {
      const response = await fetch("/api/auth/otp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      
      if (response.ok) {
        // Success! Force a fresh load of the dashboard
        window.location.replace("/dashboard");
      } else {
        setError("Invalid verification code");
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (err) {
      setError("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1060] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-kova-purple rounded-full blur-[180px] opacity-20" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-kova-green rounded-full blur-[180px] opacity-20" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] space-y-10">
          {/* Logo & Header */}
          <div className="text-center space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 relative bg-white rounded-2xl p-1 shadow-lg group-hover:scale-110 transition-all">
                <Image src="/Logo.png" alt="Kova" fill className="object-contain p-1" />
              </div>
              <span className="font-black text-2xl text-white tracking-tighter">Kova</span>
            </Link>
            <h1 className="text-3xl font-black text-white tracking-tight pt-4">
              {showOtp ? "Verify code." : "Welcome back."}
            </h1>
            <p className="text-white/60 font-medium">
              {showOtp ? "Enter the 6-digit code sent to your WhatsApp." : "Log in to manage your premium brand."}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {!showOtp ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">WhatsApp Number</label>
                      <Input 
                        type="tel" 
                        placeholder="+234 ..." 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-14 bg-black/40 border-white/10 text-white placeholder:text-white/20 rounded-2xl px-6 focus:ring-2 focus:ring-[#25D366] transition-all"
                      />
                    {error && <p className="text-xs text-red-400 ml-2">{error}</p>}
                    <p className="text-[10px] text-white/40 ml-2">We'll send a 6-digit code to your WhatsApp.</p>
                  </div>

                  <Button 
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="w-full h-14 rounded-2xl font-black text-lg bg-[#25D366] text-white hover:bg-[#128C7E] transition-all"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        className="w-full aspect-square text-center text-xl font-black bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#25D366] transition-all"
                      />
                    ))}
                  </div>
                  <Button 
                    onClick={handleVerifyOtp}
                    disabled={loading || otp.some(d => d === "")}
                    className="w-full h-14 rounded-2xl font-black text-lg bg-[#25D366] text-white hover:bg-[#128C7E] transition-all"
                  >
                    {loading ? "Verifying..." : "Verify & Log In"}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-white/40 text-xs font-medium">
              Don't have an account?{" "}
              <Link href="/onboarding" className="text-[#A855F7] font-black hover:underline underline-offset-4">
                Join Kova today
              </Link>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-white/30">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bank-grade security</span>
        </div>
      </motion.div>
    </div>
  );
}

