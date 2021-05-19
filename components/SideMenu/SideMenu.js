import { useRouter } from 'next/router';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { openSideMenu as openSideMenuAtom } from '../../data/atoms.js';
import styled from "styled-components";
import { user as userAtom } from '../../data/userAtom.js';
import {  useCookies } from 'react-cookie';
import { locales, changeLocale } from '../TopBar/TopBar';

const SidebarMenu = () => {
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      // icon="labeled"
      onHide={() => setOpenSideMenu(false)}
      vertical
      visible={openSideMenu}
      style={{
        backgroundColor: 'white',
        position: "fixed",
        boxShadow: "10px 0px 25px rgba(0, 0, 0, .3)",
        padding: "80px 10px 10px 10px",
      }}
      onClick={() => setOpenSideMenu(false)}
    >
      <Icon name="close" size="large"
        style={{ marginLeft: 10, marginBottom: 20, cursor: "pointer" }} />
      <Menu.Item onClick={() => router.push('/')}>
        <Icon name="home" size="large" />
        <H4>Home </H4>
      </Menu.Item>
      {!user ? <>
        <Menu.Item onClick={() => router.push('/sign-in')}>
          <Icon name="sign in" size="large" />
          <H4>Sign In</H4>
        </Menu.Item>
        <Menu.Item onClick={() => router.push('/sign-up')}>
          <Icon name="signup" size="large" />
          <H4>Sign Up</H4>
        </Menu.Item>
      </> : <>
        <Menu.Item onClick={() => router.push('/consumer/edit-profile')}>
          <Icon name="user circle" size="large" />
          <H4>Account</H4>
          <p style={{ margin: 0, color: "grey" }}>{user.firstName + " " + user.lastName}</p>
        </Menu.Item>
        <Menu.Item onClick={() => {
          removeCookie('userToken')
          localStorage.removeItem('user')
          setUser(null)
          router.push('/')
        }}>
          <Icon name="sign out" size="large" />
          <H4>Sign Out</H4>
        </Menu.Item>
      </>}
      <Menu.Item >
        <Row>
          {/* <H4>Language</H4> */}
          {locales.map((item) => {
            // console.log("item", activeItem)
            return (
              <LocaleBtn selected={router.locale === item.value}
              onClick={()=>changeLocale(true,{value : item.value})}>{item.text}</LocaleBtn>
            )
          })}
        </Row>
      </Menu.Item>
    </Sidebar>
  );
};

const SideMenu = ({ children }) => {
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  return (
    <>
      <Sidebar.Pushable style={{ transform: 'none', overflow: 'hidden' }}>
        <SidebarMenu />
        <Sidebar.Pusher dimmed={openSideMenu}>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;
const LocaleBtn = styled.div`
  background-color: ${p => p.selected ? "#a5a5a5" : "white"};
  color: ${p => !p.selected ? "#7c7c7c" : "white"};
  border: 1px solid #a5a5a5;
  border-radius: 15px;
  padding: 8px 15px 8px 15px;
  font-size: 12px;
  font-weight: bold;
`;
const H4 = styled.h4`
  margin: 0;
  display: flex;
  justify-content: space-between;
`;
const Item = styled(Menu.Item)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default SideMenu;
