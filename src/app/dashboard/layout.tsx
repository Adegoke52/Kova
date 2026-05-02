"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Star, 
  UserCircle,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Reviews", href: "/dashboard/reviews", icon: Star },
    { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
  ];

  const botNumber = process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || "+14155238886";
  const whatsappUrl = `https://wa.me/${botNumber.replace("+", "")}?text=invoice`;

  return (
    <div className="min-h-screen bg-kova-mist/20 pb-32 md:pb-0 md:pl-64">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-kova-mist fixed left-0 top-0 h-full p-6">
        <div className="mb-10 px-2">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image src="/Logo.png" alt="Kova" fill className="object-contain" />
            </div>
            <h2 className="text-2xl font-black text-kova-navy">Kova</h2>
          </Link>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all",
                  isActive 
                    ? "bg-kova-navy text-kova-white shadow-lg shadow-kova-navy/20" 
                    : "text-kova-subtle hover:bg-kova-mist hover:text-kova-navy"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-6 max-w-5xl mx-auto">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-kova-mist px-6 py-4 flex justify-between items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
              <Icon className={cn("w-6 h-6", isActive ? "text-kova-navy" : "text-kova-subtle")} />
              <span className={cn("text-[10px] font-bold uppercase tracking-wider", isActive ? "text-kova-navy" : "text-kova-subtle")}>
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Floating Action Button */}
        <Link 
          href={whatsappUrl}
          target="_blank"
          className="relative -mt-12 bg-kova-navy text-white p-4 rounded-2xl shadow-xl shadow-kova-navy/30 active:scale-90 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </Link>

        {navItems.slice(2, 4).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
              <Icon className={cn("w-6 h-6", isActive ? "text-kova-navy" : "text-kova-subtle")} />
              <span className={cn("text-[10px] font-bold uppercase tracking-wider", isActive ? "text-kova-navy" : "text-kova-subtle")}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
