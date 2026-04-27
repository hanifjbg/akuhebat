import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../shared/utils"
import { Spinner } from "./Spinner"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-clay text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-clay-sm hover:shadow-clay-md active:shadow-clay-pressed border-2 border-white/20",
        secondary:
          "bg-secondary text-secondary-foreground shadow-clay-sm hover:shadow-clay-md active:shadow-clay-pressed border-2 border-white/20",
        destructive:
          "bg-destructive text-destructive-foreground shadow-clay-sm hover:shadow-clay-md active:shadow-clay-pressed border-2 border-white/20",
        accent:
          "bg-accent text-accent-foreground shadow-clay-sm hover:shadow-clay-md active:shadow-clay-pressed border-2 border-white/20",
        outline:
          "border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm active:shadow-clay-pressed",
        ghost: "hover:bg-slate-100 text-slate-600 active:scale-95 transition-transform",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2 text-base",
        sm: "h-9 rounded-clay-sm px-4 text-sm",
        lg: "h-14 rounded-clay px-8 text-lg",
        icon: "h-12 w-12 rounded-full",
      },
      state: {
        idle: "",
        loading: "cursor-wait",
        error: "border-destructive text-destructive bg-destructive/10 shadow-none",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "idle",
    },
  }
)

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  isError?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, state, isLoading, isError, children, disabled, ...props }, ref) => {
    
    let computedState = state;
    if (isLoading) computedState = "loading";
    if (isError) computedState = "error";

    return (
      <motion.button
        ref={ref}
        whileHover={computedState === "idle" && !disabled ? { scale: 1.02 } : {}}
        whileTap={computedState === "idle" && !disabled ? { scale: 0.95 } : {}}
        className={cn(buttonVariants({ variant, size, state: computedState, className }))}
        disabled={disabled || computedState === "loading"}
        {...(props as any)}
      >
        {computedState === "loading" && (
          <Spinner className="mr-2 h-4 w-4" color={variant === "outline" || variant === "ghost" ? "current" : "white"} />
        )}
        {children}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
