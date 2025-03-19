import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]),
        DOUBAN_ID: z.string(),

        LASTFM_USERNAME: z.string(),
        LASTFM_API_KEY: z.string(),
        MUSIC_TYPE: z.enum(["top"]),
        MUSIC_PEERIOD: z.enum([
            "overall",
            "7day",
            "1month",
            "3month",
            "6month",
            "12month",
        ]),
        SPOTIFY_CLIENT_ID: z.string(),
        SPOTIFY_CLIENT_SECRET: z.string(),
        WEREAD_VID: z.string(),
        WEREAD_COOKIE: z.string(),
        WEREAD_SYNCKEY: z.string(),
        REFRESH: z.number(),
    },
    client: {
        NEXT_PUBLIC_SHOW_DOUBAN_COMMENT: z.boolean(),
        // NEXT_PUBLIC_CLIENTVAR: z.string(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DOUBAN_ID: process.env.DOUBAN_ID,
        NEXT_PUBLIC_SHOW_DOUBAN_COMMENT: Boolean(
            process.env.SHOW_DOUBAN_COMMENT
        ),
        LASTFM_USERNAME: process.env.LASTFM_USERNAME,
        LASTFM_API_KEY: process.env.LASTFM_API_KEY,
        MUSIC_TYPE: process.env.MUSIC_TYPE,
        MUSIC_PEERIOD: process.env.MUSIC_PEERIOD,
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
        WEREAD_VID: process.env.WEREAD_VID,
        WEREAD_COOKIE: process.env.WEREAD_COOKIE,
        WEREAD_SYNCKEY: process.env.WEREAD_SYNCKEY,
        REFRESH: process.env.REFRESH ?? 24 * 60 * 60,
    },
});
