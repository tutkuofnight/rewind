"use client"
import { useEffect, useRef, useState } from "react"
import useSocket from "@/hooks/useSocket"
// import { Play, Pause } from "lucide-react"
import { getVolume, setVolume } from "./functions"

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
      // audio.addEventListener('timeupdate', (e: any) => setPlayerDuration(e.target.currentTime))
      audio.addEventListener('play', playMusic)
      audio.addEventListener('pause', pauseMusic)
      audio.addEventListener('seeked', () => timeSeeked(audioRef.current?.currentTime))
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      if(audioPlayerState?.isPlaying) {
        const volume = getVolume()
        if (typeof volume === 'number' && isFinite(volume)) {
          audioRef.current.volume = volume
        }
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [audioPlayerState?.isPlaying])

  useEffect(() => {
    if (typeof audioPlayerState?.currentTime === 'number' && isFinite(audioPlayerState.currentTime)) {
      if (audioRef.current) {
        audioRef.current.currentTime = audioPlayerState.currentTime
      }
    }
  }, [audioPlayerState?.currentTime])

  return <>{currentTrack ? (
    <div className="w-full p-4 py-5 bg-slate-50 border-t flex items-center justify-center fixed bottom-0 left-0">
      {/* <Slider defaultValue={0} max={audioRef.current?.duration} step={0.000001} value={playerDuration} /> */}
      <audio 
        ref={audioRef} 
        controls 
        src={"uploads/" + currentTrack.song} 
        onVolumeChange={setVolume}
        className="w-1/3 scale-125"
        ></audio>
      {/* <button onClick={() => playMusic()}>
        <Play />
      </button>
      <button onClick={() => pauseMusic()}>
        <Pause />
      </button> */}
    </div>
  ) : null}</>
}