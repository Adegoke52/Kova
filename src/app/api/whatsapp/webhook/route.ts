import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage, WHATSAPP_TEMPLATES } from "@/lib/twilio";
import { nanoid } from "nanoid";

// Twilio webhook expects a 200 OK response
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = formData.get("Body")?.toString().trim() || "";
    const from = formData.get("From")?.toString() || "";
    // Ensure phone number has no 'whatsapp:' prefix and NO '+' sign to match DB
    const phone = from.replace("whatsapp:", "").replace("+", "");

    // 1. Check if business exists
    const business = await prisma.business.findUnique({
      where: { phone },
    });

    if (!business) {
      await sendWhatsAppMessage(
        phone,
        "It looks like you haven't set up your Kova profile yet. Visit kovahq.com to get started and look professional in minutes! 🚀"
      );
      return new NextResponse("Business not found", { status: 200 });
    }

    // 2. Get or create session
    let session = await prisma.botSession.findUnique({
      where: { phone },
    });

    if (!session || body.toLowerCase() === "invoice" || body.toLowerCase() === "start") {
      session = await prisma.botSession.upsert({
        where: { phone },
        update: { state: "AWAITING_CLIENT_NAME", data: {} },
        create: { phone, state: "AWAITING_CLIENT_NAME", data: {} },
      });
      await sendWhatsAppMessage(phone, `Hi ${business.name}! 👋 Let's get you paid. \n\nWho is this invoice for? (Reply with their name)`);
      return new NextResponse("OK", { status: 200 });
    }

    // 3. State machine
    const state = session.state;
    const data = session.data as any;

    switch (state) {
      case "AWAITING_CLIENT_NAME":
        await prisma.botSession.update({
          where: { phone },
          data: { 
            state: "AWAITING_SERVICES", 
            data: { ...data, clientName: body } 
          },
        });
        await sendWhatsAppMessage(phone, `Excellent. What service(s) did you provide for ${body}? \n\n(e.g. 1hr Photography, Full Hair Braiding)`);
        break;

      case "AWAITING_SERVICES":
        await prisma.botSession.update({
          where: { phone },
          data: { 
            state: "AWAITING_AMOUNT", 
            data: { ...data, services: body } 
          },
        });
        await sendWhatsAppMessage(phone, `Perfect. And what is the total amount to charge? 💰 \n\n(Numbers only, e.g. 15000)`);
        break;

      case "AWAITING_AMOUNT":
        const amount = parseFloat(body.replace(/[^0-9.]/g, ""));
        if (isNaN(amount)) {
          await sendWhatsAppMessage(phone, "Please send a valid number for the amount. (e.g. 15000)");
          return new NextResponse("OK", { status: 200 });
        }

        // Generate Invoice
        const invoiceNumber = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
        const pageToken = Math.random().toString(36).substring(2, 15);

        // Find or create client
        let client = await prisma.client.findFirst({
          where: { name: data.clientName, businessId: business.id },
        });

        if (!client) {
          client = await prisma.client.create({
            data: { name: data.clientName, businessId: business.id },
          });
        }

        const invoice = await prisma.invoice.create({
          data: {
            invoiceNumber,
            businessId: business.id,
            clientId: client.id,
            totalAmount: amount,
            items: [{ name: data.services, amount }],
            pageToken,
          },
        });

        const link = `${process.env.NEXT_PUBLIC_APP_URL}/invoice/${pageToken}`;

        await prisma.botSession.update({
          where: { phone },
          data: { 
            state: "AWAITING_TEMPLATE_SELECTION", 
            data: { ...data, amount, invoiceId: invoice.id, link, clientName: data.clientName } 
          },
        });

        const response = `✨ *Invoice Ready!*\n\n` +
          `Client: ${data.clientName}\n` +
          `Amount: ₦${amount.toLocaleString()}\n\n` +
          `Preview your professional page here:\n` +
          `👉 ${link}\n\n` +
          `How should I word the message for your client? Reply with a number:\n` +
          `1️⃣ Warm & Friendly\n` +
          `2️⃣ Professional/Formal\n` +
          `3️⃣ Quick & Direct`;
        
        await sendWhatsAppMessage(phone, response);
        break;

      case "AWAITING_TEMPLATE_SELECTION":
        let templateText = "";
        const { clientName, amount: amt, link: invLink } = data;

        if (body === "1") {
          templateText = WHATSAPP_TEMPLATES.WARM(clientName, invLink);
        } else if (body === "2") {
          templateText = WHATSAPP_TEMPLATES.FORMAL(clientName, invLink);
        } else if (body === "3") {
          templateText = WHATSAPP_TEMPLATES.DIRECT(clientName, amt.toLocaleString(), invLink);
        } else {
          await sendWhatsAppMessage(phone, "Please reply with 1, 2, or 3 to choose a template.");
          return new NextResponse("OK", { status: 200 });
        }

        await sendWhatsAppMessage(phone, `Copy and forward this to ${clientName}:\n\n${templateText}`);
        
        // Reset session
        await prisma.botSession.update({
          where: { phone },
          data: { state: "IDLE", data: {} },
        });
        break;

      default:
        await sendWhatsAppMessage(phone, "I didn't understand that. Type 'invoice' to create a new one.");
        break;
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
