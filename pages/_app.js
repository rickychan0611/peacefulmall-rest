import React, { useEffect } from 'react';
import Head from 'next/head'
import '../.semantic/dist/semantic.min.css';
import './styles.css';
import { CookiesProvider, useCookies } from 'react-cookie';

import { RecoilRoot, useRecoilState } from 'recoil';
import { appReady as appReadyAtom } from '../data/atoms';
import { user as userAtom, userdata } from '../data/userAtom';
import { orderItems as orderItemsAtom } from '../data/orderAtoms.js';

import SideMenu from '../components/SideMenu';
import CheckOutListPusher from '../components/CheckOutListPusher';
import TopBar from '../components/TopBar';

const InitApp = ({ children }) => {
  const [appReady, setAppReady] = useRecoilState(appReadyAtom);
  const [user, setUser, userdata] = useRecoilState(userAtom);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [, setOrderItems] = useRecoilState(orderItemsAtom);

  useEffect(async () => {
    console.log("initiate")
    //check user cookie
    if (cookies.userToken !== "123456789") {
      console.log("cookies not found")
      setUser()
      localStorage.removeItem('user')
      setAppReady(true)
    }
    else if (cookies.userToken === "123456789") {
      //login user and store user in localstorage
      console.log("Signing IN from localStorage")
      // setUser(userdata)
      setUser(JSON.parse(localStorage.getItem('user')));
      localStorage.getItem('orderItems') ? 
      setOrderItems(JSON.parse(localStorage.getItem('orderItems'))) : 
      setOrderItems([])
      setAppReady(true)
    }
  }, [])

  return children
}

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <CookiesProvider>
        <InitApp>
          <Head>
            <title>Peaceful Mall Restaurant</title>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          </Head>
            <TopBar />
            <div className="contents" style={{ paddingTop: 60, width: "100vw" }}>
              <SideMenu>
                <CheckOutListPusher>
                  <Component {...pageProps} />
                </CheckOutListPusher>
              </SideMenu>
            </div>
        </InitApp>
      </CookiesProvider>
    </RecoilRoot>
  );
}

export default MyApp;
