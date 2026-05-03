"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Send, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [items, setItems] = useState([{ name: "", amount: "" }]);

  const addItem = () => {
    setItems([...items, { name: "", amount: "" }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: "name" | "amount", value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const total = items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

  const handleCreate = async () => {
    if (!clientName || !clientPhone || items.some(i => !i.name || !i.amount)) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    // In production, this would call /api/invoices/create
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    router.push("/dashboard/invoices");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Link href="/dashboard/invoices" className="flex items-center gap-2 text-kova-subtle hover:text-kova-navy font-bold transition-colors">
        <ChevronLeft className="w-5 h-5" />
        Back to Invoices
      </Link>

      <header>
        <h2 className="text-3xl font-black text-kova-navy">Create Manual Invoice</h2>
        <p className="text-kova-subtle font-medium">Draft a professional invoice for your client</p>
      </header>

      <div className="space-y-6">
        {/* Client Info */}
        <Card className="p-8 border-none shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-kova-subtle mb-6">Client Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-kova-navy uppercase tracking-wider">Client Name</label>
              <Input 
                placeholder="e.g. John Doe" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="h-14 rounded-2xl bg-kova-mist/50 border-none focus:bg-white transition-all font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-black text-kova-navy uppercase tracking-wider">Phone Number</label>
              <Input 
                placeholder="e.g. 234..." 
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="h-14 rounded-2xl bg-kova-mist/50 border-none focus:bg-white transition-all font-bold"
              />
            </div>
          </div>
        </Card>

        {/* Line Items */}
        <Card className="p-8 border-none shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-kova-subtle">Line Items</h3>
            <button 
              onClick={addItem}
              className="p-2 bg-kova-mist text-kova-navy rounded-xl hover:bg-kova-navy hover:text-white transition-all active:scale-90"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-4 items-end"
                >
                  <div className="flex-1 space-y-1.5">
                    {index === 0 && <label className="text-[10px] font-black text-kova-subtle uppercase">Description</label>}
                    <Input 
                      placeholder="Service name" 
                      value={item.name}
                      onChange={(e) => updateItem(index, "name", e.target.value)}
                      className="h-14 rounded-2xl bg-kova-mist/30 border-none focus:bg-white transition-all font-bold"
                    />
                  </div>
                  <div className="w-32 space-y-1.5">
                    {index === 0 && <label className="text-[10px] font-black text-kova-subtle uppercase">Amount</label>}
                    <Input 
                      type="number"
                      placeholder="0" 
                      value={item.amount}
                      onChange={(e) => updateItem(index, "amount", e.target.value)}
                      className="h-14 rounded-2xl bg-kova-mist/30 border-none focus:bg-white transition-all font-bold"
                    />
                  </div>
                  {items.length > 1 && (
                    <button 
                      onClick={() => removeItem(index)}
                      className="mb-3 p-3 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-8 border-t border-kova-mist flex justify-between items-center">
            <p className="text-lg font-bold text-kova-navy">Grand Total</p>
            <p className="text-3xl font-black text-kova-navy">₦{total.toLocaleString()}</p>
          </div>
        </Card>

        <Button 
          onClick={handleCreate}
          isLoading={loading}
          className="w-full h-16 rounded-2xl bg-kova-navy text-white font-black text-lg flex gap-3 shadow-2xl shadow-kova-navy/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Send className="w-5 h-5" />
          Create & Send Invoice
        </Button>
      </div>
    </div>
  );
}
