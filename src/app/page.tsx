import { getRecentTracks, getTopTracks } from '@/api/lastfm';
import { getRecentBooks } from '@/api/weread';
import RecentMusic from './components/RecentMusic';
import RecentBooks from './components/RecentBooks';
import ErrorDisplay from '@/components/ErrorDisplay';
import RecentVideo from './components/RecentVideo';
import { getWatched } from '@/api/douban';
import Image from "next/image";

export default async function HomePage() {
  try {
    const [recentVideo, music, books] = await Promise.all([
      getWatched('182705450', 1),
      process.env.MUSIC_TYPE == "top" 
        ? getTopTracks(10, process.env.MUSIC_PEERIOD)
        : getRecentTracks(10),
      getRecentBooks(10)
    ]);
  
    return (
      <main className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="relative">
            <Image
              src="https://avatars.githubusercontent.com/u/41856917"
              alt="李梦鱼的头像"
              width={96}
              height={96}
              className="rounded-full border-2 border-gray-200"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            李梦鱼的个人主页
          </h1>
        </div>
        <RecentVideo movies={recentVideo} />
        <RecentMusic tracks={music} />
        <RecentBooks books={books} />
      </main>
    );
  } catch (error) {
    console.error('加载媒体信息失败:', error);
    return <ErrorDisplay />;
  }
}
