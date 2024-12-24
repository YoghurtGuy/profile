import { WeReadBook, WeReadChapter, WeReadHighlight } from '@/types/weread';

const WEREAD_URL = "https://weread.qq.com/";
const WEREAD_NOTEBOOKS_URL = "https://i.weread.qq.com/user/notebooks";
const WEREAD_BOOKMARKLIST_URL = "https://i.weread.qq.com/book/bookmarklist";
const WEREAD_CHAPTER_INFO = "https://i.weread.qq.com/book/chapterInfos";

/**
 * 获取最近阅读的书籍列表
 */
export async function getRecentBooks(limit: number = 10): Promise<WeReadBook[]> {
  try {
    const response = await fetch(WEREAD_NOTEBOOKS_URL, {
      headers: {
        'Cookie': decodeURIComponent(process.env.WEREAD_COOKIE || ''),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://weread.qq.com',
        'Referer': 'https://weread.qq.com/',
      },
    });

    if (!response.ok) {
      throw new Error('获取微信读书数据失败');
    }

    const data = await response.json();
    const books: WeReadBook[] = data.books
      .sort((a: any, b: any) => b.sort - a.sort)
      .slice(0, limit)
      .map((book: any) => ({
        bookId: book.book.bookId,
        title: book.book.title,
        author: book.book.author,
        cover: book.book.cover.replace("/s_", "/t7_"),
        sort: book.sort
      }));

    return books;
  } catch (error) {
    console.error('获取微信读书列表失败:', error);
    throw error;
  }
}

/**
 * 获取书籍的划线内容
 */
export async function getBookHighlights(bookId: string): Promise<WeReadHighlight[]> {
  try {
    const response = await fetch(`${WEREAD_BOOKMARKLIST_URL}?bookId=${bookId}`, {
      headers: {
        'Cookie': process.env.WEREAD_COOKIE || '',
      },
    });

    if (!response.ok) {
      throw new Error('获取划线数据失败');
    }

    const data = await response.json();
    const highlights: WeReadHighlight[] = data.updated
      .sort((a: any, b: any) => {
        if (a.chapterUid === b.chapterUid) {
          return parseInt(a.range.split('-')[0]) - parseInt(b.range.split('-')[0]);
        }
        return a.chapterUid - b.chapterUid;
      })
      .map((item: any) => ({
        bookId,
        chapterUid: item.chapterUid,
        markText: item.markText,
        style: item.style,
        colorStyle: item.colorStyle,
        reviewId: item.reviewId,
        abstract: item.abstract
      }));

    return highlights;
  } catch (error) {
    console.error('获取划线数据失败:', error);
    throw error;
  }
}

/**
 * 获取书籍章节信息
 */
export async function getChapterInfo(bookId: string): Promise<WeReadChapter[]> {
  try {
    const response = await fetch(WEREAD_CHAPTER_INFO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': process.env.WEREAD_COOKIE || '',
      },
      body: JSON.stringify({
        bookIds: [bookId],
        synckeys: [0],
        teenmode: 0
      })
    });

    if (!response.ok) {
      throw new Error('获取章节信息失败');
    }

    const data = await response.json();
    if (data.data?.[0]?.updated) {
      return data.data[0].updated.map((chapter: any) => ({
        chapterUid: chapter.chapterUid,
        title: chapter.title,
        level: chapter.level
      }));
    }

    return [];
  } catch (error) {
    console.error('获取章节信息失败:', error);
    throw error;
  }
} 