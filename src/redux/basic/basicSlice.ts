import { createSlice } from "@reduxjs/toolkit";
import { getClient } from "./basicActions";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BasicState {
  gradioResponse: GradioResponse;
  isLoading: boolean;
  isError: string;
  isSuccess: boolean;
  queryParams: {
    mediaBlobUrl: string;
  };
}

export interface GradioResponse {
  data: string;
  is_file: boolean;
  name: string;
  selectedVoice?: string;
}

const initialState: BasicState = {
  gradioResponse: {
    data: "",
    is_file: false,
    name: "",
  },
  queryParams: {
    mediaBlobUrl: "",
  },
  isLoading: false,
  isError: "",
  isSuccess: false,
};

const basicSlice = createSlice({
  name: "basic",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
    resetState: (state) => {
      state.gradioResponse = initialState.gradioResponse;
      state.isLoading = initialState.isLoading;
      state.isError = initialState.isError;
      state.isSuccess = initialState.isSuccess;
      state.queryParams = initialState.queryParams;
    },
    setQueryParams: (
      state,
      action: PayloadAction<{ mediaBlobUrl: string }>
    ) => {
      state.queryParams = action.payload;
      localStorage.setItem(
        "mediaBlobUrl",
        JSON.stringify(action.payload.mediaBlobUrl)
      );
    },
    setGradioResponse: (state, action) => {
      state.gradioResponse.data = action.payload;
      localStorage.setItem("gradioData", JSON.stringify(action.payload.data));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClient.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(
      getClient.fulfilled,
      (state, action: PayloadAction<GradioResponse>) => {
        localStorage.setItem("gradioData", action.payload.data);
        localStorage.setItem(
          `${action.payload.selectedVoice}`,
          action.payload.data
        );
        state.isLoading = false;
        state.isError = "";
        state.isSuccess = true;
        state.gradioResponse = action.payload;
      }
    );
    builder.addCase(getClient.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = action.error.message || "";
    });
  },
});

export const { resetSuccess, resetState, setQueryParams, setGradioResponse } =
  basicSlice.actions;
export default basicSlice.reducer;
