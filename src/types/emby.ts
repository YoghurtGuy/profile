export interface EmbyConfig {
  baseUrl: string
  apiKey: string
  userId: string
}

interface ExternalUrl {
  Name: string;
  Url: string;
}

export interface EmbyMediaItem {
  Id: string
  Name: string
  Type: string
  Overview?: string
  ImageTags?: {
    Primary?: string
  }
  UserData?: {
    PlaybackPositionTicks: number
    PlayCount: number
    LastPlayedDate: string
  }
  ProductionYear?: number
  PremiereDate?: string
  Artists?: string[]
  Album?: string
  ExternalUrls?: ExternalUrl[]
}

export interface EmbyResponse {
  Items: EmbyMediaItem[]
  TotalRecordCount: number
} 