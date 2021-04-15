import React from 'react';
import App from 'next/app';
import { RecoilRoot } from 'recoil';

import '../.semantic/dist/semantic.min.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>);
  }
}

export default MyApp;
