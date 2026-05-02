import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/twilio";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // In production, check auth here
    // const session = await getServerSession(); 

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: { business: true, client: true },
    });

    if (!invoice) {
      return new NextResponse("Invoice not found", { status: 404 });
    }

    await prisma.invoice.update({
      where: { id },
      data: { status: "PAID", paidAt: new Date() },
    });

    const message = `Payment confirmed ✅ ₦${invoice.totalAmount.toLocaleString()} from ${invoice.client.name}. INV-${invoice.invoiceNumber} is now paid.`;
    
    await sendWhatsAppMessage(invoice.business.phone, message);

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
