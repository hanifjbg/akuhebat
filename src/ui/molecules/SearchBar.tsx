import * as React from "react"
import { Search } from "lucide-react"
import { Input, InputProps } from "../atoms/Input"
import { cn } from "../../shared/utils"

export interface SearchBarProps extends InputProps {}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("relative w-full max-w-sm", className)}>
        <Input
          ref={ref}
          className="pl-10 rounded-clay shadow-inner bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
          type="search"
          {...props}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"
