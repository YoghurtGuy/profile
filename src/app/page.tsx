import { getRecentTracks, getTopTracks } from "@/api/lastfm";
import { getRecentBooks } from "@/api/weread";
import RecentMusic from "./components/RecentMusic";
import RecentBooks from "./components/RecentBooks";
import ErrorDisplay from "@/components/ErrorDisplay";
import RecentVideo from "./components/RecentVideo";
import { getWatched } from "@/api/douban";
import { env } from "@/env";
// import Image from "next/image";

export default async function HomePage() {
    const [recentVideo, music, books] = await Promise.all([
        env.DOUBAN_ID ? getWatched(env.DOUBAN_ID, 1) : [],
        env.MUSIC_TYPE == "top"
            ? getTopTracks(10, env.MUSIC_PEERIOD)
            : getRecentTracks(10),
        getRecentBooks(4),
    ]);

    return (
        <main className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 my-8">
                {/* <div className="relative">
            <Image
              src="https://r2.img.develop.cool/c9db28a03675579c833473249d73cbdf.jpg"
              alt="李梦鱼"
              width={96}
              height={96}
              className="rounded-full border-2 border-gray-200"
              // priority
            />
          </div> */}
                <h1 className="text-4xl font-bold tracking-tight">
                    李梦鱼的主页
                </h1>
            </div>
            {music.length !== 0 && <RecentMusic tracks={music} />}
            {recentVideo.length !== 0 && <RecentVideo movies={recentVideo} />}
            {books.length !== 0 && <RecentBooks books={books} />}
            {music.length + recentVideo.length + books.length === 0 && (
                <ErrorDisplay />
            )}
        </main>
    );
}
