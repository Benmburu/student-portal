import '@styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
