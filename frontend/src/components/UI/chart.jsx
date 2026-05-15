import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "../../lib/utils"

const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error("useChart must be used within ChartContainer")
  return context
}

function ChartContainer({ className, children, config, ...props }) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({ active, payload, className }) {
  if (!active || !payload?.length) return null

  return (
    <div
      className={cn(
        "bg-background border rounded-lg px-2 py-1 text-xs shadow",
        className
      )}
    >
      {payload.map((item) => (
        <div key={item.dataKey} className="flex justify-between gap-2">
          <span className="text-muted-foreground">{item.name}</span>
          <span className="font-medium">
            {item.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({ payload }) {
  if (!payload?.length) return null

  return (
    <div className="flex gap-4 justify-center pt-2">
      {payload.map((item) => (
        <div key={item.value} className="flex items-center gap-1">
          <div
            className="h-2 w-2 rounded"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-xs">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
}