import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Button, Transition, Image, Icon, Dropdown, Menu } from 'semantic-ui-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  openSideMenu as openSideMenuAtom,
  openCheckOutList as openCheckOutListAtom,
  showCheckoutButton as showCheckoutButtonAtom
} from '../../data/atoms.js';
import { user as userAtom } from '../../data/userAtom';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';
import useTranslation from 'next-translate/useTranslation';

const TopBar_Desktop = ({ locales, changeLocale }) => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const orderItems = useRecoilValue(orderItemsAtom);
  const showCheckoutButton = useRecoilValue(showCheckoutButtonAtom);
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  const [openCheckOutList, setOpenCheckOutList] = useRecoilState(openCheckOutListAtom);
  const [jiggle, setJiggle] = useState(false);
  const { t } = useTranslation('home');

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
          <>
            <Item
              onClick={() => {
                setOpenSideMenu(!openSideMenu)
              }}>
              <Icon name="file alternate outline" size="large" />
              <H4>{t('Menu')}</H4>
            </Item>

            <Item
              onClick={() => {
                router.push('/')
              }}>
              <Icon name="home" size="large" />
              <H4>{t('home')}</H4>
            </Item>

            <Item
              onClick={() => {
                router.push('/consumer/edit-profile')
              }}>
              <Icon name="user circle" size="large" />
              <H4>Hi, {user.name}</H4>
            </Item>

            {/* <Row
              onClick={() => {
                setOpenSideMenu(!openSideMenu);
              }}>

              <h4 style={{ margin: 0 }}>Hi, {user.name} &nbsp; &nbsp;</h4>
              <Icon name="user circle" size="large" style={{ color: '#707070', marginRight: 20 }} />



            </Row> */}
          </>
        )}

        <Item>
          <Dropdown
            // button
            options={locales}
            direction="left"
            style={{ margin: '0 20px 0 10px' }}
            onChange={changeLocale}
            value={router.locale}
          />
        </Item>

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
const Item = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  border-left: 1px solid #cacaca;
  height: 100%;
  padding: 10px 20px 10px 20px;
  cursor: pointer;
`;
const H4 = styled.h4`
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

export default TopBar_Desktop;
