import * as React from "react"
import { cn } from "../../shared/utils"

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function CardHeader({ title, description, icon, action, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between p-4 border-b-2 border-slate-100 dark:border-slate-700", className)} {...props}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{title}</h3>
          {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
