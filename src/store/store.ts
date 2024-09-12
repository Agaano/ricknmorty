import { AnyAction, combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import navSlice from "./slices/navSlice";
import dataSlice from "./slices/dataSlice";
import { elementAPI } from "./slices/elementData";

const rootReducer = combineReducers({
    data: dataSlice,
    navigation: navSlice,
    [elementAPI.reducerPath]: elementAPI.reducer
})

export type RootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootStateType,void,AnyAction>

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(elementAPI.middleware),
})