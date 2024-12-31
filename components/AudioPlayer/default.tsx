"use client"
import { useEffect, useRef } from "react"
import { getVolume, setVolume } from "./functions"
import { useAtom } from "jotai"
import { currentPlaying } from "@/store"
import { useSession } from "next-auth/react"
export default function () {
  const audioRef = useRef<HTMLMediaElement>(null)
  const [currentTrack] = useAtom(currentPlaying)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user.id !== currentTrack?.userId) {
      return 
    }

    const audio: any = audioRef.current
    if (audio) {
      const handleLoadedMetadata = () => {
        audio?.play()
      };
      const volume = getVolume()
      if (typeof volume === 'number' && isFinite(volume)) {
        audio.volume = volume
      }
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentTrack])

  return <>{currentTrack ? (
    <div className="w-full p-4 py-5 bg-slate-50 border-t flex items-center justify-center gap-64 fixed bottom-0 left-0 ">
      <audio 
        ref={audioRef} 
        controls 
        src={"/uploads/" + currentTrack.song} 
        onVolumeChange={setVolume}
        className="w-1/3 scale-125"
      ></audio>
    </div>
  ) : null}</>
}