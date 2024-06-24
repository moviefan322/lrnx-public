// voiceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const voiceInitialState = {
  mediaBlobUrl: "",
  blob: "",
  gradioResponse: {
    data: "",
    queryParams: {},
  },
};

const voiceSlice = createSlice({
  name: "voice",
  initialState: voiceInitialState,
  reducers: {
    setMediaBlobUrl: (state, action) => {
      state.mediaBlobUrl = action.payload;
    },
    setBlob: (state, action) => {
      state.blob = action.payload;
    },
    setGradioResponse: (state, action) => {
      state.gradioResponse.data = action.payload;
    },
    setQueryParams: (state, action) => {
      state.gradioResponse.queryParams = action.payload;
    },
  },
});

export const { setMediaBlobUrl, setBlob, setGradioResponse, setQueryParams } =
  voiceSlice.actions;

export default voiceSlice.reducer;
