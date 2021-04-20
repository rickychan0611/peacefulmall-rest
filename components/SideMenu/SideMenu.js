import { useState } from 'react';
import { Dropdown, Icon, Input, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { openSideMenu as openSideMenuAtom } from '../../data/atoms.js';

const HorizontalSidebar = () => {
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
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
        boxShadow: "10px 0px 25px rgba(0, 0, 0, .3)"
        }}>
      <Menu.Item>Home</Menu.Item>

      <Menu.Item
      // name="Sign up"
      // active={activeItem === 'browse'}
      // onClick={() => setActiveItem('browse')}
      >
        <Icon name="signup" />
        Sign Up
      </Menu.Item>

      <Menu.Item>
        <Icon name="user circle" />
        Sign In
      </Menu.Item>
    </Sidebar>
  );
};

const SideMenu = ({ children }) => {
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  return (
    <>
      <Sidebar.Pushable as={Segment} style={{ transform: 'none', overflow: 'hidden' }}>
        <HorizontalSidebar />
        <Sidebar.Pusher dimmed={openSideMenu}>
          {children}
          </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

export default SideMenu;
