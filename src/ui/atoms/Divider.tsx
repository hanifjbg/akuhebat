import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "../../shared/utils"

const Divider = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-slate-200 shadow-sm border-b border-white",
      orientation === "horizontal" ? "h-[2px] w-full" : "h-full w-[2px]",
      className
    )}
    {...props}
  />
))
Divider.displayName = SeparatorPrimitive.Root.displayName

export { Divider }
