import Profile from "@/components/Profile"
import Playlist from "@/components/Playlist"
import db from "@/config/db"
import { Song } from "@/types"
import AppLayout from "@/layouts/app-layout"

export default async function () {
  const songs = db.prepare("SELECT * FROM songs ").all() as Song[]
  return (
    <AppLayout>
      <Profile />
      <Playlist playlist={songs} />
    </AppLayout>
  )
}