import { ProcessedAlbum } from "@/types/lastfm";
import Image from "next/image";

export default function RecentMusic({ albums }: { albums: ProcessedAlbum[] }) {
    return (
        <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">最近在听</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {albums.map((album, index) => (
                    <div
                        key={`${album.date?.timestamp || ""}-${index}`}
                        className={`${index >= 4 ? "hidden" : "block"} sm:${
                            index >= 3 ? "hidden" : "block"
                        } md:${index >= 4 ? "hidden" : "block"}  lg:block`}
                    >
                        <a
                            href={album.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center p-2 hover:bg-content2 rounded-xl transition-colors"
                        >
                            <div className="relative w-32 h-32 mb-3">
                                <Image
                                    src={album.image || "/default-album.png"}
                                    alt={album.name}
                                    width={128}
                                    height={128}
                                    className="object-cover rounded-full shadow-md"
                                    priority={index < 4}
                                />
                            </div>
                            <div className="text-center w-full">
                                <h3 className="text-base font-semibold mb-1 truncate px-2">
                                    {album.name}
                                </h3>
                                <p className="text-xs text-default-500 truncate px-2">
                                    {album.artist.name}
                                </p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
