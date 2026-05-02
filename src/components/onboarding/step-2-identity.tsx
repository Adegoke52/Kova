"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera } from "lucide-react";
import Image from "next/image";

interface Step2Props {
  onNext: () => void;
  updateData: (data: any) => void;
  data: any;
}

export function Step2Identity({ onNext, updateData, data }: Step2Props) {
  const [isUploading, setIsUploading] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // In production, call /api/upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    const fakeUrl = URL.createObjectURL(file);
    updateData({ logoUrl: fakeUrl });
    setIsUploading(false);
  };

  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : "KS";
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div 
              className="w-24 h-24 rounded-full border-4 border-kova-mist flex items-center justify-center overflow-hidden bg-white premium-transition group-hover:border-kova-purple/30"
              style={{ color: data.brandColor }}
            >
              {data.logoUrl ? (
                <Image src={data.logoUrl} alt="Logo" fill className="object-cover" />
              ) : (
                <span className="text-3xl font-black">{getInitials(data.name)}</span>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-kova-purple border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-kova-navy text-white rounded-full cursor-pointer hover:bg-kova-purple transition-colors shadow-lg">
              <Camera className="w-4 h-4" />
              <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
            </label>
          </div>
          <p className="text-[10px] font-bold text-kova-subtle uppercase tracking-widest mt-4">
            Business Logo
          </p>
        </div>

        <div className="space-y-4">
          <Input 
            label="Business Name"
            placeholder="e.g. Kemi's Salon"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            required
          />
        </div>

        <Button 
          className="w-full" 
          onClick={onNext} 
          disabled={!data.name || isUploading}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
