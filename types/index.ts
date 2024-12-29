export type UploadForm = {
    name: string
    artist: string
    featurings: string
    song: File
}
export type Song = {
    id: string
    name: string
    artist: string
    featurings: string
    song: string
}
export type PlayerState = {
    isPlaying?: boolean | null,
    minutes?: number | null
    currentTime?: any
}

export type Playlist = {
    id: string
    name: string
    songlist?: Song[]
}

export type UpdateUser = {
    id: string
    name: string
    image: File
}

export type User = {
    id: string
    name: string
    email: string
    image: string
    playlistId?: string
}

export type ListenerUser = {
    name: string
    image: string
}
import { Profile } from "next-auth"
export interface ExtendedProfile extends Profile {
    picture?: string
}