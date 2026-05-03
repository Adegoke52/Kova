"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ReviewsPage() {
  const reviews: any[] = [];

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-black text-kova-navy">Reviews</h2>
        <p className="text-kova-subtle text-sm">Your transaction-backed reputation</p>
      </header>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-bold text-kova-subtle uppercase tracking-widest mb-2">Overall Rating</p>
          <div className="text-6xl font-black text-kova-navy mb-4">{averageRating}</div>
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={cn("w-6 h-6", s <= Math.round(Number(averageRating)) ? "fill-kova-purple text-kova-purple" : "text-kova-mist fill-kova-mist")} />
            ))}
          </div>
          <p className="text-xs text-kova-subtle font-bold uppercase tracking-widest">{reviews.length} Verified Reviews</p>
        </Card>

        <Card className="p-8 space-y-3">
          {[5, 4, 3, 2, 1].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="text-xs font-bold text-kova-navy w-4">{s}★</span>
              <div className="flex-1 h-2 bg-kova-mist rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(ratingCounts[s as keyof typeof ratingCounts] / reviews.length) * 100}%` }}
                  className="h-full bg-kova-purple"
                />
              </div>
              <span className="text-[10px] font-bold text-kova-subtle w-8">{ratingCounts[s as keyof typeof ratingCounts]}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h3 className="font-bold text-kova-navy">Latest Feedback</h3>
        <div className="space-y-4">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-kova-mist rounded-full flex items-center justify-center text-[10px] font-black text-kova-navy">
                      {review.client.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-kova-navy text-sm">{review.client}</p>
                      <p className="text-kova-subtle text-[10px] uppercase font-bold tracking-widest">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={cn("w-3 h-3", s <= review.rating ? "fill-kova-purple text-kova-purple" : "text-kova-mist fill-kova-mist")} />
                    ))}
                  </div>
                </div>
                {review.comment && (
                  <p className="text-kova-body text-sm leading-relaxed">
                    "{review.comment}"
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
