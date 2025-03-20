import { getTopAlbums } from "@/api/lastfm";
import { getRecentBooks } from "@/api/weread";
import RecentMusic from "./components/RecentMusic";
import RecentBooks from "./components/RecentBooks";
import ErrorDisplay from "@/components/ErrorDisplay";
import RecentVideo from "./components/RecentVideo";
import { getWatched } from "@/api/douban";
import { env } from "@/env";
// import Image from "next/image";

export default async function HomePage() {
    const maxNum = 5;
    const [video, music, books] = await Promise.all([
        env.DOUBAN_ID ? getWatched(env.DOUBAN_ID, 1, maxNum) : [],
        env.MUSIC_TYPE == "top" ? getTopAlbums(maxNum, env.MUSIC_PEERIOD) : [],
        getRecentBooks(maxNum),
    ]);

    return (
        <main className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 my-8">
                <h1 className="text-4xl font-bold tracking-tight">
                    李梦鱼的主页
                </h1>
            </div>
            {music.length !== 0 && <RecentMusic albums={music} />}
            {video.length !== 0 && <RecentVideo movies={video} />}
            {books.length !== 0 && <RecentBooks books={books} />}
            {music.length + video.length + books.length === 0 && (
                <ErrorDisplay />
            )}
        </main>
    );
}
