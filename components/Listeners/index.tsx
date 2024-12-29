"use client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ListenerUser } from "@/types"

export default function({ listeners }: { listeners: ListenerUser[] }) {
  return (
    <div className="flex flex-wrap gap-2 max-w-[250px]">
      {listeners.map((user: ListenerUser) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{ user.name[0].toUpperCase() }</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{user.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}