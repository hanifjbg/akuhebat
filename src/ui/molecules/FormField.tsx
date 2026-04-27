import * as React from "react"
import { Label } from "../atoms/Label"
import { Input, InputProps } from "../atoms/Input"
import { cn } from "../../shared/utils"

export interface FormFieldProps extends InputProps {
  label: string
  error?: string
  id: string
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className={cn("space-y-2 w-full", className)}>
        <Label htmlFor={id} className={cn(error && "text-destructive dark:text-red-400")}>
          {label}
        </Label>
        <Input
          id={id}
          ref={ref}
          isError={!!error}
          className={cn(error && "dark:bg-red-400/10")}
          {...props}
        />
        {error && (
          <p className="text-sm font-medium text-destructive dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = "FormField"
