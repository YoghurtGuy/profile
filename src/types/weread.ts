export interface WeReadBook {
  bookId: string;
  title: string;
  author: string;
  cover: string;
  sort: number;
  markText?: string;
  abstract?: string;
  chapterUid?: number;
  reviewId?: string;
}

export interface WeReadChapter {
  chapterUid: number;
  title: string;
  level: number;
}

export interface WeReadHighlight {
  bookId: string;
  chapterUid: number;
  markText: string;
  style: number;
  colorStyle: number;
  reviewId: string;
  abstract?: string;
}

export interface WeReadRawBook {
  book: {
    bookId: string;
    title: string;
    author: string;
    cover: string;
  };
  sort: number;
}

export interface WeReadRawHighlight {
  chapterUid: number;
  markText: string;
  style: number;
  colorStyle: number;
  reviewId: string;
  range: string;
  abstract: string;
}

export interface WeReadRawChapter {
  chapterUid: number;
  title: string;
  level: number;
}

export interface WeReadChapterResponse {
  data: Array<{
    updated: WeReadRawChapter[];
  }>;
} 