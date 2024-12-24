import { WeReadBook, WeReadMiniShelf } from '@/types/weread';


/**
 * 获取最近阅读的书籍列表
 */
export async function getRecentBooks(limit: number = 10): Promise<WeReadBook[]> {
  try {
    const url = new URL('https://weread.qq.com/mp/home/miniShelf');
    url.search = new URLSearchParams({
      withLecture:'1',
      count:limit.toString(),
      vid:process.env.WECHAT_VID??'',
      skey:process.env.WECHAT_SKEY??'',
      platform:'wp',
    }).toString();
    const response = await fetch(url, {
      headers: {
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/6.8.0(0x16080000) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.9(0x13080910) XWEB/1227",
        'Origin': 'https://weread.qq.com',
        'Referer': 'https://weread.qq.com/',
        "Content-Type": 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('获取微信读书数据失败');
    }

    const data = await response.json();
    const books: WeReadBook[] = (data.data as WeReadMiniShelf[])
      .map((book) => ({
        bookId: book.bookId,
        title: book.title,
        cover: book.cover.replace("/s_", "/t7_"),
      }));

    return books;
  } catch (error) {
    console.error('获取微信读书列表失败:', error);
    throw error;
  }
}