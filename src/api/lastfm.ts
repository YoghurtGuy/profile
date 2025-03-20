import {
    LastFMConfig,
    ProcessedAlbum,
    Album
} from "@/types/lastfm";
import { searchCover } from "./spotify";
import { env } from "@/env";

const lastfmConfig: LastFMConfig = {
    apiKey: env.LASTFM_API_KEY,
    username: env.LASTFM_USERNAME,
};

/**
 * 获取用户最常播放的专辑
 * @param limit 限制返回数量
 * @param period 时间段 (overall | 7day | 1month | 3month | 6month | 12month)
 */
export async function getTopAlbums(
    limit: number = 10,
    period: string = "overall"
): Promise<ProcessedAlbum[]> {
    try {
        const url = new URL("http://ws.audioscrobbler.com/2.0/");
        url.search = new URLSearchParams({
            method: "user.gettopalbums",
            user: lastfmConfig.username,
            api_key: lastfmConfig.apiKey,
            format: "json",
            limit: limit.toString(),
            period: period,
        }).toString();

        const response = await fetch(url, {
            next: { revalidate: env.REFRESH },
        });

        if (!response.ok) {
            throw new Error(`Last.fm API 请求失败: ${response.statusText}`);
        }

        const data = await response.json();
        const albums:Album[] = data.topalbums.album;

        const processedCover = await Promise.all(
            albums.map(async (album) => {
                const spotifyCover = await searchCover(
                    album.artist.name,
                    album.name,
                    "album"
                );

                return {
                    name: album.name,
                    artist: {
                        name: album.artist.name,
                        mbid: album.artist.mbid,
                    },
                    image:
                        spotifyCover ??
                        album.image[0]?.["#text"],
                    url: album.url,
                    mbid: album.mbid,
                    playcount: parseInt(album.playcount, 10),
                };
            })
        );
        return processedCover;
    } catch (error) {
        console.error("获取最常播放记录失败:", error);
        return [];
    }
}

/**
 * 获取专辑详细信息
 * @param artist 艺术家名称
 * @param album 专辑名称
 * @param mbid 可选的 MusicBrainz ID
 */
// async function getAlbumInfo(artist: string, album: string, mbid?: string) {
//     try {
//         const params: Record<string, string> = {
//             method: "album.getinfo",
//             api_key: lastfmConfig.apiKey,
//             format: "json",
//         };

//         if (mbid) {
//             params.mbid = mbid;
//         } else {
//             params.artist = artist;
//             params.album = album;
//         }

//         const url = new URL("http://ws.audioscrobbler.com/2.0/");
//         url.search = new URLSearchParams(params).toString();

//         const response = await fetch(url, {
//             next: { revalidate: env.REFRESH },
//         });

//         if (!response.ok) {
//             throw new Error(`Last.fm API 请求失败: ${response.statusText}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("获取专辑信息失败:", error);
//         return null;
//     }
// }
