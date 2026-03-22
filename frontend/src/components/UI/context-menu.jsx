import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "../../lib/utils"

function ContextMenu(props) {
  return <ContextMenuPrimitive.Root {...props} />
}

function ContextMenuTrigger(props) {
  return <ContextMenuPrimitive.Trigger {...props} />
}

function ContextMenuGroup(props) {
  return <ContextMenuPrimitive.Group {...props} />
}

function ContextMenuPortal(props) {
  return <ContextMenuPrimitive.Portal {...props} />
}

function ContextMenuSub(props) {
  return <ContextMenuPrimitive.Sub {...props} />
}

function ContextMenuRadioGroup(props) {
  return <ContextMenuPrimitive.RadioGroup {...props} />
}

function ContextMenuSubTrigger({ className, inset, children, ...props }) {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(
        "flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({ className, ...props }) {
  return (
    <ContextMenuPrimitive.SubContent
      className={cn("bg-popover rounded-md border p-1 shadow", className)}
      {...props}
    />
  )
}

function ContextMenuContent({ className, ...props }) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn("bg-popover rounded-md border p-1 shadow", className)}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({ className, inset, ...props }) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 pl-8 text-sm",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({ className, children, ...props }) {
  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 pl-8 text-sm",
        className
      )}
      {...props}
    >
      <span className="absolute left-2">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({ className, inset, ...props }) {
  return (
    <ContextMenuPrimitive.Label
      className={cn(
        "px-2 py-1.5 text-sm font-medium",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({ className, ...props }) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn("bg-border h-px my-1", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({ className, ...props }) {
  return (
    <span
      className={cn("ml-auto text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}