"use client"
import { Song } from "@/types"
import { Play } from "lucide-react"
import { currentPlaying } from "@/store"
import { useAtom } from "jotai"
export default function TrackCard({ song }: {song: Song}){
  const [currentTrack,] = useAtom(currentPlaying)
  
  const activeCard = () => {
    if (currentTrack?.id == song.id) {
      return "bg-black *:text-white"
    }
  }

  return (
    <div className={`border-b rounded p-2 px-4 hover:bg-gray-100 ${activeCard}`}>
      <div className="flex items-center gap-4">
        <Play />
        <div>
          <p className="font-bold">{song.name}</p>
          <div className="flex gap-1">
          <span className="text-xs">{song.artist}</span>
          {
            song.featurings && <div className="text-xs">Feat: {song.featurings}</div>
          }
          </div>
        </div>
      </div>
    </div>
  )
}