import { Bell, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

export function Header() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="relative text-muted-foreground hover:text-foreground"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        <span className="sr-only">Notifications</span>
      </Button>

          <Button
            onClick={()=> navigate("/settings")}
            variant="ghost"
            className="flex items-center gap-3 px-2 hover:bg-secondary"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="hidden flex-col items-start sm:flex">
              <span className="text-sm font-medium text-foreground">
                John Doe
              </span>
              <span className="text-xs text-muted-foreground">Student</span>
            </div>
            <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
          </Button>
    </div>
  )
}