import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
    base64: string | null;
    url: string | null;
}
const initialState = {
    base64: null,
    url: null,
} as StateType;

const mouseSlice = createSlice({
    name: "imageUpload",
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<any>) => {
            const { base64, url } = action.payload;
            state.base64 = base64;
            state.url = url;
        },
        resetImage: (state) => {
            state.base64 = null;
            state.url = null;
        }
    },
});

export const { setImage, resetImage } = mouseSlice.actions;
export default mouseSlice.reducer;
