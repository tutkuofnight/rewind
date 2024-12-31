import db from "@/config/db"
import { Song } from "@/types"

import Client from "./client"
import AppLayout from "@/layouts/app-layout"

export default async function({ params } : { params: Promise<{ id: string }> }) {
  const { id } = await params
  const songs = db.prepare("SELECT * FROM songs").all() as Song[]
  const user = db.prepare("SELECT name FROM users WHERE id = ?").get(id) as { name: string }

  return (
    <AppLayout>
      <Client roomId={id} songs={songs} playlistName={`${user.name}'s Playlist`} />
    </AppLayout>
  )
}