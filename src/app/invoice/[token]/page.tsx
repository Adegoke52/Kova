"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { PaymentSection } from "@/components/invoice/payment-section";
import { ReviewSection } from "@/components/invoice/review-section";
import { TrackOpen } from "@/components/invoice/track-open";
import { use } from "react";

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
        className="w-full pt-12 pb-24 px-6 flex flex-col items-center text-white"
        style={{ backgroundColor: invoice.business.brandColor }}
      >
        <div className="relative w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden bg-white mb-4 flex items-center justify-center text-2xl font-bold" style={{ color: invoice.business.brandColor }}>
          {invoice.business.name.substring(0, 2).toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold text-center">{invoice.business.name}</h1>
      </div>

      <div className="px-6 -mt-16">
        <Card className="max-w-md mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="label-kova">Invoice</p>
                  <h2 className="text-xl font-bold text-kova-navy">{invoice.invoiceNumber}</h2>
                  <p className="text-kova-subtle text-sm">{formatDate(invoice.createdAt)}</p>
                </div>
                <Badge variant={invoice.status.toLowerCase() as any}>
                  {invoice.status.replace("_", " ")}
                </Badge>
              </div>
              
              <div className="border-t border-kova-mist pt-6 flex justify-between items-center">
                <p className="text-lg font-bold text-kova-navy">Total</p>
                <p className="text-3xl font-black text-kova-navy">{formatCurrency(invoice.totalAmount)}</p>
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
        className="w-full pt-12 pb-24 px-6 flex flex-col items-center text-white"
        style={{ backgroundColor: mockInvoice.business.brandColor }}
      >
        <div className="relative w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden bg-white mb-4 flex items-center justify-center text-2xl font-bold" style={{ color: mockInvoice.business.brandColor }}>
          KS
        </div>
        <h1 className="text-2xl font-bold text-center">{mockInvoice.business.name}</h1>
      </div>

      <div className="px-6 -mt-16">
        <Card className="max-w-md mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="label-kova">Invoice</p>
                  <h2 className="text-xl font-bold text-kova-navy">{mockInvoice.invoiceNumber}</h2>
                </div>
                <Badge variant="unpaid">UNPAID</Badge>
              </div>
              <div className="border-t border-kova-mist pt-6 flex justify-between items-center">
                <p className="text-lg font-bold text-kova-navy">Total</p>
                <p className="text-3xl font-black text-kova-navy">{formatCurrency(mockInvoice.totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="max-w-md mx-auto mt-8">
          <PaymentSection invoice={mockInvoice as any} />
        </div>
      </div>
    </main>
  );
}
