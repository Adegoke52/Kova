import { NextResponse } from "next/server";

// In-memory store for OTPs (Development only - use Redis/DB for production)
const otpStore = new Map<string, { code: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // 1. Clean the phone number (ensure it starts with 234 and has no +)
    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "234" + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith("234")) {
      cleanPhone = "234" + cleanPhone;
    }

    // 2. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Store OTP with 5-minute expiry
    otpStore.set(cleanPhone, {
      code: otp,
      expires: Date.now() + 5 * 60 * 1000,
    });

    console.log(`[KOVA] Sending OTP ${otp} to ${cleanPhone}`);

    // 4. Call Termii API (Passing API key in URL as well for maximum compatibility)
    const apiKey = process.env.TERMII_API_KEY;
    const termiiUrl = `https://api.ng.termii.com/api/sms/send?api_key=${apiKey}`;
    
    const termiiResponse = await fetch(termiiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: cleanPhone,
        from: process.env.TERMII_SENDER_ID || "TID",
        sms: `Welcome to the Kova Experience Platform. Your secure verification code is ${otp}. Please use this to complete your business profile.`,
        type: "whatsapp",
        channel: "whatsapp",
        api_key: apiKey,
      }),
    });

    let termiiData: any = {};
    const responseText = await termiiResponse.text();
    
    try {
      termiiData = JSON.parse(responseText);
    } catch (e) {
      termiiData = { message: responseText };
    }

    if (termiiResponse.ok) {
      return NextResponse.json({ success: true, message: "Verification code sent via WhatsApp" });
    } else {
      console.error("Termii Error (Falling back to Demo Mode):", JSON.stringify(termiiData));
      
      // PREVIEW MODE: For presentation and while Termii account is being approved
      return NextResponse.json({ 
        success: true, 
        message: "Kova Preview: Use master code 123456 to continue.",
        isDemo: true 
      });
    }
  } catch (error: any) {
    console.error("OTP API Critical Error:", error);
    return NextResponse.json({ 
      error: "Service temporarily unavailable", 
      message: error.message 
    }, { status: 500 });
  }
}

// Verification endpoint logic (could be in the same file or separate)
export async function PUT(req: Request) {
  try {
    const { phone, code } = await req.json();
    
    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "234" + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith("234")) {
      cleanPhone = "234" + cleanPhone;
    }

    const storedData = otpStore.get(cleanPhone);

    if (!storedData) {
      return NextResponse.json({ error: "OTP expired or not requested" }, { status: 400 });
    }

    if (Date.now() > storedData.expires) {
      otpStore.delete(cleanPhone);
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // DEMO BYPASS: Allow 123456 as a master code
    if (code === "123456") {
      otpStore.delete(cleanPhone);
      return NextResponse.json({ success: true });
    }

    if (storedData.code === code) {
      otpStore.delete(cleanPhone);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
