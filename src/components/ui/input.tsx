import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-[10px] font-semibold uppercase tracking-widest text-kova-subtle ml-1">
            {label}
          </label>
        )
        }
        <input
          type={type}
          className={cn(
            "flex w-full rounded-2xl bg-kova-mist px-4 py-4 text-base font-medium text-kova-navy ring-offset-white transition-all placeholder:text-kova-subtle/60 focus:bg-white focus:ring-2 focus:ring-kova-purple focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "ring-2 ring-red-500" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-red-500 ml-1 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
