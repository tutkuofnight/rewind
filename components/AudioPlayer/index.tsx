"use client"
import { useEffect, useRef, useState } from "react"
import useSocket from "@/hooks/useSocket"
import { Play, Pause } from "lucide-react"
import { Slider } from "antd"

export default function () {
  const [playerDuration, setPlayerDuration] = useState<number>(0)
  const audioRef = useRef<HTMLMediaElement>(null)
  const { playMusic, pauseMusic, timeSeeked, audioPlayerState, currentTrack } = useSocket()

  useEffect(() => {
    const audio: any = audioRef.current
    if (audio) {
      audioRef.current?.focus()

      const handleLoadedMetadata = (e: any) => {
        console.log(e)
        const audio = audioRef.current;
        audio?.play()
      };
  
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', (e: any) => setPlayerDuration(e.target.currentTime))
      audio.addEventListener('play', () => playMusic())
      audio.addEventListener('pause', () => pauseMusic())
      audio.addEventListener('seeked', (e: any) => timeSeeked(e.target.currentTime))
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      if(audioPlayerState?.isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [audioPlayerState?.isPlaying])

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = audioPlayerState?.timeSeeked
  //   }
  // }, [audioPlayerState?.timeSeeked])

  return <>{currentTrack ? (
    <div>
      <Slider defaultValue={0} max={audioRef.current?.duration} step={0.000001} value={playerDuration} />
      <audio ref={audioRef} controls src={"uploads/" + currentTrack.song}></audio>
      <button onClick={() => playMusic()}>
        <Play />
      </button>
      <button onClick={() => pauseMusic()}>
        <Pause />
      </button>
    </div>
  ) : null}</>
}
