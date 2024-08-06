import { Html, Head, Main, NextScript } from 'next/document';
import { DocumentProps } from 'next/document';
import React from 'react';

// The function takes props of type DocumentProps
// It returns a JSX.Element (which is what React components typically return)
export default function Document(props: DocumentProps): JSX.Element {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
