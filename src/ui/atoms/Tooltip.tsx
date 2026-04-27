import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../shared/utils"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipBase = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-clay-sm border-2 border-white bg-slate-800 px-3 py-1.5 text-sm font-bold text-slate-50 shadow-clay-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Convenience wrapper for simpler usage
export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  content: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
}

function Tooltip({ children, content, contentClassName, ...props }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <TooltipBase {...props}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className={contentClassName}>
          {content}
        </TooltipContent>
      </TooltipBase>
    </TooltipProvider>
  )
}

export { Tooltip, TooltipProvider, TooltipBase, TooltipTrigger, TooltipContent }
