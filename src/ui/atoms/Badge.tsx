import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../shared/utils"
import { motion } from "framer-motion"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-clay-sm",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-clay-sm",
        accent:
          "border-transparent bg-accent text-accent-foreground shadow-clay-sm",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-clay-sm",
        outline: "text-foreground border-slate-200 bg-white shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
      animatePulse?: boolean;
    }

function Badge({ className, variant, animatePulse, ...props }: BadgeProps) {
  if (animatePulse) {
    return (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
