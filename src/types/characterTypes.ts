import { Status } from "./baseTypes"
 
export type CharactersSliceType = {
    data?: CharactersDataType,
    status: Status,
    error?: {status: number, message: string}
}

export type CharactersDataType = {
    info: {
        count: number,
        pages: number,
        next: string | null,
        prev: string | null,
    },
    results: CharacterType[]
}

export type CharacterType = {
    id: number,
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