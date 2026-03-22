import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "../../lib/utils"

function Drawer(props) {
  return <DrawerPrimitive.Root {...props} />
}

function DrawerTrigger(props) {
  return <DrawerPrimitive.Trigger {...props} />
}

function DrawerPortal(props) {
  return <DrawerPrimitive.Portal {...props} />
}

function DrawerClose(props) {
  return <DrawerPrimitive.Close {...props} />
}

function DrawerOverlay({ className, ...props }) {
  return (
    <DrawerPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      {...props}
    />
  )
}

function DrawerContent({ className, children, ...props }) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          "bg-background fixed z-50 flex flex-col w-full bottom-0 rounded-t-lg border p-4",
          className
        )}
        {...props}
      >
        <div className="mx-auto mb-2 h-1.5 w-16 bg-muted rounded-full" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col gap-1 p-2 text-center", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }) {
  return (
    <DrawerPrimitive.Title
      className={cn("font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}