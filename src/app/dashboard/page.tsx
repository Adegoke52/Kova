"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  Smartphone,
  ShieldCheck,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const [businessName, setBusinessName] = useState("Your Business");
  const [brandColor, setBrandColor] = useState("#1A1060");

  useEffect(() => {
     async function loadData() {
       // 1. Try Local Storage
       const savedData = localStorage.getItem('kova_onboarding');
       if (savedData) {
         const parsed = JSON.parse(savedData);
         setBusinessName(parsed.name || "Your Business");
         setBrandColor(parsed.brandColor || "#1A1060");
         return;
       }

       // 2. Fallback to Database
       const phone = localStorage.getItem('kova_user_phone');
       if (phone) {
         try {
           const { supabase } = await import("@/lib/supabase");
           const { data, error } = await supabase
             .from('businesses')
             .select('*')
             .eq('phone', phone)
             .single();
           
           if (data && !error) {
             setBusinessName(data.business_name);
             setBrandColor(data.brand_color);
             // Re-save to local for next time
             localStorage.setItem('kova_onboarding', JSON.stringify({
               name: data.business_name,
               brandColor: data.brand_color,
               location: data.location,
               bankName: data.bank_name,
               accountNumber: data.account_number,
               accountName: data.account_name
             }));
           }
         } catch (err) {
           console.error("DB Sync failed:", err);
         }
       }
     }
     loadData();
  }, []);

  const stats = [
    { label: "Total Revenue", value: "₦0.00", icon: TrendingUp, color: "text-kova-green" },
    { label: "Active Clients", value: "0", icon: MessageSquare, color: "text-kova-purple" },
    { label: "Pending Invoices", value: "0", icon: Clock, color: "text-[#EAB308]" },
  ];

  return (
    <div className="min-h-screen bg-kova-mist/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-kova-navy/5 px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-kova-navy rounded-xl flex items-center justify-center p-2">
              <Image src="/Logo.png" alt="Kova" width={24} height={24} className="invert" />
            </div>
            <span className="font-black text-2xl text-kova-navy tracking-tighter">Kova</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-bold text-kova-subtle">
             <Link href="#" className="text-kova-navy">Overview</Link>
             <Link href="#">Invoices</Link>
             <Link href="#">Clients</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Badge className="bg-kova-green/10 text-kova-green border-none py-1 px-3 rounded-full text-[10px] font-black uppercase">Live Account</Badge>
           <div className="w-10 h-10 rounded-full bg-kova-mist flex items-center justify-center font-black text-kova-navy">
             {businessName ? businessName[0] : "Y"}
           </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-kova-navy tracking-tight">Welcome, {businessName}</h1>
            <p className="text-kova-subtle font-medium">Your business is seen properly. Let's get to work.</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="h-14 rounded-2xl border-kova-navy/10 font-black px-8">
               Manage Profile
             </Button>
             <Link href="/dashboard/invoices/new">
               <Button className="h-14 rounded-2xl bg-kova-navy text-white font-black px-8 flex items-center gap-3 shadow-[0_15px_30px_rgba(26,16,96,0.25)] hover:scale-105 active:scale-95 transition-all">
                 <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                   <Plus className="w-4 h-4 text-white" strokeWidth={3} />
                 </div>
                 Create Invoice
               </Button>
             </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
               <CardContent className="p-8">
                 <div className="flex justify-between items-start mb-6">
                    <div className={cn("w-12 h-12 rounded-2xl bg-kova-mist/50 flex items-center justify-center transition-transform group-hover:scale-110", stat.color)}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <Badge className="border-kova-navy/5 text-[9px] font-black opacity-50 uppercase tracking-widest">Last 30 Days</Badge>
                 </div>
                 <div className="space-y-1">
                   <p className="text-sm font-bold text-kova-subtle">{stat.label}</p>
                   <h2 className="text-3xl font-black text-kova-navy">{stat.value}</h2>
                 </div>
               </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bot Connection */}
          <Card className="lg:col-span-2 border-none bg-kova-navy text-white overflow-hidden relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-kova-purple rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
             <CardContent className="p-12 relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="space-y-6 max-w-lg">
                  <Badge className="bg-white/10 text-white border-white/20 py-1 px-3 rounded-full text-[10px] font-black uppercase">WhatsApp-Native</Badge>
                  <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">Your Kova Bot is ready to serve.</h2>
                  <p className="text-white/60 font-medium leading-relaxed">
                    Just message the bot with a client name and amount. We'll handle the professional formatting and tracking for you.
                  </p>
                  <div className="pt-4">
                    <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || "14155238886"}`} target="_blank">
                      <Button className="h-16 px-10 rounded-2xl bg-kova-green text-white font-black text-sm uppercase tracking-widest flex gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-kova-green/20">
                        <Smartphone className="w-5 h-5" />
                        Message Kova Bot
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="w-48 h-48 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center backdrop-blur-xl">
                   <div className="relative w-32 h-32">
                     <Image src="/Logo.png" alt="QR" fill className="object-contain opacity-20" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <ShieldCheck className="w-16 h-16 text-kova-green" />
                     </div>
                   </div>
                </div>
             </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none bg-white shadow-sm">
             <CardContent className="p-10 space-y-8">
                <h3 className="text-xl font-black text-kova-navy tracking-tight">Quick Settings</h3>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 rounded-2xl bg-kova-mist/30 border border-kova-mist">
                      <div className="flex items-center gap-3">
                         <div className="w-4 h-4 rounded-full" style={{ backgroundColor: brandColor }} />
                         <span className="text-sm font-bold text-kova-navy">Brand Theme</span>
                      </div>
                      <Settings className="w-4 h-4 text-kova-subtle cursor-pointer hover:rotate-90 transition-all" />
                   </div>
                   <div className="flex items-center justify-between p-4 rounded-2xl bg-kova-mist/30 border border-kova-mist">
                      <div className="flex items-center gap-3">
                         <Badge className="bg-kova-navy text-white text-[9px] px-2 py-0.5">234</Badge>
                         <span className="text-sm font-bold text-kova-navy">WhatsApp Linked</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-kova-green" />
                   </div>
                </div>
                <div className="pt-8 border-t border-kova-mist">
                   <Link href="/login" className="flex items-center gap-3 text-red-500 font-black text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                   </Link>
                </div>
             </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
