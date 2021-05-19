import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Button, Transition, Image, Icon, Dropdown } from 'semantic-ui-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  openSideMenu as openSideMenuAtom,
  openCheckOutList as openCheckOutListAtom,
  showCheckoutButton as showCheckoutButtonAtom
} from '../../data/atoms.js';
import { user as userAtom } from '../../data/userAtom';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';
import { CookiesProvider, useCookies } from 'react-cookie';

const TopBar_Desktop = ({t, locales, changeLocale}) => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const orderItems = useRecoilValue(orderItemsAtom);
  const showCheckoutButton = useRecoilValue(showCheckoutButtonAtom);
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  const [openCheckOutList, setOpenCheckOutList] = useRecoilState(openCheckOutListAtom);
  const [jiggle, setJiggle] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    setJiggle(!jiggle);
  }, [orderItems]);

  useEffect(() => {
    console.log('showCheckoutButton', showCheckoutButton);
  }, [showCheckoutButton]);

  return (
    <>
      <Row style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
        <Image size="mini" src="/logo-p.png" />
        <h4 style={{ color: '#4ab976', margin: 0 }}>
          {t('title')}
          <span style={{ color: '#ff614d' }}> | {t('subTitle')}</span>
        </h4>
      </Row>
      <Row>
        {!user ? (
          <>
            <Button
              inverted
              style={{ backgroundColor: '#ff614d', marginRight: 10, color: 'white' }}
              onClick={() => router.push('/sign-up')}>
              {t("signUp")}
            </Button>
            <Button
              compact
              style={{ backgroundColor: 'white' }}
              onClick={() => router.push('/sign-in')}>
              {t("signIn")}
            </Button>
          </>
        ) : (
          <Row
            onClick={() => {
              setOpenSideMenu(!openSideMenu);
            }}>
            <h4 style={{ margin: 0 }}>Hi, {user.firstName} &nbsp; &nbsp;</h4>
            <Icon name="bars" size="large" style={{ color: '#707070', marginRight: 20 }} />
          </Row>
        )}

        <Row>
          <Dropdown
            button
            options={locales}
            defaultValue={cookies.NEXT_LOCALE ? cookies.NEXT_LOCALE : locales[0].value}
            direction="left"
            style={{ backgroundColor: '#dedede', margin: '0 20px 0 10px' }}
            onChange={changeLocale}
          />
        </Row>

        <Transition animation="jiggle" duration={600} visible={jiggle}>
          {showCheckoutButton && (
            <Button
              style={{
                backgroundColor: '#ff614d',
                marginRight: 10,
                color: 'white',
                width: 80,
                borderRadius: 30
              }}
              onClick={() => setOpenCheckOutList(!openCheckOutList)}>
              <Icon name="shop" /> {orderItems && orderItems.length}
            </Button>
          )}
        </Transition>
      </Row>
    </>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

export default TopBar_Desktop;
