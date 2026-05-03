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
        window.location.href = "/dashboard";
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
            {!showWhatsAppLogin ? (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="name@business.com" 
                      className="h-14 bg-white/5 border-white/10 text-white rounded-2xl px-6 focus:ring-2 focus:ring-[#A855F7] transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Password</label>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-14 bg-white/5 border-white/10 text-white rounded-2xl px-6 focus:ring-2 focus:ring-[#A855F7] transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full h-14 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-[#A855F7]/20"
                  style={{ backgroundColor: '#A855F7', color: '#FFFFFF' }}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </>
            ) : (
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
                        className="h-14 bg-white/5 border-white/10 text-white rounded-2xl px-6 focus:ring-2 focus:ring-[#25D366] transition-all"
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
                
                <button 
                  onClick={() => {
                    setShowWhatsAppLogin(false);
                    setShowOtp(false);
                  }}
                  className="w-full text-center text-xs font-bold text-white/40 hover:text-white transition-colors"
                >
                  Back to email login
                </button>
              </motion.div>
            )}
          </div>

          {/* Social Divider */}
          {!showWhatsAppLogin && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                  <span className="bg-[#1A1060] px-4 text-white/40">Or continue with</span>
                </div>
              </div>

              {/* WhatsApp Login Button */}
              <Button 
                variant="outline" 
                onClick={() => setShowWhatsAppLogin(true)}
                className="w-full h-14 rounded-2xl border-white/10 text-white hover:bg-white/5 font-black text-sm transition-all flex items-center justify-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#25D366" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.008-3.568c0-3.639 2.962-6.6 6.6-6.6a6.54 6.54 0 0 1 4.615 1.884 6.54 6.54 0 0 1 1.92 4.626c0 3.639-2.961 6.6-6.6 6.6zm3.55-4.743c-.194-.097-1.144-.564-1.322-.628-.178-.064-.309-.097-.439.097-.13.194-.506.628-.621.758-.115.13-.23.144-.431.047-.201-.097-.847-.312-1.614-.997-.597-.533-.997-1.192-1.113-1.386-.115-.194-.012-.3.085-.398.087-.087.194-.227.291-.341.097-.114.129-.194.194-.323.064-.129.032-.242-.016-.339-.049-.097-.431-1.039-.591-1.422-.158-.376-.322-.325-.443-.325-.114 0-.246-.005-.378-.005-.132 0-.348.05-.53.254-.182.204-.697.68-.697 1.657 0 .977.71 1.916.809 2.046.099.13 1.398 2.133 3.385 2.993.472.203.84.325 1.127.418.474.151.906.129 1.246.078.38-.057 1.144-.468 1.305-.92.16-1.452.16-2.705.107-2.705-.054 0-.177-.031-.371-.129z"/>
                </svg>
                WhatsApp Quick Login
              </Button>
            </>
          )}

          {/* Footer */}
          <div className="text-center">
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

