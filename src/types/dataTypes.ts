import { Status } from "./baseTypes"
 
export type DataSliceType = {
    data?: DataType,
    status: Status,
    error?: {status: number, message: string}
}

export type DataType = {
    info: {
        count: number,
        pages: number,
        next: string | null,
        prev: string | null,
    },
    results: AnyResourceArrayType
}

export type CharacterType = {
    id: number,
    t: "character",
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string,
    },
    image: string,
    episode: string[],
    url: string,
    created: string,
}

export type LocationType = {
    id: number,
    t: "location",
    name: string, 
    type: string,
    dimension: string,
    residents: string[],
    url: string,
    created: string
}

export type EpisodeType = {
    id: number,
    t: "episode",
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string,
}

export type AnyResourceArrayType = CharacterType[] | LocationType[] | EpisodeType[]