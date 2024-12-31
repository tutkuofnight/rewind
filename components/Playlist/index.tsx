"use client"
import useSocket from "@/hooks/useSocket"
import { Card, Info } from "@/components/Track"
import { Button } from "../ui/button"
import { StepForward } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Song } from "@/types"

export default function Playlist({ playlist, className, playlistName }: { playlist: Song[], className?: string, playlistName?: string }) {
  const { setTrack } = useSocket()
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  
  const handleCreateRoom = () => {
    const link = window.location.origin + "/app/join/" + session?.user.id
    window.navigator.clipboard.writeText(link)
    toast({
      title: "Invite link copied to clipboard!",
      duration: 2000
    })
    router.push("/app/room/" + session?.user.id)
  }


  return (
    <section className={className}>
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-bold my-3 p-1 px-2 bg-black text-white inline-block rounded-lg">{playlistName ? playlistName : "Your Playlist"}</h1>
          { !pathname.includes("room") && <Button variant={"outline"} onClick={handleCreateRoom}>
            Create Room
            <StepForward />
          </Button> }
      </div>
      {playlist.map((song: any, index: number) => (
        <div className="cursor-pointer" key={index} onClick={() => setTrack(song)}>
          <Card trackId={song.id}>
            <Info song={song} />
          </Card>
        </div>
      ))}
      { !playlist && <p>You don't have any uploaded songs your playlist. Please upload before </p> }
    </section>
  );
}
