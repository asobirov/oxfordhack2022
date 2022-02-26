import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import imageUploadSlice from "./slices/imageUploadSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      imageUpload: imageUploadSlice,
    },
    middleware: []
  });
};

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
