"use client"
import { ListenerUser, Song } from "@/types"
import { useSession } from "next-auth/react"
import useSocket from "@/hooks/useSocket"
import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { roomId as roomIdStore } from "@/store"

import Playlist from "@/components/Playlist"
import Listeners from "@/components/Listeners"

export default function({ roomId, songs }: { roomId: string, songs: Song[] }) {
  const [listenerUsers, setListenerUsers] = useState<ListenerUser[]>([])
  const [,setRoomIdState] = useAtom(roomIdStore) 

  const { data:session } = useSession()
  const { joinRoom, socket } = useSocket()
  
  setRoomIdState(roomId)
  joinRoom({ user: { name: session?.user.name as string, image: session?.user.image as string }, room: roomId})
  
  useEffect(() => {
    if (session?.user){
      socket.on("joinedUser", (data) => {
        console.log(data)
        // setListenerUsers([...listenerUsers, data.user])
      })
    }
  }, [])

  return (
    <div className="flex">
      <Playlist playlist={songs} className="flex-1" />
      <Listeners listeners={listenerUsers} />
    </div>
  )
}