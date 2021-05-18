import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../.semantic/dist/semantic.min.css';
import './styles.css';
import { CookiesProvider, useCookies } from 'react-cookie';

import { RecoilRoot, useRecoilState } from 'recoil';
import { appReady as appReadyAtom } from '../data/atoms';
import { user as userAtom, userdata } from '../data/userAtom';
import { orderItems as orderItemsAtom } from '../data/orderAtoms.js';
import { currentPosition as currentPositionAtom } from '../data/atoms';

import SideMenu from '../components/SideMenu';
import CheckOutListPusher from '../components/CheckOutListPusher';
import TopBar from '../components/TopBar';
import { route } from 'next/dist/next-server/server/router';

const InitApp = ({ children }) => {
  const router = useRouter();
  const [appReady, setAppReady] = useRecoilState(appReadyAtom);
  const [user, setUser, userdata] = useRecoilState(userAtom);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [, setOrderItems] = useRecoilState(orderItemsAtom);
  const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionAtom);

  // initial app
  useEffect(async () => {
    console.log('initiate');

    //orderItems localstorage
    const orderItems = localStorage.getItem('orderItems');
    orderItems ? setOrderItems(JSON.parse(orderItems)) : setOrderItems([]);

    //currentPosition localstorage
    const currentPosition = localStorage.getItem('currentPosition');
    console.log(currentPosition);
    // currentPosition ? setCurrentPosition(JSON.parse(currentPosition)) : router.push('/');

    //check user cookie
    if (cookies.userToken !== '123456789') {
      console.log('cookies not found');
      setUser();
      localStorage.removeItem('user');
      setAppReady(true);
    } else if (cookies.userToken === '123456789') {
      //login user and store user in localstorage
      console.log('Signing IN from localStorage');
      // setUser(userdata)
      setUser(JSON.parse(localStorage.getItem('user')));

      setAppReady(true);
    }
  }, []);

  return children;
};

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
          <div className="contents" style={{ paddingTop: 60, width: '100vw' }}>
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
