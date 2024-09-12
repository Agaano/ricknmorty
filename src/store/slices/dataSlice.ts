import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CharactersDataType, CharactersSliceType } from "../../types/characterTypes";
import { Status } from "../../types/baseTypes";
import { AnyResourceArrayType, CharacterType, DataSliceType, DataType, EpisodeType, LocationType } from "../../types/dataTypes";

type GetDataArgs = {
    apiType: "character" | "location" | "episode",
    search?: {[key: string]: string},
    next?: string,
}

export const getData = createAsyncThunk<DataType, GetDataArgs, {rejectValue: {message: string, status: number}}>(
    "character/getMany", async ({apiType, next, search}, {rejectWithValue}) => {
        const querySearch = !!search ? Object.entries(search).map(([key, value]) => `&${key}=${value}`).join("") : "";
        const queryString = (next ?? `${import.meta.env.VITE_SERVER_URL}/api/${apiType}/?page=1${querySearch}`)
        const response = await axios.get(queryString, {validateStatus: status => status < 500})
        if (response.status < 200 || response.status >= 400) 
            return rejectWithValue({status: response.status, message: response.statusText})
        const data: DataType = response.data;
        data.results.map((r) => r.t = apiType)
        return data;
    }
)

const initialState: DataSliceType = {
    status: Status.pending
}

const slice = createSlice({
    name: "data",
    initialState,
    reducers: {
        clear: (state) => {
            state.data = undefined;
        }
    },
    extraReducers(builder) {
        builder.addCase(getData.pending, (state) => {
            state.status = Status.pending;
        })
        builder.addCase(getData.fulfilled, (state, action) => {
            let results: AnyResourceArrayType = [];
            if (!!state.data && state.data.info.next === action.payload.info.next) {
                return;
            }

            if (!state.data) {
                results = action.payload.results;
            } else if (!!state.data) {
                const res = state.data.results;
                const isBothSameType = ["character","location","episode"].reduce((acc, curr) => {
                    return acc || bothIsType(res, action.payload.results, curr) 
                }, false)
                if (isBothSameType) {
                    //@ts-ignore
                    results = [...state.data.results, ...action.payload.results];
                } else results = action.payload.results;
            }
            state.data = {
                info: action.payload.info,
                results,
            }
            state.status = Status.fulfilled;
        })
        builder.addCase(getData.rejected, (state, action) => {
            state.data = undefined;
            state.status = Status.rejected;
            state.error = {
                message: action.payload?.message ?? "",
                status: action.payload?.status ?? 0,
            }
        })
    },
})

function bothIsType(obj1: AnyResourceArrayType, obj2: AnyResourceArrayType, t: string): boolean {
    return obj1[0].t === t && obj2[0].t === t;
}

export const {clear} = slice.actions;

export default slice.reducer;