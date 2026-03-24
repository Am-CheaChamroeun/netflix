export interface Tag {
  tagId: number;
  tagName: string;
  tagEnName: string;
}

export interface Corner {
  cornerType: number;
  name: string;
  color: string;
}

export interface BookSource {
  sceneId: string;
  expId: string;
  strategyId: string;
  strategyName: string;
  log_id: string;
}

export interface Book {
  bookId: string;
  bookName: string;
  coverWap: string;
  chapterCount: number;
  introduction: string;
  tags: string[];
  tagV3s: Tag[];
  bookSource?: BookSource;
  isEntry: number;
  index: number;
  corner: Corner;
  dataFrom: string;
  cardType: number;
  markNamesConnectKey: string;
  algorithmRecomDot?: string;
  protagonist?: string;
  reserveStatus?: number;
  bookShelfStatus?: number;
  rankVo?: RankVo;
  playCount: string;
  bookShelfTime: number;
  shelfTime: string;
  inLibrary: boolean;
}

export interface VideoPathItem {
  quality: number;
  videoPath: string;
  isDefault: number;
  isEntry: number;
  isVipEquity: number;
}

export interface CdnItem {
  cdnDomain: string;
  isDefault: number;
  videoPathList: VideoPathItem[];
}

export interface FirstPlaySource {
  firstPlaySource: string;
  firstPlaySourceName: string;
}

export interface BookHint {
  id: number;
  hintType: string;
  hintName: string;
  bgColor: string;
  transparency: number;
  showOrder: number;
  showTime: number;
}

export interface ShareVo {
  description: string;
  link: string;
  shareId: string;
  dramaShareLink: string;
  shareDescription: string;
  shareApps: string[];
}

export interface Performer {
  performerId: string;
  performerName: string;
  performerAvatar: string;
  videoCount: number;
}

export interface SubtitleItem {
  captionLanguage: string;
  url: string;
  isDefault: number;
}

export interface RandomDrama {
  bookId: string;
  bookName: string;
  bookCover: string;
  introduction: string;
  playCount: string;
  tags: string[];
  tagV3s: Tag[];
  markNamesConnectKey: string;
  inLibraryCount: number;
  chapterId: string;
  chapterImg: string;
  chapterIndex: number;
  totalChapterNum: number;
  nextChapterId: string;
  videoPath: string;
  cdnList: CdnItem[];
  bookSource: BookSource;
  firstPlaySource: FirstPlaySource;
  isEntry: number;
  isBottomBook: number;
  bookHints?: BookHint[];
  corner: Corner;
  bookStatus: number;
  algorithmRecomDot: string;
  shareVo: ShareVo;
  payChapterNum: number;
  needTriggerWarnTip: boolean;
  chapterType: number;
  needInteractionTip: boolean;
  bookType: number;
  viewingDuration: number;
  performers?: Performer[];
  spriteSnapshotUrl: string;
  useMultiSubtitle: number;
  subLanguageVoList?: SubtitleItem[];
  trailerType: number;
  useLandscapeMode: number;
  inLibrary: boolean;
  chargeChapter: boolean;
}

export interface SearchResult {
  bookId: string;
  bookName: string;
  introduction: string;
  author: string;
  cover: string;
  inLibraryCount: number;
  bookSource: BookSource;
  sort: number;
  protagonist: string;
  tagNames: string[];
  markNamesConnectKey: string;
  algorithmRecomDot: string;
  corner?: Corner;
  inLibrary: boolean;
}

export interface RankVo {
  rankType: number;
  hotCode: string;
  recCopy?: string;
  sort: number;
}

export type DubindoClassify = 'terpopuler' | 'terbaru';

export interface DubindoParams {
  classify: DubindoClassify;
  page: number;
}

export interface Column {
  columnId: number;
  title: string;
  subTitle: string;
  style: string;
  bookList: Book[];
  type: number;
}

export interface PaginatedList<T> {
  current: number;
  size: number;
  total: number;
  records: T[];
  pages: number;
}

export interface SenseRightsLoadInfo {
  desc: string;
}

export interface Chapter {
  chapterId: string;
  chapterIndex: number;
  isCharge: number;
  chapterName: string;
  cdnList: CdnItem[];
  chapterImg: string;
  chapterType: number;
  needInterstitialAd: number;
  senseRightsLoadInfo: SenseRightsLoadInfo;
  useMultiSubtitle: number;
  subLanguageVoList: SubtitleItem[];
  viewingDuration: number;
  spriteSnapshotUrl: string;
  useLandscapeMode: number;
  chargeChapter: boolean;
}

export interface VipResponse {
  bannerList: unknown[];
  watchHistory: unknown[];
  columnVoList: Column[];
  recommendList: PaginatedList<unknown>;
  newTheaterList: PaginatedList<unknown>;
  cornerSwitch: boolean;
  reserveChannelFlag: boolean;
  isAlgorithmBanner: number;
}
