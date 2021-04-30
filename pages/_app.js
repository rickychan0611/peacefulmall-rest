import React, { useEffect } from 'react';
import '../.semantic/dist/semantic.min.css';
import './styles.css';
import { CookiesProvider, useCookies } from 'react-cookie';

import { RecoilRoot, useRecoilState } from 'recoil';
import { user as userAtom, userdata } from '../data/userAtom';

import SideMenu from '../components/SideMenu';
import CheckOutListPusher from '../components/CheckOutListPusher';
import TopBar from '../components/TopBar';

const InitApp = ({ children }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(async () => {
    console.log("initiate")
    //check user cookie
    if (cookies.userToken !== "123456789") {
      console.log("cookies not found")

      setUser(null)
      localStorage.removeItem('user')
    }
    else if (cookies.userToken === "123456789") {
      //login user and store user in localstorage
      console.log("Signing IN from localStorage")
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  return children
}

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <CookiesProvider>
        <InitApp>
          <>
            <TopBar />
            <div className="contents" style={{ paddingTop: 60, width: "100vw" }}>
              <SideMenu>
                <CheckOutListPusher>
                  <Component {...pageProps} />
                </CheckOutListPusher>
              </SideMenu>
            </div>
          </>
        </InitApp>
      </CookiesProvider>
    </RecoilRoot>
  );
}

export default MyApp;
