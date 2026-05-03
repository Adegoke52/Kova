"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MapPin, ExternalLink, Download, FileText } from "lucide-react";
import { PaymentSection } from "@/components/invoice/payment-section";
import { ReviewSection } from "@/components/invoice/review-section";
import { TrackOpen } from "@/components/invoice/track-open";
import { use } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default function InvoicePage({ params }: PageProps) {
  const { token } = use(params);
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const res = await fetch(`/api/invoices/${token}`);
        if (res.ok) {
          const data = await res.json();
          setInvoice(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchInvoice();
  }, [token]);

  if (loading) {
    return <div className="min-h-screen bg-kova-white flex items-center justify-center font-bold text-kova-navy">Loading Invoice...</div>;
  }

  if (!invoice) {
    return <MockInvoicePage token={token} />;
  }

  return (
    <main className="min-h-screen bg-kova-white pb-12">
      <TrackOpen token={token} />
      <div 
        className="w-full pt-12 pb-24 px-6 flex flex-col items-center text-white no-print"
        style={{ backgroundColor: invoice.business.brandColor }}
      >
        <div className="relative w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden bg-white mb-4 flex items-center justify-center text-2xl font-bold" style={{ color: invoice.business.brandColor }}>
          {invoice.business.name.substring(0, 2).toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold text-center">{invoice.business.name}</h1>
      </div>

      <div className="px-6 -mt-16 print:mt-0">
        <Card className="max-w-md mx-auto overflow-hidden border-none shadow-2xl print:shadow-none">
          <CardContent className="p-0">
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="label-kova">Official Invoice</p>
                  </div>
                  <h2 className="text-2xl font-black text-kova-navy tracking-tight">{invoice.invoiceNumber}</h2>
                  <p className="text-kova-subtle text-xs font-bold uppercase tracking-widest">{formatDate(invoice.createdAt)}</p>
                </div>
                <Badge variant={invoice.status.toLowerCase() as any} className="px-4 py-1">
                  {invoice.status.replace("_", " ")}
                </Badge>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-kova-subtle">Services</p>
                {invoice.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-kova-mist/50">
                    <span className="font-bold text-kova-navy">{item.name}</span>
                    <span className="font-black text-kova-navy">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
                {(!invoice.items || invoice.items.length === 0) && (
                   <div className="flex justify-between items-center py-2 border-b border-kova-mist/50">
                     <span className="font-bold text-kova-navy">General Service</span>
                     <span className="font-black text-kova-navy">{formatCurrency(invoice.totalAmount)}</span>
                   </div>
                )}
              </div>
              
              <div className="pt-6 flex justify-between items-center">
                <p className="text-lg font-black text-kova-navy">Total Amount</p>
                <p className="text-3xl font-black text-kova-navy" style={{ color: invoice.business.brandColor }}>{formatCurrency(invoice.totalAmount)}</p>
              </div>

              <div className="no-print pt-4">
                <Button 
                  onClick={() => window.print()}
                  className="w-full h-14 rounded-2xl bg-kova-navy text-white font-black flex gap-2 hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download PDF Invoice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-md mx-auto mt-8 space-y-8">
          <PaymentSection invoice={invoice} />
          {invoice.status === "PAID" && <ReviewSection invoice={invoice} />}
        </div>
      </div>
    </main>
  );
}

function MockInvoicePage({ token }: { token: string }) {
  const mockInvoice = {
    invoiceNumber: "INV-047",
    createdAt: new Date(),
    status: "UNPAID",
    pageToken: token,
    totalAmount: 15000,
    items: [
      { name: "Hair Styling (Braids)", amount: 12000 },
      { name: "Hair Treatment", amount: 3000 },
    ],
    business: {
      name: "Kemi's Salon",
      brandColor: "#1A1060",
      location: "Lekki Phase 1, Lagos",
    },
    client: { name: "Tunde Olowo" },
  };

  return (
    <main className="min-h-screen bg-kova-white pb-12">
      <div 
        className="w-full pt-12 pb-24 px-6 flex flex-col items-center text-white no-print"
        style={{ backgroundColor: mockInvoice.business.brandColor }}
      >
        <div className="relative w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden bg-white mb-4 flex items-center justify-center text-2xl font-bold" style={{ color: mockInvoice.business.brandColor }}>
          KS
        </div>
        <h1 className="text-2xl font-bold text-center">{mockInvoice.business.name}</h1>
      </div>

      <div className="px-6 -mt-16 print:mt-0">
        <Card className="max-w-md mx-auto overflow-hidden border-none shadow-2xl print:shadow-none">
          <CardContent className="p-0">
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="label-kova">Official Invoice</p>
                  </div>
                  <h2 className="text-2xl font-black text-kova-navy tracking-tight">{mockInvoice.invoiceNumber}</h2>
                  <p className="text-kova-subtle text-xs font-bold uppercase tracking-widest">{formatDate(mockInvoice.createdAt)}</p>
                </div>
                <Badge variant="unpaid" className="px-4 py-1">UNPAID</Badge>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-kova-subtle">Services</p>
                {mockInvoice.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-kova-mist/50">
                    <span className="font-bold text-kova-navy">{item.name}</span>
                    <span className="font-black text-kova-navy">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 flex justify-between items-center">
                <p className="text-lg font-black text-kova-navy">Total Amount</p>
                <p className="text-3xl font-black text-kova-navy" style={{ color: mockInvoice.business.brandColor }}>{formatCurrency(mockInvoice.totalAmount)}</p>
              </div>

              <div className="no-print pt-4">
                <Button 
                  onClick={() => window.print()}
                  className="w-full h-14 rounded-2xl bg-kova-navy text-white font-black flex gap-2 hover:scale-105 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download PDF Invoice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="max-w-md mx-auto mt-8 no-print">
          <PaymentSection invoice={mockInvoice as any} />
        </div>
      </div>
    </main>
  );
}
