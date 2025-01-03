"use client"
import { useEffect } from "react"
import io from "socket.io-client" 

import { currentPlaying, playerState, roomId } from "@/store"
import { useAtom } from "jotai"

const socket = io(process.env.NEXT_PUBLIC_WS_URL);

const useSocket = () => {
  const [currentTrack, setCurrentTrack] = useAtom(currentPlaying)
  const [audioPlayerState, setAudioPlayerState] = useAtom(playerState)
  
  useEffect(() => {
    socket.on("set", (data) => {
      setCurrentTrack(data.song)
    })
    socket.on("play", (data) => {
      setAudioPlayerState({ isPlaying: data.state })
    })
    socket.on("pause", (data) => {
      setAudioPlayerState({ isPlaying: data.state })
    })
    socket.on("timeSeeked", (data) => {
      setAudioPlayerState({ currentTime: data.duration })
    })
  }, [])

  const joinRoom = (data: { user: { name: string, image: string }, room: string }) => {
    socket.emit("join", { data })
  }

  const setTrack = (song: any) => {
    socket.emit("set", { song })
    setCurrentTrack(song)
    playMusic()
  }

  const playMusic = () => {
    socket.emit("play", { state: true })
    setAudioPlayerState({ isPlaying: true })
  }

  const pauseMusic = () => {
    socket.emit("pause", { state: false })
    setAudioPlayerState({ isPlaying: false })
  }

  const timeSeeked = (duration: any) => {
    socket.emit("timeSeeked", { duration })
    setAudioPlayerState({ currentTime: duration })
  }

  return { joinRoom, setTrack, playMusic, pauseMusic, setAudioPlayerState, timeSeeked, audioPlayerState, currentTrack, socket }
}

export default useSocket
