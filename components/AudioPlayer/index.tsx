"use client"
import { useEffect, useRef } from "react"
import { useAtom } from "jotai"
import { currentPlaying } from "@/store"

export default function () {
  const [currentTrack, setCurrentTrack] = useAtom(currentPlaying)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    const audio: any = audioRef.current
    if (audio) {
      const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        audio?.play()
      };
  
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentTrack])
  return <>{currentTrack ? <audio ref={audioRef} controls src={"uploads/" + currentTrack.song}></audio> : null}</>
}
