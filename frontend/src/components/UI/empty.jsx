import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

function Empty({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 p-6 text-center",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col items-center gap-2 text-center", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "flex items-center justify-center mb-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted flex size-10 items-center justify-center rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }) {
  return (
    <div
      className={cn("text-lg font-medium", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }) {
  return (
    <div
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col items-center gap-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}