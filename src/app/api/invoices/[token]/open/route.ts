import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/twilio";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: { pageToken: token },
      include: { business: true, client: true },
    });

    if (!invoice) {
      return new NextResponse("Invoice not found", { status: 404 });
    }

    // Only notify on first open
    if (!invoice.openedAt) {
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: { openedAt: new Date() },
      });

      const message = `${invoice.client.name} just opened your invoice 👀\n` +
        `${invoice.invoiceNumber} — ₦${invoice.totalAmount.toLocaleString()}`;

      await sendWhatsAppMessage(invoice.business.phone, message);
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Open tracking error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
