import { WeReadBook, WeReadShelf } from "@/types/weread";
import { env } from "@/env.js";
const RENEW_URL = "https://weread.qq.com/web/login/renewal";
const SHELF_URL = "https://i.weread.qq.com/shelf/friendCommon";

async function getWrSkey(): Promise<string | null> {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", env.WEREAD_COOKIE);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        rq: "%2Fweb%2Fbook%2Fread",
    });

    const response = await fetch(RENEW_URL, {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include",
    });
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
        const cookies = setCookieHeader.split(";");
        for (const cookie of cookies) {
            if (cookie.includes("wr_skey")) {
                return cookie.split("=")[1].substring(0, 8);
            }
        }
    }
    return null;
}

/**
 * 获取最近阅读的书籍列表
 */
export async function getRecentBooks(
    limit: number = 10
): Promise<WeReadBook[]> {
    try {
        const url = new URL(SHELF_URL);

        const myHeaders = new Headers();
        myHeaders.append("vid", env.WEREAD_VID);
        myHeaders.append("skey", "");
        url.search = new URLSearchParams({
            album: "1",
            minCount: String(limit),
            syncKey: env.WEREAD_SYNCKEY,
            userVid: env.WEREAD_VID,
        }).toString();

        let response = await fetch(url, {
            headers: myHeaders,
            next: { revalidate: env.REFRESH },
        });
        if (!response.ok) {
            console.log("微信Skey过期, 重新获取");
            const skey = await getWrSkey();
            myHeaders.set("skey", skey ?? "");
            response = await fetch(url, {
                headers: myHeaders,
                next: { revalidate: env.REFRESH },
            });
        }
        if (!response.ok) {
            throw new Error("获取微信读书数据失败");
        }

        const data = await response.json();
        const books: WeReadBook[] = (data.recentBooks as WeReadShelf[]).map(
            (book) => ({
                bookId: book.bookId,
                title: book.title,
                cover: book.cover.replace("/s_", "/t7_"),
                author: book.author
            })
        );

        return books;
    } catch (error) {
        console.error("获取微信读书列表失败:", error);
        return [];
    }
}
