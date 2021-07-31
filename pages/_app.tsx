import '../styles/index.css';
import React from 'react';
import App from 'next/app';
import Head from 'next/head';

// Node env may not support destructuring
// eslint-disable-next-line prefer-destructuring
const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />

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

          {GA_TRACKING_ID && (
            <>
              <script
                async
                src="https://www.google-analytics.com/analytics.js"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                  ga('create', '${GA_TRACKING_ID}', 'auto');
                  ga('send', 'pageview');
                  `,
                }}
              />
            </>
          )}
        </Head>
        <main>
          <Component {...pageProps} />
        </main>
      </>
    );
  }
}
export default MyApp;
