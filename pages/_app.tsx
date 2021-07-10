import '../styles/index.css';
import React from 'react';
import App from 'next/app';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <main>
        <Component {...pageProps} />
      </main>
    );
  }
}
export default MyApp;
