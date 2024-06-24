import { configureStore } from "@reduxjs/toolkit";
import basicReducer from "../redux/basic/basicSlice";
import voiceReducer from '../redux/voice/voiceSlice';

export const store = configureStore({
  reducer: { 
    basicReducer,  
    voiceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
