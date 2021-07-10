import '../styles/index.css';
import React from 'react';
import App from 'next/app';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <div className="flex min-h-screen flex-col justify-between">
        <main>
          <div className="max-w-3xl mx-auto py-20">
            <Component {...pageProps} />
          </div>
        </main>
      </div>
    );
  }
}
export default MyApp;
