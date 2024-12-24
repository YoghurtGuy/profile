export interface LastFMConfig {
  apiKey: string;
  username: string;
}

interface LastFMTrackBase {
  name: string;
  url: string;
  mbid?: string;
}

export interface LastFMTrack extends LastFMTrackBase {
  artist: {
    '#text': string;
    mbid?: string;
  };
  album: {
    '#text': string;
    mbid?: string;
  };
  image: Array<{
    '#text': string;
    size: string;
  }>;
  date: {
    uts: string;
    '#text': string;
  };
}

export interface LastFMTopTrack extends LastFMTrackBase {
  artist: {
    name: string;
    mbid?: string;
    url: string;
  };
  album?: {
    '#text': string;
    mbid?: string;
  };
  image: Array<{
    '#text': string;
    size: string;
  }>;
  playcount: string;
}

export interface LastFMResponse {
  recenttracks: {
    track: LastFMTrack[];
    '@attr': {
      user: string;
      total: string;
      page: string;
      perPage: string;
    };
  };
}

export interface LastFMTopTracksResponse {
  toptracks: {
    track: LastFMTopTrack[];
    '@attr': {
      user: string;
      total: string;
      page: string;
      perPage: string;
    };
  };
}

export interface ProcessedTrack {
  name: string;
  artist: {
    name: string;
    mbid?: string;
  };
  album: {
    name: string;
    mbid?: string;
  };
  image: string;
  url: string;
  mbid?: string;
  date?: {
    timestamp: string;
    text: string;
  };
  playcount?: number;
}

export interface LastFMAlbumInfo {
  album: {
    name: string;
    artist: string;
    mbid: string;
    url: string;
    image: Array<{
      '#text': string;
      size: string;
    }>;
    listeners: string;
    playcount: string;
    tracks: {
      track: Array<{
        name: string;
        url: string;
        duration: string;
        artist: {
          name: string;
          mbid: string;
          url: string;
        };
      }>;
    };
  };
} 