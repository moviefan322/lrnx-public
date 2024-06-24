import React from "react";
import "@/styles/globals.css";
import theme from "@/styles/theme";
import Header from '../stories/Header';
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store } from "@/store/configureStore";
import { ThemeProvider } from "@emotion/react";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
