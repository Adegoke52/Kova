import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kova | Your business, seen properly.",
  description: "Send professional, branded invoices via WhatsApp in under 30 seconds. Designed for the global informal economy.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/Logo.png", sizes: "32x32" },
      { url: "/Logo.png", sizes: "16x16" },
    ],
    apple: "/Logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1060",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-inter selection:bg-kova-purple/30 selection:text-kova-navy">
        {children}
      </body>
    </html>
  );
}
