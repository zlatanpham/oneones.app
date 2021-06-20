import '../styles/index.css';
import React from 'react';
import App from 'next/app';
import tw from 'twin.macro';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div css={tw`flex min-h-screen flex-col justify-between`}>
        <main>
          <div css={tw`max-w-3xl mx-auto py-20`}>
            <Component {...pageProps} />
          </div>
        </main>
      </div>
    );
  }
}
export default MyApp;
