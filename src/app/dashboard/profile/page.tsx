"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  MapPin, 
  Banknote, 
  CreditCard, 
  Crown,
  LogOut,
  ChevronRight,
  Camera
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "Kemi's Salon",
    location: "Lekki Phase 1, Lagos",
    bankName: "GT Bank",
    accountNumber: "0123456789",
    accountName: "Kemi Adeyemi",
    brandColor: "#1A1060",
    tier: "PRO",
  });

  const colors = ["#1A1060", "#7F77DD", "#1D9E75", "#9E1D1D", "#1D5C9E", "#9E7B1D"];

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-kova-navy">Profile</h2>
          <p className="text-kova-subtle text-sm">Manage your business settings</p>
        </div>
        <Badge variant="paid" className="gap-1.5 h-8 px-4">
          <Crown className="w-3 h-3" />
          {profile.tier}
        </Badge>
      </header>

      {/* Identity Card */}
      <Card className="p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-kova-mist flex items-center justify-center bg-white text-3xl font-black" style={{ color: profile.brandColor }}>
              KS
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-kova-navy text-white rounded-full shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h3 className="mt-4 text-xl font-bold text-kova-navy">{profile.name}</h3>
          <p className="text-kova-subtle text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {profile.location}
          </p>
        </div>

        <div className="space-y-4">
          <Input 
            label="Business Name" 
            value={profile.name} 
            onChange={(e) => setProfile({...profile, name: e.target.value})}
          />
          <Input 
            label="Location" 
            value={profile.location} 
            onChange={(e) => setProfile({...profile, location: e.target.value})}
          />
        </div>
      </Card>

      {/* Payment Details */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Banknote className="w-5 h-5 text-kova-navy" />
          <h3 className="font-bold text-kova-navy">Payment Details</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="label-kova">Bank Name</label>
            <select
              value={profile.bankName}
              onChange={(e) => setProfile({...profile, bankName: e.target.value})}
              className="w-full rounded-2xl bg-kova-mist px-4 py-4 text-base font-medium text-kova-navy outline-none border-2 border-transparent focus:border-kova-purple focus:bg-white transition-all appearance-none"
            >
              <option value="GT Bank">GT Bank</option>
              <option value="Access Bank">Access Bank</option>
              <option value="Zenith Bank">Zenith Bank</option>
            </select>
          </div>
          <Input 
            label="Account Number" 
            value={profile.accountNumber} 
            onChange={(e) => setProfile({...profile, accountNumber: e.target.value})}
          />
          <Input 
            label="Account Name" 
            value={profile.accountName} 
            onChange={(e) => setProfile({...profile, accountName: e.target.value})}
          />
        </div>
      </Card>

      {/* Brand Color */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: profile.brandColor }} />
          <h3 className="font-bold text-kova-navy">Brand Colour</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          {colors.map(c => (
            <button
              key={c}
              onClick={() => setProfile({...profile, brandColor: c})}
              className={cn(
                "w-10 h-10 rounded-full transition-all active:scale-90",
                profile.brandColor === c ? "ring-4 ring-offset-2 ring-kova-purple/30" : ""
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <Button className="w-full" onClick={handleSave} isLoading={loading}>
          Save Changes
        </Button>
        <button className="w-full py-4 text-red-500 font-bold text-sm flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
