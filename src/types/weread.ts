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

export interface WeReadShelf {
  bookId: string;
  title: string;
  author: string;
  translator: string;
  cover: string;
  version: number;
  format: string;
  type: number;
  price: number;
  originalPrice: number;
  soldout: number;
  bookStatus: number;
  payingStatus: number;
  payType: number;
  centPrice: number;
  finished: number;
  free: number;
  mcardDiscount: number;
  ispub: number;
  extra_type: number;
  cpid: number;
  publishTime: string;
  categories: Category[];
  hasLecture: number;
  lastChapterIdx: number;
  paperBook: PaperBook;
  copyrightChapterUids: number[];
  blockSaveImg: number;
  language: string;
  hideUpdateTime: boolean;
  isEPUBComics: number;
  isVerticalLayout: number;
  isShowTTS: number;
  webBookControl: number;
  selfProduceIncentive: boolean;
  isAutoDownload: number;
  readUpdateTime: number;
  secret: number;
};

type Category = {
  categoryId: number;
  subCategoryId: number;
  categoryType: number;
  title: string;
};

type PaperBook = {
  skuId: string;
};
