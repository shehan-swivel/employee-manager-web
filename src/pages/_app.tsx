import createEmotionCache from "@/config/createEmotionCache";
import theme from "@/config/theme";
import Layout from "@/layouts/Layout";
import { wrapper } from "@/store";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import "@/styles/globals.css";
import Head from "next/head";

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, ...otherProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(otherProps);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Employee Manager application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <main>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
