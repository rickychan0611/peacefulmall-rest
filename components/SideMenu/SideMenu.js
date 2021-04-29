import { useState } from 'react';
import { useRouter } from 'next/router';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { openSideMenu as openSideMenuAtom } from '../../data/atoms.js';
import styled from "styled-components";
import { user as userAtom } from '../../data/userAtom.js';

const SidebarMenu = () => {
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [activeItem, setActiveItem] = useState('');

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
      }}>
      <Icon name="close" size="large"
        style={{ marginLeft: 10, marginBottom: 20, cursor: "pointer" }}
        onClick={() => setOpenSideMenu(false)} />
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
        <Menu.Item>
          <Icon name="user circle" size="large" />
          <H4>Account</H4>
          <p style={{ margin: 0, color: "grey" }}>{user.firstName + " " + user.lastName}</p>
        </Menu.Item>
        <Menu.Item onClick={() => setUser(null)}>
          <Icon name="sign out" size="large" />
          <H4>Sign Out</H4>
        </Menu.Item>
      </>}
    </Sidebar>
  );
};

const SideMenu = ({ children }) => {
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  return (
    <>
      <Sidebar.Pushable as={Segment} style={{ transform: 'none', overflow: 'hidden' }}>
        <SidebarMenu />
        <Sidebar.Pusher dimmed={openSideMenu}>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

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
