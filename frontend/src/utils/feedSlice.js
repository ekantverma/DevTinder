import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        setFeed(state, action) {
            return action.payload;
        },
        removeFeed(state, action) {
            return null;
        }
    }
})

export const { setFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;