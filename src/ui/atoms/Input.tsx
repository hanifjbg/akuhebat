import * as React from "react"
import { cn } from "../../shared/utils"
import { motion } from "framer-motion"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, ...props }, ref) => {
    return (
      <motion.input
        whileFocus={{ scale: 1.01 }}
        type={type}
        className={cn(
          "flex h-12 w-full rounded-clay-sm border-2 bg-white px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-inner",
          isError ? "border-destructive text-destructive focus-visible:ring-destructive focus-visible:border-destructive" : "border-slate-200 text-slate-900",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
