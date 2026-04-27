import * as React from "react"
import { LucideIcon, LucideProps } from "lucide-react"
import { cn } from "../../shared/utils"

export interface IconProps extends LucideProps {
  icon: LucideIcon
  variant?: "default" | "primary" | "secondary" | "accent" | "destructive" | "white"
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, variant = "default", className, ...props }, ref) => {
    const colorClasses = {
      default: "text-slate-600",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      destructive: "text-destructive",
      white: "text-white"
    }

    return (
      <IconComponent
        ref={ref}
        className={cn("w-5 h-5", colorClasses[variant], className)}
        {...props}
      />
    )
  }
)
Icon.displayName = "Icon"

export { Icon }
