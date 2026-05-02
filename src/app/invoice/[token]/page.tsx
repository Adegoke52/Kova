import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle2, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { PaymentSection } from "@/components/invoice/payment-section";
import { ReviewSection } from "@/components/invoice/review-section";
import { TrackOpen } from "@/components/invoice/track-open";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function InvoicePage({ params }: PageProps) {
  const { token } = await params;

  // Mock data for development if DB not connected or record not found
  // In production, this would fetch from Prisma
  const invoice = await prisma.invoice.findUnique({
    where: { pageToken: token },
    include: { business: true, client: true, review: true },
  }).catch(() => null);

  if (!invoice) {
    // For now, let's show a beautiful mock page so the designer can see the work
    return <MockInvoicePage token={token} />;
  }

  return (
    <main className="min-h-screen bg-kova-white pb-12">
      <TrackOpen token={token} />
      {/* Branding Header */}
      <div 
        className="w-full pt-12 pb-24 px-6 flex flex-col items-center text-white"
        style={{ backgroundColor: invoice.business.brandColor }}
      >
        <div className="relative w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden bg-white mb-4">
          {invoice.business.logoUrl ? (
            <Image 
              src={invoice.business.logoUrl} 
              alt={invoice.business.name} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold" style={{ color: invoice.business.brandColor }}>
              {invoice.business.name.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold text-center">{invoice.business.name}</h1>
        {invoice.business.location && (
          <p className="flex items-center gap-1 text-white/80 text-sm mt-1">
            <MapPin className="w-3 h-3" />
            {invoice.business.location}
          </p>
        )}
      </div>

      {/* Invoice Content */}
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

              <div className="pt-2">
                <p className="label-kova">Client</p>
                <p className="font-bold text-kova-navy">{invoice.client.name}</p>
                {invoice.client.phone && <p className="text-kova-subtle text-sm">{invoice.client.phone}</p>}
              </div>

              <div className="border-t border-kova-mist pt-6">
                <div className="space-y-4">
                  {(invoice.items as any[]).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-kova-body font-medium">{item.name}</span>
                      <span className="text-kova-navy font-bold">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-kova-mist pt-6 flex justify-between items-center">
                <p className="text-lg font-bold text-kova-navy">Total</p>
                <p className="text-3xl font-black text-kova-navy">{formatCurrency(invoice.totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment & Review Sections */}
        <div className="max-w-md mx-auto mt-8 space-y-8">
          <PaymentSection invoice={invoice as any} />
          {invoice.status === "PAID" && <ReviewSection invoice={invoice as any} />}
        </div>
      </div>

      <footer className="mt-20 text-center">
        <p className="text-kova-subtle text-xs font-medium">Powered by <span className="text-kova-navy font-bold">Kova</span></p>
        <p className="text-kova-subtle/40 text-[10px] mt-1">kovahq.com</p>
      </footer>
    </main>
  );
}

// Mock component for development/preview
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
      bankName: "GT Bank",
      accountNumber: "0123456789",
      accountName: "Kemi Adeyemi",
    },
    client: {
      name: "Tunde Olowo",
      phone: "+234 801 234 5678",
    },
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
        <p className="flex items-center gap-1 text-white/80 text-sm mt-1">
          <MapPin className="w-3 h-3" />
          {mockInvoice.business.location}
        </p>
      </div>

      <div className="px-6 -mt-16">
        <Card className="max-w-md mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="label-kova">Invoice</p>
                  <h2 className="text-xl font-bold text-kova-navy">{mockInvoice.invoiceNumber}</h2>
                  <p className="text-kova-subtle text-sm">{formatDate(mockInvoice.createdAt)}</p>
                </div>
                <Badge variant="unpaid">UNPAID</Badge>
              </div>

              <div className="pt-2">
                <p className="label-kova">Client</p>
                <p className="font-bold text-kova-navy">{mockInvoice.client.name}</p>
                <p className="text-kova-subtle text-sm">{mockInvoice.client.phone}</p>
              </div>

              <div className="border-t border-kova-mist pt-6">
                <div className="space-y-4">
                  {mockInvoice.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-kova-body font-medium">{item.name}</span>
                      <span className="text-kova-navy font-bold">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-kova-mist pt-6 flex justify-between items-center">
                <p className="text-lg font-bold text-kova-navy">Total</p>
                <p className="text-3xl font-black text-kova-navy">{formatCurrency(mockInvoice.totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-md mx-auto mt-8 space-y-8">
          <PaymentSection invoice={mockInvoice as any} />
        </div>
      </div>

      <footer className="mt-20 text-center">
        <p className="text-kova-subtle text-xs font-medium">Powered by <span className="text-kova-navy font-bold">Kova</span></p>
        <p className="text-kova-subtle/40 text-[10px] mt-1">kovahq.com</p>
      </footer>
    </main>
  );
}
