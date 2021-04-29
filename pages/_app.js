import React from 'react';
import App from 'next/app';
import { RecoilRoot } from 'recoil';
import '../.semantic/dist/semantic.min.css';
import SideMenu from '../components/SideMenu';
import CheckOutListPusher from '../components/CheckOutListPusher';
import CheckOutList from '../components/CheckOutList';
import TopBar from '../components/TopBar';
import './styles.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <RecoilRoot>
        <TopBar />
        <div className="contents" style={{paddingTop: 44, width: "100vw"}}>
        <SideMenu>
          <CheckOutListPusher>
            <Component {...pageProps} />
          </CheckOutListPusher>
        </SideMenu>
        </div>
      </RecoilRoot>
    );
  }
}

export default MyApp;
