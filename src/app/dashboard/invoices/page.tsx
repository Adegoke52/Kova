"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Clock,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const invoices: any[] = [];

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.client.toLowerCase().includes(search.toLowerCase()) || 
                         inv.number.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "ALL" || inv.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-black text-kova-navy">Invoices</h2>
        <p className="text-kova-subtle text-sm">Manage and track your payments</p>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kova-subtle" />
          <input
            type="text"
            placeholder="Search by client or invoice #"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-kova-mist outline-none focus:border-kova-purple transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {["ALL", "UNPAID", "PAYMENT_CLAIMED", "PAID", "OVERDUE"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider",
                filter === f 
                  ? "bg-kova-navy text-white shadow-md" 
                  : "bg-white text-kova-subtle border border-kova-mist"
              )}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Invoice List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredInvoices.map((invoice, idx) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-4 hover:border-kova-purple transition-colors group">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-kova-mist rounded-2xl flex flex-col items-center justify-center">
                      <span className="text-[8px] font-bold text-kova-subtle uppercase">{formatDate(invoice.date).split(' ')[1]}</span>
                      <span className="text-sm font-black text-kova-navy">{formatDate(invoice.date).split(' ')[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-kova-navy">{invoice.client}</p>
                        {invoice.opened && (
                          <div className="w-1.5 h-1.5 rounded-full bg-kova-purple animate-pulse" title="Opened by client" />
                        )}
                      </div>
                      <p className="text-kova-subtle text-[10px] uppercase font-bold tracking-widest">{invoice.number}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-right">
                    <div className="hidden sm:block">
                      <p className="font-black text-kova-navy text-lg">{formatCurrency(invoice.amount)}</p>
                      <Badge variant={invoice.status.toLowerCase() as any} className="mt-1">
                        {invoice.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="sm:hidden">
                      <p className="font-black text-kova-navy">{formatCurrency(invoice.amount)}</p>
                    </div>
                    <button className="p-2 hover:bg-kova-mist rounded-xl transition-colors">
                      <MoreVertical className="w-5 h-5 text-kova-subtle" />
                    </button>
                  </div>
                </div>

                {/* Quick Actions (Desktop Hover / Mobile Expanded) */}
                <div className="mt-4 pt-4 border-t border-kova-mist flex gap-2 overflow-x-auto no-scrollbar">
                  {invoice.status === "PAYMENT_CLAIMED" && (
                    <Button variant="primary" className="py-2 px-4 text-xs h-9">
                      Confirm Payment
                    </Button>
                  )}
                  {invoice.status === "UNPAID" && (
                    <Button variant="outline" className="py-2 px-4 text-xs h-9 gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Remind
                    </Button>
                  )}
                  <Button variant="secondary" className="py-2 px-4 text-xs h-9 gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Page
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="py-20 text-center">
          <FileText className="w-12 h-12 text-kova-mist mx-auto mb-4" />
          <p className="text-kova-subtle font-bold">No invoices found</p>
          <p className="text-kova-subtle/60 text-sm">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
