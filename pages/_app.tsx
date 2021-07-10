import '../styles/index.css';
import React from 'react';
import App from 'next/app';
import Head from 'next/head';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>1:1s question generator</title>
          <meta
            name="description"
            content="Fuel your next one-on-one meeting with great questions."
          />
          <meta
            property="og:title"
            content="1:1s question generator"
            key="title"
          />
          <meta
            name="og:description"
            content="Fuel your next one-on-one meeting with great questions."
          />
          <meta property="og:url" content="https://oneones.app" />
          <meta property="og:type" content="website" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <main>
          <Component {...pageProps} />
        </main>
      </>
    );
  }
}
export default MyApp;
