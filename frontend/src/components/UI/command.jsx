import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./command"

function Command({ className, ...props }) {
  return (
    <CommandPrimitive
      className={cn(
        "bg-popover text-popover-foreground flex w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search...",
  children,
  className,
  ...props
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <DialogContent className={cn("p-0 overflow-hidden", className)}>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({ className, ...props }) {
  return (
    <div className="flex items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 opacity-50" />
      <CommandPrimitive.Input
        className={cn(
          "w-full bg-transparent text-sm outline-none",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }) {
  return (
    <CommandPrimitive.List
      className={cn("max-h-[300px] overflow-y-auto", className)}
      {...props}
    />
  )
}

function CommandEmpty(props) {
  return (
    <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
  )
}

function CommandGroup({ className, ...props }) {
  return (
    <CommandPrimitive.Group
      className={cn("p-1 text-sm", className)}
      {...props}
    />
  )
}

function CommandItem({ className, ...props }) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer rounded-sm",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({ className, ...props }) {
  return (
    <CommandPrimitive.Separator
      className={cn("bg-border h-px", className)}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }) {
  return (
    <span
      className={cn("ml-auto text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}