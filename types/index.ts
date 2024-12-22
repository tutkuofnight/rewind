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
    isPlaying: boolean | null,
    minutes: number | null
}

export type Playlist = {
    name: string
    songlist: Song[]
}

