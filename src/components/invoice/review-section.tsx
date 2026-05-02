"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReviewSectionProps {
  invoice: {
    id: string;
    business: {
      name: string;
    };
    review?: {
      rating: number;
      comment?: string;
    };
  };
}

export function ReviewSection({ invoice }: ReviewSectionProps) {
  const [rating, setRating] = useState(invoice.review?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(invoice.review?.comment || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(!!invoice.review);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    // In production, this would call /api/reviews
    await new Promise(resolve => setTimeout(resolve, 1500));
    setHasSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <Card className="border-2 border-kova-mist overflow-hidden">
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {hasSubmitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    className={cn(
                      "w-6 h-6", 
                      s <= rating ? "fill-kova-purple text-kova-purple" : "text-kova-mist"
                    )} 
                  />
                ))}
              </div>
              <h3 className="text-xl font-bold text-kova-navy">Review Submitted</h3>
              <p className="text-kova-subtle text-sm mt-1">
                Your feedback helps {invoice.business.name} grow. Thank you!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-lg font-bold text-kova-navy">Rate your experience</h3>
                <p className="text-kova-subtle text-sm">How was your job with {invoice.business.name}?</p>
              </div>

              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onMouseEnter={() => setHoveredRating(s)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(s)}
                    className="p-1 transition-transform active:scale-90"
                  >
                    <Star
                      className={cn(
                        "w-10 h-10 transition-colors",
                        (hoveredRating || rating) >= s
                          ? "fill-kova-purple text-kova-purple"
                          : "text-kova-mist fill-kova-mist"
                      )}
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <p className="label-kova">Optional Comment</p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience (max 200 chars)"
                  maxLength={200}
                  className="w-full bg-kova-mist rounded-2xl p-4 text-sm text-kova-navy placeholder:text-kova-subtle min-h-[100px] border-2 border-transparent focus:border-kova-purple transition-all outline-none resize-none"
                />
              </div>

              <Button
                className="w-full"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                disabled={rating === 0}
              >
                Submit Review
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
