import { createSlice } from "@reduxjs/toolkit";

type NavigationType = {
    currentUrl: string,
    props?: string,
    body: any,
}

const initialState: NavigationType = {
    currentUrl: window.location.pathname,
    props: window.location.search.replace("?", ""),
    body: null,
}

const navSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        navigate: (state, action) => {
            const [path, props] = action.payload.path.split("?");
            state.currentUrl = path;
            state.props = props;
            state.body = action.payload.body;
            window.history.pushState({}, '', [path,props].join("?"))
        },
    }
})

export const {navigate} = navSlice.actions

export default navSlice.reducer;