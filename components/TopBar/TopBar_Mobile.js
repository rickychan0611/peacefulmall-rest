import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Dropdown, Menu, Transition, Image, Icon } from 'semantic-ui-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  openSideMenu as openSideMenuAtom,
  openCheckOutList as openCheckOutListAtom,
  showCheckoutButton as showCheckoutButtonAtom
} from '../../data/atoms.js';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';
import styled from 'styled-components';

const TopBar = () => {
  const router = useRouter();
  const orderItems = useRecoilValue(orderItemsAtom);
  const showCheckoutButton = useRecoilValue(showCheckoutButtonAtom);
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  const [openCheckOutList, setOpenCheckOutList] = useRecoilState(openCheckOutListAtom);
  const [jiggle, setJiggle] = useState(false);

  useEffect(() => {
    setJiggle(!jiggle);
  }, [orderItems]);

  useEffect(() => {
    console.log('showCheckoutButton', showCheckoutButton);
  }, [showCheckoutButton]);

  return (
    <Container>
      <Menu.Item onClick={() => setOpenSideMenu(!openSideMenu)}>
        <Icon name="bars" size="large" style={{ color: '#707070' }} />
      </Menu.Item>
      <LogoWrapper>
        <Logo onClick={() => router.push('/')}>
          <Image size="mini" src="/logo-p.png" />
          <h4 style={{ color: '#4ab976', margin: 0 }}>Peaceful Mall</h4>
        </Logo>
      </LogoWrapper>
      <Menu.Item position="right">
        <Transition animation="jiggle" duration={600} visible={jiggle}>
          <div style={{ marginTop: 5 }}>
            {showCheckoutButton && (
              <Menu.Item style={{ padding: 0 }}>
                <Button
                  style={{
                    backgroundColor: '#ff614d',
                    color: 'white',
                    width: 80,
                    borderRadius: 30
                  }}
                  onClick={() => setOpenCheckOutList(!openCheckOutList)}>
                  <Icon name="shop" /> {orderItems && orderItems.length}
                </Button>
              </Menu.Item>
            )}
          </div>
        </Transition>
      </Menu.Item>
    </Container>
  );
};

const Container = styled(Menu)({
  borderRadius: 0,
  position: 'fixed',
  display: 'relative',
  zIndex: 1000,
  backgroundColor: 'white',
  width: '100vw',
  height: 60,
  top: 0
});
const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Logo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
`;

export default TopBar;
