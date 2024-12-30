import db from "@/config/db"
import { Song } from "@/types"

import Client from "./client"
import AppLayout from "@/layouts/app-layout"

export default async function({ params } : { params: Promise<{ id: string }> }) {
  const { id } = await params
  const songs = db.prepare("SELECT * FROM songs WHERE userId = ?").all(id) as Song[]
  return (
    <AppLayout>
      <Client roomId={id} songs={songs} />
    </AppLayout>
  )
}