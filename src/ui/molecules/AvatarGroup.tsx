import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar"
import { cn } from "../../shared/utils"

export interface AvatarGroupProps {
  avatars: { src?: string; fallback: string; alt?: string }[]
  max?: number
  className?: string
  size?: "sm" | "md" | "lg"
}

export function AvatarGroup({ avatars, max = 3, size = "md", className }: AvatarGroupProps) {
  const sizeClasses = {
    sm: "w-10 h-10 border-2",
    md: "w-14 h-14 border-4",
    lg: "w-16 h-16 border-4"
  }

  const visibleAvatars = avatars.slice(0, max)
  const excess = avatars.length - max

  return (
    <div className={cn("flex items-center -space-x-4", className)}>
      {visibleAvatars.map((av, i) => (
        <Avatar key={i} className={cn(sizeClasses[size], "hover:z-10 focus-within:z-10 transition-transform hover:scale-110")}>
          <AvatarImage src={av.src} alt={av.alt} />
          <AvatarFallback>{av.fallback}</AvatarFallback>
        </Avatar>
      ))}
      {excess > 0 && (
        <Avatar className={cn(sizeClasses[size], "hover:z-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300")}>
          <AvatarFallback className="text-sm font-bold bg-transparent">+{excess}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
