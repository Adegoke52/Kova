import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "unpaid" | "claimed" | "paid" | "overdue" | "default";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-kova-mist text-kova-subtle",
    unpaid: "bg-amber-100 text-amber-700",
    claimed: "bg-kova-purple/10 text-kova-purple",
    paid: "bg-kova-green/10 text-kova-green",
    overdue: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
