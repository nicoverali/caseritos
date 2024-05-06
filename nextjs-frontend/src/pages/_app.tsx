import "styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import ClientSessionProvider from "context/ClientSessionProvider";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Caseritos</title>
      </Head>
      <ClientSessionProvider>
        <Component {...pageProps} />
      </ClientSessionProvider>
    </>
  );
}
export default MyApp;
