import * as React from "react"
import { cn } from "../../shared/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-clay bg-slate-200/60 shadow-inner", className)}
      {...props}
    />
  )
}

export { Skeleton }
