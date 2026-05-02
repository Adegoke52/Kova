"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Users, Phone, Calendar, MoreVertical, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ClientsPage() {
  const clients = [
    { id: "1", name: "Tunde Olowo", phone: "+234 801 234 5678", invoices: 5, totalPaid: 75000, lastJob: "2026-05-01" },
    { id: "2", name: "Sarah Johnson", phone: "+234 701 987 6543", invoices: 2, totalPaid: 45000, lastJob: "2026-04-28" },
    { id: "3", name: "Adebayo Mike", phone: "+234 812 333 4455", invoices: 1, totalPaid: 8500, lastJob: "2026-04-30" },
    { id: "4", name: "Chioma Okoro", phone: "+234 905 555 6677", invoices: 8, totalPaid: 124000, lastJob: "2026-04-25" },
    { id: "5", name: "Bello Hassan", phone: "+234 803 111 2233", invoices: 3, totalPaid: 36000, lastJob: "2026-04-20" },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-black text-kova-navy">Clients</h2>
        <p className="text-kova-subtle text-sm">Your customer directory and history</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map((client, idx) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="p-6 hover:border-kova-purple transition-colors relative group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-kova-mist rounded-full flex items-center justify-center text-xl font-black text-kova-navy">
                    {client.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-kova-navy text-lg">{client.name}</h3>
                    <p className="text-kova-subtle text-xs flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {client.phone}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-kova-mist rounded-xl transition-colors">
                  <MoreVertical className="w-5 h-5 text-kova-subtle" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 border-y border-kova-mist">
                <div className="text-center">
                  <p className="text-[8px] font-bold text-kova-subtle uppercase tracking-widest mb-1">Invoices</p>
                  <p className="font-black text-kova-navy">{client.invoices}</p>
                </div>
                <div className="text-center border-x border-kova-mist">
                  <p className="text-[8px] font-bold text-kova-subtle uppercase tracking-widest mb-1">Total Paid</p>
                  <p className="font-black text-kova-green">{formatCurrency(client.totalPaid)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-bold text-kova-subtle uppercase tracking-widest mb-1">Last Job</p>
                  <p className="font-black text-kova-navy text-[10px]">{formatDate(client.lastJob).split(' ')[0]} {formatDate(client.lastJob).split(' ')[1]}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Link href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`} target="_blank" className="flex-1">
                  <button className="w-full py-3 bg-kova-mist text-kova-navy rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-kova-purple/10 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </button>
                </Link>
                <button className="flex-1 py-3 border border-kova-mist text-kova-subtle rounded-xl text-xs font-bold hover:bg-kova-mist transition-colors">
                  History
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="py-20 text-center">
          <Users className="w-12 h-12 text-kova-mist mx-auto mb-4" />
          <p className="text-kova-subtle font-bold">No clients yet</p>
          <p className="text-kova-subtle/60 text-sm">Send your first invoice to add a client automatically</p>
        </div>
      )}
    </div>
  );
}
