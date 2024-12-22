"use client"
import { useEffect } from "react"
import io from "socket.io-client" 

import { currentPlaying, playerState } from "@/store"
import { useAtom } from "jotai"

const socket = io("ws://localhost:3001");

const useSocket = () => {
  const [currentTrack, setCurrentTrack] = useAtom(currentPlaying)
  const [, setAudioPlayerState] = useAtom(playerState)
  useEffect(() => {
    socket.on("set", (data) => {
      setCurrentTrack(data.song)
    })
    socket.on("play", (data) => {
      console.log(data.state)
      setAudioPlayerState({ isPlaying: data.state })
    })
    socket.on("pause", (data) => {
      console.log(data.state)
      setAudioPlayerState({ isPlaying: data.state })
    })
  }, [])

  const setTrack = (song: any) => {
    socket.emit("set", { song })
    setCurrentTrack(song)
    playMusic(true)
  }

  const playMusic = (state: boolean) => {
    socket.emit("play", { state })
    setAudioPlayerState({ isPlaying: state })
  }

  const pauseMusic = (state: boolean) => {
    socket.emit("pause", { state })
    setAudioPlayerState({ isPlaying: state })
  }

  return { setTrack, playMusic, pauseMusic, currentTrack }
}

export default useSocket
