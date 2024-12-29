import { atom } from "jotai"
import { PlayerState, Song } from "@/types"

export const playerState = atom<PlayerState | null>(null)

export const currentPlaying = atom<Song | null>(null)

export const search = atom<string>("")

export const roomId = atom<string | null>(null)