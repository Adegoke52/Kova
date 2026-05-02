"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Copy, CreditCard, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PaymentSectionProps {
  invoice: {
    id: string;
    status: string;
    pageToken: string;
    totalAmount: number;
    business: {
      name: string;
      bankName: string;
      accountNumber: string;
      accountName: string;
    };
  };
}

export function PaymentSection({ invoice }: PaymentSectionProps) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(invoice.status === "PAYMENT_CLAIMED");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invoice.business.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentClaim = async () => {
    setIsClaiming(true);
    try {
      const response = await fetch(`/api/invoices/${invoice.pageToken}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: "" }),
      });
      if (response.ok) {
        setHasClaimed(true);
      }
    } catch (error) {
      console.error("Payment claim failed:", error);
    } finally {
      setIsClaiming(false);
    }
  };

  if (invoice.status === "PAID") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-kova-green/10 p-8 rounded-[32px] text-center border-2 border-kova-green/20"
      >
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
          >
            <CheckCircle2 className="w-16 h-16 text-kova-green" />
          </motion.div>
        </div>
        <h3 className="text-xl font-bold text-kova-navy">Payment Confirmed</h3>
        <p className="text-kova-subtle text-sm mt-1">Thank you for your business!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {hasClaimed ? (
          <motion.div
            key="claimed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-kova-mist p-8 rounded-[32px] text-center"
          >
            <Clock className="w-12 h-12 text-kova-purple mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-kova-navy">Payment Under Review</h3>
            <p className="text-kova-subtle text-sm mt-1">
              Waiting for {invoice.business.name} to confirm your payment.
            </p>
          </motion.div>
        ) : (
          <motion.div key="unpaid" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="border-2 border-kova-mist">
              <CardContent className="p-6">
                <p className="label-kova mb-4">Bank Transfer Details</p>
                
                <div className="bg-kova-mist p-4 rounded-2xl space-y-3 relative group">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-kova-subtle">Bank</span>
                    <span className="text-sm font-bold text-kova-navy">{invoice.business.bankName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-kova-subtle">Account Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-kova-navy tracking-tight">{invoice.business.accountNumber}</span>
                      <button 
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-kova-purple/10 rounded-full transition-colors text-kova-purple"
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-kova-subtle">Account Name</span>
                    <span className="text-sm font-bold text-kova-navy">{invoice.business.accountName}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    className="w-full py-6 text-lg" 
                    onClick={handlePaymentClaim}
                    isLoading={isClaiming}
                  >
                    I've Made Payment
                  </Button>
                  <p className="text-center text-[10px] text-kova-subtle mt-4 px-4 leading-relaxed">
                    Once you've made the transfer, tap the button above. The business owner will be notified to confirm your payment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
