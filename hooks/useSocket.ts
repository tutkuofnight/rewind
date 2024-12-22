"use client"
import { useEffect } from "react"
import io from "socket.io-client" 

import { currentPlaying, playerState } from "@/store"
import { useAtom } from "jotai"

const socket = io("ws://localhost:3001");

const useSocket = () => {
  const [currentTrack, setCurrentTrack] = useAtom(currentPlaying)
  const [audioPlayerState, setAudioPlayerState] = useAtom(playerState)
  useEffect(() => {
    socket.on("play", (data) => {
      setCurrentTrack(data.song)
    })
  }, [])

  const playMusic = (song: any) => {
    socket.emit("play", { song })
    setCurrentTrack(song)
  }

  return { playMusic, currentTrack }
}

export default useSocket
