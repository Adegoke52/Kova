import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/twilio";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const { reference } = await req.json();

    const invoice = await prisma.invoice.findUnique({
      where: { pageToken: token },
      include: { business: true, client: true },
    });

    if (!invoice) {
      return new NextResponse("Invoice not found", { status: 404 });
    }

    await prisma.invoice.update({
      where: { id: invoice.id },
      data: { status: "PAYMENT_CLAIMED" },
    });

    const dashboardLink = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/invoices`;

    const message = `${invoice.client.name} just claimed payment for ${invoice.invoiceNumber} (₦${invoice.totalAmount.toLocaleString()}).\n` +
      (reference ? `Ref: ${reference}\n` : "") +
      `Tap to confirm: ${dashboardLink}`;

    await sendWhatsAppMessage(invoice.business.phone, message);

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Payment claim error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
