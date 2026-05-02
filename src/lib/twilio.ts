import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";

const client = twilio(accountSid, authToken);

export async function sendWhatsAppMessage(to: string, body: string) {
  try {
    const message = await client.messages.create({
      body,
      from: fromNumber,
      to: `whatsapp:${to.startsWith("+") ? to : `+${to}`}`,
    });
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return { success: false, error };
  }
}

export const WHATSAPP_TEMPLATES = {
  WARM: (clientName: string, link: string) => 
    `Hi ${clientName}! It was such a pleasure working with you today. ✨ I've prepared a beautifully branded invoice for you here: ${link}\n\nThank you for choosing my business!`,
  
  FORMAL: (clientName: string, link: string) => 
    `Dear ${clientName},\n\nPlease find the professional invoice for the services provided. You can view the full summary and process payment securely via this link: ${link}\n\nWe appreciate your continued patronage.`,
  
  DIRECT: (clientName: string, amount: string, link: string) => 
    `Hi ${clientName}, your invoice is ready. \nTotal: ₦${amount}\n\nView and Pay: ${link}\n\nLooking forward to our next project! 🚀`,
};
