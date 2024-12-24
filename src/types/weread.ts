export interface WeReadBook {
  bookId: string;
  title: string;
  author?: string;
  cover: string;
  markText?: string;
  abstract?: string;
  chapterUid?: number;
  reviewId?: string;
}

export interface WeReadMiniShelf {
  bookId: string,
  cover: string,
  title: string,
  secret: number,
  type: number,
  hasLecture: number,
  readUpdateTime: number,
  isLecture: boolean,
  hasUpdated: boolean
}