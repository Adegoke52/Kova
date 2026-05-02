"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-kova-navy text-kova-white hover:bg-kova-purple",
      secondary: "bg-kova-mist text-kova-navy hover:bg-kova-purple/10",
      outline: "bg-transparent border-2 border-kova-navy text-kova-navy hover:bg-kova-navy hover:text-kova-white",
      ghost: "bg-transparent text-kova-navy hover:bg-kova-mist",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        disabled={disabled || isLoading}
        className={cn(
          "relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold premium-transition disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden",
          variants[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            />
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span className="relative z-10">{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
