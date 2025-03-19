import { ProcessedTrack } from "@/types/lastfm";
import Image from "next/image";

interface RecentMusicProps {
    tracks: ProcessedTrack[];
}

export default function RecentMusic({ tracks }: RecentMusicProps) {
    return (
        <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">最近在听</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {tracks.map((track, index) => (
                    <a
                        key={`${track.date?.timestamp || ""}-${index}`}
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-2 hover:bg-content2 rounded-xl transition-colors"
                    >
                        <div className="relative w-32 h-32 mb-3">
                            <Image
                                src={track.image || "/default-album.png"}
                                alt={track.name}
                                width={128}
                                height={128}
                                className="object-cover rounded-full shadow-md"
                                priority={index < 4}
                            />
                        </div>
                        <div className="text-center w-full">
                            <h3 className="text-base font-semibold mb-1 truncate px-2">
                                {track.name}
                            </h3>
                            <p className="text-xs text-default-500 truncate px-2">
                                {track.artist.name}
                            </p>
                            {track.album.name && (
                                <p className="text-xs text-default-500 truncate px-2">
                                    {track.album.name}
                                </p>
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
