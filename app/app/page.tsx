import Profile from "@/components/Profile"
import Playlist from "@/components/Playlist"
import db from "@/config/db"
import { Song } from "@/types"
import AppLayout from "@/layouts/app-layout"

export default async function () {
  return (
    <AppLayout>
      <Profile />
    </AppLayout>
  )
}