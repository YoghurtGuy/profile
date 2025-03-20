import { MovieItem } from "@/types/douban";
import { load } from "cheerio";

const formatCoverUrl = (originalUrl: string) => {
    if (!originalUrl) return "";
    // 使用自己的代理服务器转发图片请求
    return `/image?url=${encodeURIComponent(originalUrl)}`;
};

/**
 * 获取用户看过的电影列表
 * @param userId 豆瓣用户ID
 * @param pageCount 要获取的页数
 */
export async function getWatched(
    userId: string,
    pageCount: number = 1,
    pageSize: number = 5
): Promise<MovieItem[]> {
    const tasks = [];

    for (let page = 0; page < pageCount; page++) {
        const url = `https://movie.douban.com/people/${userId}/collect?sort=time&start=${
            page * pageSize
        }&mode=grid&tags_sort=count`;

        tasks.push(
            fetch(url, {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                },
            })
                .then((response) => response.text())
                .then((html) => {
                    const $ = load(html);
                    const movies: MovieItem[] = [];

                    $(".grid-view .item").each((_, element) => {
                        const $item = $(element);
                        const $info = $item.find(".info");

                        const title = $info
                            .find("li.title a")
                            .text()
                            .trim()
                            .split("/")[0]
                            .trim();
                        const link =
                            $info.find("li.title a").attr("href") || "";
                        const cover = formatCoverUrl(
                            $item.find(".pic img").attr("src") || ""
                        );
                        // const ratingClass = $info.find('.rating').attr('class') || '';
                        const date = $info.find(".date").text().trim();
                        const comment = $info.find(".comment").text().trim();
                        const match = ($info.html() ?? "").match(
                            /rating(\d)-t/
                        );

                        movies.push({
                            title,
                            link,
                            cover,
                            rating: match?.[1] ?? "",
                            date: new Date(date).toISOString(),
                            comment,
                        });
                    });

                    return movies;
                })
        );
    }

    try {
        const results = await Promise.all(tasks);
        return results.flat().slice(0,pageSize);
    } catch (error) {
        console.error("获取豆瓣观影记录失败:", error);
        return [];
    }
}
