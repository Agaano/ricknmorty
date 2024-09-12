import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { CharacterType, EpisodeType, LocationType } from "../../types/dataTypes";

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  }> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

type AnyResourceType = CharacterType | LocationType | EpisodeType;

export const elementAPI = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({baseUrl: "https://rickandmortyapi.com/api/"}),
    endpoints: (builder) => ({
        getElement: builder.query<AnyResourceType, {id: number, type: "character" | "location" | "episode"}>({
            query: ({id, type}) => ({url: `${type}/${id}`, method: "get"})
        })
    })
})
export const { useGetElementQuery } = elementAPI;