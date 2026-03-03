import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors";
    const styles =
      variant === "outline"
        ? "border-border text-foreground bg-transparent"
        : "border-transparent bg-primary text-primary-foreground";

    return <div ref={ref} className={cn(base, styles, className)} {...props} />;
  },
);

Badge.displayName = "Badge";

