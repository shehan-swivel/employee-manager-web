import ConfirmationDialog from "@/components/organisms/ConfirmationDialog";
import Snackbar from "@/components/organisms/Snackbar";
import createEmotionCache from "@/config/createEmotionCache";
import theme from "@/config/theme";
import { ConfirmProvider } from "@/contexts/ConfirmContext";
import Layout from "@/components/templates/Layout";
import { wrapper } from "@/store";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import { Provider } from "react-redux";

import "@/styles/globals.css";
import "nprogress/nprogress.css";

const clientSideEmotionCache = createEmotionCache();

NProgress.configure({ showSpinner: false });

export default function App({ Component, ...otherProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(otherProps);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  // Start to show top loading bar
  const handleRouteStart = () => NProgress.start();

  // Finish and hide top loading bar
  const handleRouteDone = () => NProgress.done();

  useEffect(() => {
    // Subscribe route change events when mount the app
    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Unsubscribe route change events when unmount the app
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

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
          <ConfirmProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>

            <ConfirmationDialog />
            <Snackbar />
          </ConfirmProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
