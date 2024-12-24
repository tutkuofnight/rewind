import db from "@/config/db"
// import { Button } from "antd"
import { AudioLines, Disc3, Music4 } from "lucide-react"
import Header from "@/components/Header"
import Playlist from "@/components/Playlist"
import AudioPlayer from "@/components/AudioPlayer"
import Auth from "@/components/Auth"

export default function Home() {
  const songs = db.prepare("SELECT * FROM songs").all()
  return (
    <main>
      <Header />
      <section className="h-[400px] flex justify-between relative">
        <div className="flex flex-col h-full justify-center gap-4">
          <h1 className="text-5xl font-bold flex items-center gap-6"> 
            <p>Welcome to <span className="font-logo font-normal">Rewind</span></p>
            <AudioLines className="w-14 h-14" />
          </h1>
          <p>The platform for upload and listen music together with your friends.</p>
          <div className="flex items-center gap-2">
            <Auth />
          </div>
        </div>
        <div className="flex h-full items-center">
          <Disc3 className="w-72 h-72 text-black absolute -z-10 right-0" />
          <Music4 className="w-72 h-72 text-blue-600 absolute right-[105px] top-[100px]" />
        </div>
      </section>
      <Playlist playlist={songs} />
      <AudioPlayer />
    </main>
  );
}
