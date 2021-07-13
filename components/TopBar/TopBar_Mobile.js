import styled from 'styled-components';
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

const TopBar = () => {
  const router = useRouter();
  const orderItems = useRecoilValue(orderItemsAtom);
  const showCheckoutButton = useRecoilValue(showCheckoutButtonAtom);
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  const [openCheckOutList, setOpenCheckOutList] = useRecoilState(openCheckOutListAtom);
  const [jiggle, setJiggle] = useState(false);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    if (orderItems && orderItems.length !== 0) {
      let q = 0;
      orderItems.forEach((item) => {
        q = q + item.quantity;
      });
      setQty(q);
    }
    else setQty(0)
  }, [orderItems]);

  useEffect(() => {
    setJiggle(!jiggle);
  }, [orderItems]);

  useEffect(() => {
    console.log('showCheckoutButton', showCheckoutButton);
  }, [showCheckoutButton]);

  return (
    <>
      <div style={{ color: '#707070', }}
        onClick={() => setOpenSideMenu(!openSideMenu)}>
        <Icon name="bars" size="large" />
        <Icon name="user circle outline" size="large" />
      </div>
      <Logo onClick={() => router.push('/')}>
        <Image size="mini" src="/logo-p.png" />
        <h4 style={{ color: '#4ab976', margin: 0 }}>Peaceful Mall</h4>
      </Logo>
      <div>
        <Transition animation="jiggle" duration={600} visible={jiggle}>
          {/* <div style={{ marginTop: 5 }}> */}
          {showCheckoutButton && (
              <div>
                <Button
                  style={{
                    backgroundColor: "#ff614d",
                    color: "white",
                    width: 60,
                    borderRadius: 30,
                    marginLeft: 10,
                    padding: "10px 0 10px 0",
                  }}
                  onClick={() => setOpenCheckOutList(!openCheckOutList)}
                >
                  <Icon name="shop" />{" "} {qty}
                </Button>
              </div>
            )}
          {/* </div> */}
        </Transition>
      </div>
    </>
  );
};

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
`;

export default TopBar;
