import { getRecentTracks, getTopTracks } from '@/api/lastfm';
import { getRecentBooks } from '@/api/weread';
import RecentMusic from './components/RecentMusic';
import RecentBooks from './components/RecentBooks';
import ErrorDisplay from '@/components/ErrorDisplay';
import RecentVideo from './components/RecentVideo';
import { getWatched } from '@/api/douban';

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
