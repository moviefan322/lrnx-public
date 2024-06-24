import { client } from "@gradio/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GradioResponse } from "./basicSlice";

export const getClient = createAsyncThunk<
  GradioResponse,
  { audioFile: Blob; selectedVoice: string }
>("basic/getClient", async ({ audioFile, selectedVoice }, thunkAPI) => {
  try {
    const app = await client("https://laronix-laronix-asr-tts-vc.hf.space");
    const app_info = await app.view_api();
    const { config } = app;
    const result: any = await app.predict("/convert", [
      audioFile,
      selectedVoice,
    ]);
    result.data[0].selectedVoice = selectedVoice;
    return result.data[0] as GradioResponse;
  } catch (error) {
    throw new Error("Unable to load audio. Please start a new recording.");
  }
});
