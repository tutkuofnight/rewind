import Profile from "@/components/Profile"
import Playlist from "@/components/Playlist"
import db from "@/config/db"
import AudioPlayer from "@/components/AudioPlayer"
export default function () {
  const songs = db.prepare("SELECT * FROM songs").all()

  return (
    <main>
      <Profile />
      <Playlist playlist={songs} />
      <AudioPlayer />
    </main>
  )
}