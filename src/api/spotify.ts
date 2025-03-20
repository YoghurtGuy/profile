import { SpotifyConfig, SpotifyAlbumResponse } from "@/types/spotify";
import { env } from "@/env";
import { similarSort } from "@/utils/similar";

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
        next: { revalidate: 60 * 60 },
    });

    const data = await response.json();
    return data.access_token;
}

/**
 * 搜索歌曲获取封面
 */
export async function searchCover(
    artist: string,
    name: string,
    type: "track" | "album",
    retries = 3
): Promise<string | null> {
    try {
        const token = await getSpotifyToken();
        const params={
            q: name.replace(" ", ""),  //`${type}:${name.replace(" ", "")} artist:${artist}`,
            type:type
        }
        const url = new URL("https://api.spotify.com/v1/search");
        url.search = new URLSearchParams(params).toString();
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: { revalidate: env.REFRESH },
        };
        const response = await fetch(
            url,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`Spotify API 请求失败: ${response.statusText}`);
        }

        const data: SpotifyAlbumResponse = await response.json();
        const items = data.albums.items
        .sort((a, b) =>
            similarSort(name, a.name, b.name)
        );
        const coverUrl =
            items.find((item) => item.images?.[0]?.url)?.images[0]?.url || null;
        return coverUrl;
    } catch (error) {
        if (retries > 0) {
            // 等待 1 秒后重试
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return searchCover(artist, name, type, retries - 1);
        }
        console.error("获取 Spotify 封面失败:", error);
        return null;
    }
}
