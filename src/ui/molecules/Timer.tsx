import * as React from "react"
import { Timer as TimerIcon } from "lucide-react"
import { cn } from "../../shared/utils"

export interface TimerProps {
  seconds: number
  maxSeconds?: number
  className?: string
  dangerThreshold?: number
}

export function Timer({ seconds, maxSeconds, dangerThreshold = 10, className }: TimerProps) {
  const isDanger = seconds <= dangerThreshold;
  
  // Format MM:SS
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const progress = maxSeconds ? (seconds / maxSeconds) * 100 : 100;

  return (
    <div className={cn(
      "flex items-center gap-3 bg-white dark:bg-slate-800 rounded-clay-sm px-4 py-2 border-2 shadow-clay-sm",
      isDanger ? "border-destructive text-destructive" : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200",
      className
    )}>
      <TimerIcon className={cn("w-5 h-5", isDanger && "animate-pulse")} />
      <span className="font-mono font-bold text-lg tabular-nums tracking-wider">{formatted}</span>
    </div>
  )
}
