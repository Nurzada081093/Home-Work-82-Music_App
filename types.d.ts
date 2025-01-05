export interface IArtist {
    name: string;
    description: string;
    image: string | null;
}

export interface IAlbum {
    artist: number;
    title: string;
    releaseDate: string;
    image: string | null;
}