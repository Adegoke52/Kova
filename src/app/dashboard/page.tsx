"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Send,
  Zap
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Mon", revenue: 45000 },
  { name: "Tue", revenue: 52000 },
  { name: "Wed", revenue: 48000 },
  { name: "Thu", revenue: 61000 },
  { name: "Fri", revenue: 55000 },
  { name: "Sat", revenue: 67000 },
  { name: "Sun", revenue: 72000 },
];

const recentInvoices = [
  { id: "INV-001", client: "Tunde Olowo", amount: "₦45,000", status: "Paid", date: "2 mins ago" },
  { id: "INV-002", client: "Sarah Coker", amount: "₦12,500", status: "Pending", date: "1 hour ago" },
  { id: "INV-003", client: "Abuja Tech Hub", amount: "₦150,000", status: "Pending", date: "3 hours ago" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-black tracking-tight"
            style={{ color: '#1A1060' }}
          >
            Welcome back, Chef Ngozi! 👋
          </motion.h1>
          <p className="font-medium" style={{ color: '#666680' }}>Your business is growing. Here is what's happening.</p>
        </div>
        <Button 
          className="text-white h-12 px-6 rounded-2xl flex items-center gap-2 shadow-lg hover:opacity-90 transition-all"
          style={{ backgroundColor: '#1A1060' }}
        >
          <Send className="w-4 h-4" />
          Send New Invoice
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Revenue", value: "₦440,500", icon: TrendingUp, color: "#1D9E75", bg: "rgba(29, 158, 117, 0.1)", trend: "+12.5%" },
          { label: "Pending Claims", value: "₦162,500", icon: Clock, color: "#A855F7", bg: "rgba(168, 85, 247, 0.1)", trend: "4 invoices" },
          { label: "Avg. Client Rating", value: "4.9/5", icon: Star, color: "#1A1060", bg: "#EEEDFE", trend: "24 reviews" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-xl bg-white hover:scale-[1.02] transition-transform overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="p-3 rounded-2xl" 
                    style={{ backgroundColor: stat.bg, color: stat.color }}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge 
                    className="border-none font-bold text-[10px]"
                    style={{ backgroundColor: '#EEEDFE', color: '#1A1060' }}
                  >
                    {stat.trend}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#666680' }}>{stat.label}</p>
                  <h3 className="text-2xl font-black tracking-tight" style={{ color: '#1A1060' }}>{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="border-none shadow-xl shadow-kova-mist/40 bg-white h-full">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-kova-navy">Revenue Overview</h3>
                  <p className="text-xs text-kova-subtle font-bold">Past 7 days</p>
                </div>
                <div className="flex items-center gap-2 text-kova-green font-bold text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  14.2% from last week
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEEDFE" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "#666680", fontSize: 12, fontWeight: 700 }} 
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: "16px", 
                        border: "none", 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        padding: "12px 16px"
                      }}
                      itemStyle={{ fontWeight: "bold", color: "#1A1060" }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#A855F7" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorRev)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Invoices */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-none shadow-xl shadow-kova-mist/40 bg-white h-full">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-kova-navy">Recent activity</h3>
                <Button variant="ghost" className="text-[#A855F7] font-bold h-8 px-3 text-xs">View all</Button>
              </div>
              <div className="space-y-6">
                {recentInvoices.map((inv, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        inv.status === "Paid" ? "bg-kova-green/10 text-kova-green" : "bg-kova-mist text-kova-navy"
                      }`}>
                        {inv.client[0]}
                      </div>
                      <div>
                        <p className="font-bold text-kova-navy text-sm">{inv.client}</p>
                        <p className="text-[10px] text-kova-subtle font-bold uppercase tracking-widest">{inv.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-kova-navy text-sm">{inv.amount}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${
                        inv.status === "Paid" ? "text-kova-green" : "text-[#A855F7]"
                      }`}>
                        {inv.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
                {/* Dynamic Pricing AI - Feature #4 */}
                <div className="mt-12 p-8 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden group" style={{ backgroundColor: '#1A1060' }}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7] rounded-full blur-[60px] opacity-20 group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#A855F7]/20 rounded-xl flex items-center justify-center border border-[#A855F7]/30">
                      <Zap className="w-5 h-5 text-[#A855F7]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A855F7]">Dynamic Pricing AI</p>
                      <h4 className="text-sm font-black">High Demand in Lagos</h4>
                    </div>
                  </div>

                  <p className="text-xs font-medium leading-relaxed text-white/70">
                    Catering demand is peaking. Applying a <span className="text-[#A855F7] font-black">15% Weekend Surge</span> could increase your revenue by ₦18,500 this week.
                  </p>

                  <Button 
                    className="w-full h-12 rounded-xl font-black text-xs transition-all hover:scale-105"
                    style={{ backgroundColor: '#A855F7', color: '#FFFFFF' }}
                  >
                    Activate Surge Pricing
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-kova-green animate-pulse" />
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">AI analysis active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
  );
}
