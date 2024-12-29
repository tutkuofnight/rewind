import db from "@/config/db"
import { Song } from "@/types"

import Client from "./client"
import AppLayout from "@/layouts/app-layout"

export default function({ params } : { params: { id: string } }) {
  const songs = db.prepare("SELECT * FROM songs WHERE userId = ?").all(params.id) as Song[]
  return (
    <AppLayout>
      <Client roomId={params.id} songs={songs} />
    </AppLayout>
  )
}