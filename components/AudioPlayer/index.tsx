"use client"
import { useEffect, useRef, useState } from "react"
import { useAtom } from "jotai"
import { currentPlaying, playerState } from "@/store"
import useSocket from "@/hooks/useSocket"
import { Play, Pause } from "lucide-react"

export default function () {
  const [currentTrack, setCurrentTrack] = useAtom(currentPlaying)
  const [state, setState] = useAtom(playerState)
  const [playerDuration, setPlayerDuration] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { playMusic, pauseMusic } = useSocket()

  useEffect(() => {
    const audio: any = audioRef.current
    if (audio) {
      audioRef.current?.focus()

      const handleLoadedMetadata = (e: any) => {
        console.log(e.target.duration)
        const audio = audioRef.current;
        audio?.play()
      };
  
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', (e: any) => setPlayerDuration(e.target.currentTime))
      audio.addEventListener('seeked', (e: any) => {
        if (audioRef.current){
          audioRef.current.currentTime = e.target.currentTime
        }
      })
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      if(state?.isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }

  }, [state?.isPlaying])

  return <>{currentTrack ? (
    <div>
      {/* <Slider defaultValue={0} max={audioRef.current?.duration} step={0.000001} value={playerDuration} onChange={(value) => {
        setPlayerDuration(value)
      }} /> */}
      <audio ref={audioRef} controls src={"uploads/" + currentTrack.song}></audio>
      <button onClick={() => playMusic(true)}>
        <Play />
      </button>
      <button onClick={() => pauseMusic(false)}>
        <Pause />
      </button>
    </div>
  ) : null}</>
}
