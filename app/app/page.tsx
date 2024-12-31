import Profile from "@/components/Profile"
import Playlist from "@/components/Playlist"
import AudioPlayerDefault from "@/components/AudioPlayer/default"
import db from "@/config/db"
import { Song } from "@/types"
import { cookies } from 'next/headers'

export default async function () {
  const cookie = await cookies()
  const id: any = cookie.get("uid")
  const songs = await db.prepare("SELECT * FROM songs WHERE userId = ?").all(id.value) as Song[]

  return (
    <main>
      <Profile />
      <Playlist playlist={songs} />
      <AudioPlayerDefault />
    </main>
  )
}