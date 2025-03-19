import { SpotifyConfig, SpotifySearchResponse } from "@/types/spotify";
import { env } from "@/env";

const spotifyConfig: SpotifyConfig = {
    clientId: process.env.SPOTIFY_CLIENT_ID || "",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
};

/**
 * 获取 Spotify 访问令牌
 */
async function getSpotifyToken(): Promise<string> {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
                `${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`
            ).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
        next: { revalidate: env.REFRESH },
    });

    const data = await response.json();
    return data.access_token;
}

const coverCache = new Map<string, string>();

/**
 * 搜索歌曲获取封面
 */
export async function searchTrackCover(
    artist: string,
    track: string,
    retries = 3
): Promise<string | null> {
    const cacheKey = `${artist}-${track}`;

    // 检查缓存
    if (coverCache.has(cacheKey)) {
        return coverCache.get(cacheKey) || null;
    }

    try {
        const token = await getSpotifyToken();
        const query = encodeURIComponent(`track:${track} artist:${artist}`);

        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                next: { revalidate: env.REFRESH },
            }
        );

        if (!response.ok) {
          throw new Error(`Spotify API 请求失败: ${response.statusText}`);
        }

        const data: SpotifySearchResponse = await response.json();
        const tracks = data.tracks.items;

        if (tracks.length > 0) {
            // 返回最大尺寸的封面
            const coverUrl = tracks[0].album.images[0]?.url || null;

            // 存入缓存
            if (coverUrl) {
                coverCache.set(cacheKey, coverUrl);
            }
            return coverUrl;
        }

        return null;
    } catch (error) {
        if (retries > 0) {
            // 等待 1 秒后重试
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return searchTrackCover(artist, track, retries - 1);
        }
        console.error("获取 Spotify 封面失败:", error);
        return null;
    }
}
