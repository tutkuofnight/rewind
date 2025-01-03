"use client"
import { ListenerUser, Song } from "@/types"
import { useSession } from "next-auth/react"
import useSocket from "@/hooks/useSocket"
import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { roomId as roomIdStore } from "@/store"

import Playlist from "@/components/Playlist"
import Listeners from "@/components/Listeners"

export default function({ roomId, songs, playlistName }: { roomId: string, songs: Song[], playlistName: string }) {
  const [listenerUsers, setListenerUsers] = useState<ListenerUser[]>([])
  const [,setRoomIdState] = useAtom(roomIdStore) 

  const { data:session } = useSession()
  const { joinRoom, socket } = useSocket()
  
  setRoomIdState(roomId)
  
  useEffect(() => {
    if (session?.user) {
      joinRoom({ user: { name: session?.user.name as string, image: session?.user.image as string }, room: roomId})
    }
    socket.on("joinedUser", (data) => {
      console.log(data)
      // setListenerUsers([...listenerUsers, data.user])
    })
  }, [])

  return (
    <div className="flex">
      <Playlist playlist={songs} className="flex-1" playlistName={playlistName} />
      <Listeners listeners={listenerUsers} />
    </div>
  )
}