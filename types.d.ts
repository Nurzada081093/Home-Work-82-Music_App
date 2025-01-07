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

export interface ITrack {
    album: number;
    title: string;
    trackDuration: string;
}

export interface UserData {
    username: string;
    password: string;
    token: string;
}