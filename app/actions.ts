"use server"
import db from "@/config/db"
import { v4 } from "uuid"
import { Playlist, UpdateUser, Song } from "@/types"
import { cookies } from 'next/headers'

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

export const updateUser = async (user: UpdateUser) => {
  let columnsToUpdate = []
  let values = []

  if (user.name) {
    columnsToUpdate.push("name = ?")
    values.push(user.name)
  }

  if (user.image) {
    columnsToUpdate.push("image = ?")
    values.push(user.image)
  }

  if (columnsToUpdate.length > 0) {
    const query = db.prepare(`UPDATE users SET ${columnsToUpdate.join(', ')} WHERE id = ?`)
    values.push(user.id)
    query.run(...values)
    console.log(`User ${user.id} updated successfully.`)
  } else {
    console.log('No fields to update.')
  }
}

export const setCookie = async (userId: string) => {
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'uid',
    value: userId,
    httpOnly: true,
    path: '/',
  })
}