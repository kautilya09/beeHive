import { useMemo } from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Label } from "./label"
import { Separator } from "./separator"

function FieldSet({ className, ...props }) {
  return (
    <fieldset className={cn("flex flex-col gap-6", className)} {...props} />
  )
}

function FieldLegend({ className, variant = "legend", ...props }) {
  return (
    <legend
      className={cn(
        "mb-3 font-medium",
        variant === "legend" ? "text-base" : "text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props} />
  )
}

const fieldVariants = cva("flex w-full gap-3", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-center",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

function Field({ className, orientation = "vertical", ...props }) {
  return (
    <div
      role="group"
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props} />
  )
}

function FieldLabel({ className, ...props }) {
  return (
    <Label
      className={cn("flex items-center gap-2 text-sm", className)}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }) {
  return (
    <div className={cn("text-sm font-medium", className)} {...props} />
  )
}

function FieldDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldSeparator({ children, className, ...props }) {
  return (
    <div className={cn("relative my-2", className)} {...props}>
      <Separator />
      {children && (
        <span className="bg-background text-muted-foreground px-2 text-sm">
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({ className, children, errors, ...props }) {
  const content = useMemo(() => {
    if (children) return children
    if (!errors) return null

    if (errors.length === 1) {
      return errors[0]?.message
    }

    return (
      <ul className="ml-4 list-disc">
        {errors.map(
          (error, i) =>
            error?.message && <li key={i}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) return null

  return (
    <div
      role="alert"
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}