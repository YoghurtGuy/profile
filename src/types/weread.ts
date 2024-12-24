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