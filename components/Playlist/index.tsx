"use client";
import { Song, PlayerState } from "@/types"
import { currentPlaying, search } from "@/store"
import { useAtom } from "jotai"
import useSocket from "@/hooks/useSocket";
export default function Playlist({ playlist }: { playlist: any[] }) {
  const [currentTrack, setCurrentTrack] = useAtom<Song | null>(currentPlaying)
  const [searchStr,] = useAtom<string>(search)
  const { playMusic } = useSocket()

  return (
    <div>
      <h2>{searchStr}</h2>
      {playlist.map((song: any, index: number) => (
        <div className="border flex items-center justify-between w-96" key={index} onClick={() => playMusic(song)}>
          <p>{song.name}</p>
          <p>{song.song}</p>
        </div>
      ))}
    </div>
  );
}
