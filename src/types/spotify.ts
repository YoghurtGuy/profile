export interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyAlbum {
  images: SpotifyImage[];
}

export interface SpotifyTrack {
  album: SpotifyAlbum;
}

export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
} 