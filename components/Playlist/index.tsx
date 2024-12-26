"use client";
import useSocket from "@/hooks/useSocket"
import TrackCard from "@/components/TrackCard"

export default function Playlist({ playlist }: { playlist: any[] }) {
  const { setTrack } = useSocket()

  return (
    <div>
      <h1 className="text-sm font-bold my-3 p-1 px-2 bg-black text-white inline-block rounded-lg">Your Playlist</h1>
      {playlist.map((song: any, index: number) => (
        <div className="cursor-pointer" key={index} onClick={() => setTrack(song)}>
          <TrackCard song={song} />
        </div>
      ))}
    </div>
  );
}
