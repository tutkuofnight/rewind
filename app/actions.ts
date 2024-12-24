"use server"
import db from "@/config/db"
import { v4 } from "uuid"
import { Playlist } from "@/types"

export const saveUser = async (user: any) => {
  if (!user){
    return
  }
  const users = db.prepare("SELECT * FROM users").all()
  const findedUser = users.find((data: any) => data.id == user.id)
  if (!findedUser){
    const playlist: Playlist = {
      id: v4(),
      name: `${user.name}'s Playlist`
    }
    const userQuery = db.prepare("INSERT INTO users (id, name, email, image, playlistId) VALUES (?, ?, ?, ?, ?)")
    const playlistQuery = db.prepare("INSERT INTO playlist (id, name) VALUES (?,?)")
    playlistQuery.run(playlist.id, playlist.name)
    userQuery.run(v4(), user.name, user.email, user.image, playlist.id)
  }
}