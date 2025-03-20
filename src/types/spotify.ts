export interface SpotifyConfig {
    clientId: string;
    clientSecret: string;
}
export type SpotifyAlbumResponse = {
    albums: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: Album[];
    };
};

type Album = {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    type: string;
    uri: string;
    artists: Artist[];
};

type Image = {
    height: number;
    url: string;
    width: number;
};

type Artist = {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
};
