import { LastFMConfig, LastFMResponse, ProcessedTrack, LastFMTopTracksResponse} from '@/types/lastfm';
import { searchTrackCover } from './spotify';

const lastfmConfig: LastFMConfig = {
  apiKey: process.env.LASTFM_API_KEY || '',
  username: process.env.LASTFM_USERNAME || '',
};

/**
 * 获取最近播放的音乐并处理封面
 * @param limit 限制返回数量
 */
export async function getRecentTracks(limit: number = 10): Promise<ProcessedTrack[]> {
  try {
    const url = new URL('http://ws.audioscrobbler.com/2.0/');
    url.search = new URLSearchParams({
      method: 'user.getrecenttracks',
      user: lastfmConfig.username,
      api_key: lastfmConfig.apiKey,
      format: 'json',
      limit: limit.toString(),
    }).toString();

    const response = await fetch(url, {
      next: { revalidate: 300 }, // 5分钟缓存
    });

    if (!response.ok) {
      throw new Error(`Last.fm API 请求失败: ${response.statusText}`);
    }

    const data: LastFMResponse = await response.json();
    const tracks = data.recenttracks.track;

    // 处理每个曲目的封面
    const processedTracks = await Promise.all(
      tracks.map(async (track) => {
        const spotifyCover = await searchTrackCover(track.artist['#text'], track.name);
        return {
          name: track.name,
          artist: {
            name: track.artist['#text'],
            mbid: track.artist.mbid,
          },
          album: {
            name: track.album['#text'],
            mbid: track.album.mbid,
          },
          image: spotifyCover || track.image[3]['#text'],
          url: track.url,
          mbid: track.mbid,
          date: track.date ? {
            timestamp: track.date.uts,
            text: track.date['#text'],
          } : undefined,
        };
      })
    );

    return processedTracks;
  } catch (error) {
    console.error('获取最近播放记录失败:', error);
    throw error;
  }
}

/**
 * 获取用户最常播放的音乐
 * @param limit 限制返回数量
 * @param period 时间段 (overall | 7day | 1month | 3month | 6month | 12month)
 */
export async function getTopTracks(
  limit: number = 10,
  period: string = 'overall'
): Promise<ProcessedTrack[]> {
  try {
    const url = new URL('http://ws.audioscrobbler.com/2.0/');
    url.search = new URLSearchParams({
      method: 'user.gettoptracks',
      user: lastfmConfig.username,
      api_key: lastfmConfig.apiKey,
      format: 'json',
      limit: limit.toString(),
      period: period,
    }).toString();

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Last.fm API 请求失败: ${response.statusText}`);
    }

    const data: LastFMTopTracksResponse = await response.json();
    const tracks = data.toptracks.track;

    const processedTracks = await Promise.all(
      tracks.map(async (track) => {
        const spotifyCover = await searchTrackCover(track.artist.name, track.name);
        
        // 获取专辑信息
        let albumInfo = null;
        if (track.name && track.artist.name) {
          albumInfo = await getAlbumInfo(track.artist.name, track.name);
        }

        return {
          name: track.name,
          artist: {
            name: track.artist.name,
            mbid: track.artist.mbid,
          },
          album: {
            name: albumInfo?.album?.name || '',
            mbid: albumInfo?.album?.mbid || '',
          },
          image: spotifyCover || (albumInfo?.album?.image?.[3]?.['#text'] || track.image[3]['#text']),
          url: track.url,
          mbid: track.mbid,
          playcount: parseInt(track.playcount, 10),
        };
      })
    );

    return processedTracks;
  } catch (error) {
    console.error('获取最常播放记录失败:', error);
    throw error;
  }
}

/**
 * 获取专辑详细信息
 * @param artist 艺术家名称
 * @param album 专辑名称
 * @param mbid 可选的 MusicBrainz ID
 */
async function getAlbumInfo(artist: string, album: string, mbid?: string) {
  try {
    const params: Record<string, string> = {
      method: 'album.getinfo',
      api_key: lastfmConfig.apiKey,
      format: 'json',
    };

    if (mbid) {
      params.mbid = mbid;
    } else {
      params.artist = artist;
      params.album = album;
    }

    const url = new URL('http://ws.audioscrobbler.com/2.0/');
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url, {
      next: { revalidate: 86400 }, // 24小时缓存
    });

    if (!response.ok) {
      throw new Error(`Last.fm API 请求失败: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('获取专辑信息失败:', error);
    return null;
  }
} 
