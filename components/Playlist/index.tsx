"use client";
import useSocket from "@/hooks/useSocket"
import TrackCard from "@/components/TrackCard"
import { Button } from "../ui/button"
import { StepForward } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
export default function Playlist({ playlist }: { playlist: any[] }) {
  const { setTrack } = useSocket()
  const { data: session } = useSession()
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-bold my-3 p-1 px-2 bg-black text-white inline-block rounded-lg">Your Playlist</h1>
        <Link href={`/app/join/${session?.user.id}`}>
          <Button variant={"outline"}>
            Create Room
            <StepForward />
          </Button>
        </Link>
      </div>
      {playlist.map((song: any, index: number) => (
        <div className="cursor-pointer" key={index} onClick={() => setTrack(song)}>
          <TrackCard song={song} />
        </div>
      ))}
    </section>
  );
}
