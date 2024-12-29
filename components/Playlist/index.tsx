"use client";
import useSocket from "@/hooks/useSocket"
import { Card, Info } from "@/components/Track"
import { Button } from "../ui/button"
import { StepForward } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Playlist({ playlist, className }: { playlist: any[], className?: string }) {
  const { setTrack } = useSocket()
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()

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
        <h1 className="text-sm font-bold my-3 p-1 px-2 bg-black text-white inline-block rounded-lg">Your Playlist</h1>
          <Button variant={"outline"} onClick={handleCreateRoom}>
            Create Room
            <StepForward />
          </Button>
      </div>
      {playlist.map((song: any, index: number) => (
        <div className="cursor-pointer" key={index} onClick={() => setTrack(song)}>
          <Card trackId={song.id}>
            <Info song={song} />
          </Card>
        </div>
      ))}
    </section>
  );
}
