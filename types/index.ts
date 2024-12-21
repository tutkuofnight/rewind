export type Song = {
    id: string
    name: string
    artist: string
    featurings: string
    song: File
}

export type Playlist = {
    name: string
    songlist: Song[]
}