import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button, Transition, Image, Icon, Dropdown, Menu } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../../data/userAtom';
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage';

const cats = [
  {
    name: '资讯',
    link: 'https://media.peacefulmall.com/'
  },
  {
    name: '健康',
    link: 'https://health.peacefulmall.com/'
  },
  {
    name: '商城',
    link: 'https://peacefulshops.com/'
  },
  {
    name: '美食',
    link: 'https://peaceful-restaurant.vercel.app/'
  },
  {
    name: '生态',
    link: 'https://eco.peacefulmall.com/'
  },
  {
    name: '金融',
    link: 'https://finance.peacefulmall.com/'
  },
  {
    name: '旅行',
    link: 'https://travel.peacefulmall.com/'
  },
  {
    name: '教育',
    link: 'https://education.peacefulmall.com/'
  }
];

export const locales = [
  {
    key: 'en',
    text: 'ENG',
    value: 'en'
  },
  {
    key: 'zh-CN',
    text: '简体',
    value: 'zh-CN'
  }
];

export const changeLocale = async (e, { value }) => {
  console.log(value);
  await setLanguage(value);
  const date = new Date();
  const expireMs = 100 * 365 * 24 * 60 * 60 * 1000; // 100 days
  date.setTime(date.getTime() + expireMs);
  document.cookie = `NEXT_LOCALE=${value};expires=${date.toUTCString()};path=/`;
};

const TopNav = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const { t } = useTranslation('home');

  return (
    <Container>
      <Row style={{ gap: 30 }}>
        {cats.map((cat, i) => {
          return (
            <Cat
              onClick={() => {
                router.push(cat.link);
              }}>
              {cat.name}
            </Cat>
          );
        })}
      </Row>
      {/* <Row>
        {!user ? (
          <>
            <div
              compact
              style={{marginRight: 20 }}
              onClick={() => router.push('/sign-up')}>
              {t('signUp')}
            </div>
            <div
              compact
              style={{ marginRight: 20 }}
              onClick={() => router.push('/sign-in')}>
              {t('signIn')}
            </div>
          </>
        ) : (
          <>
            <Item
              onClick={() => {
                router.push('/');
              }}>
              <Icon name="home" size="large" />
              <H4>{t('home')}</H4>
            </Item>

            <Item
              onClick={() => {
                router.push('/consumer/orders');
              }}>
              <Icon name="file alternate outline" size="large" />
              <H4>{t('myOrder')}</H4>
            </Item>

            <div style={{ position: 'relative' }}>
              <Item
                onClick={() => {
                  setOpenDropdownMenu('user');
                }}>
                <Icon name="user circle" size="large" />
                <H4>Hi, {user.first_name}</H4>
              </Item>

              {openDropdownMenu === 'user' && (
                <DropDownContainer>
                  <DropDownMenu>
                    <MenuItem
                      className="front"
                      onClick={() => {
                        router.push('/consumer/edit-profile');
                        setOpenDropdownMenu(false);
                      }}>
                      My Account
                    </MenuItem>

                    <MenuItem
                      last
                      className="last"
                      onClick={() => {
                        removeCookie('userToken');
                        localStorage.removeItem('user');
                        setUser(null);
                        setOpenSideMenu(false);
                        setOpenDropdownMenu(false);
                        router.push('/');
                      }}>
                      Logout
                    </MenuItem>
                  </DropDownMenu>
                </DropDownContainer>
              )}
            </div>
          </>
        )}

        <Item style={{ padding: 0 }}>
          <Dropdown
            // button
            options={locales}
            direction="left"
            style={{ margin: '0 0px 0 10px' }}
            onChange={changeLocale}
            value={router.locale}
          />
        </Item>
      </Row> */}
    </Container>
  );
};

const Container = styled.div`
  z-index:10000;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  width: 100%;
  padding: 6px 40px 6px 40px;
  position: fixed;
  top: 0;
  background-color: ${p => p.theme.lightGreen};
`;

const Cat = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  cursor: pointer;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  color: #6d7175;
`;
const Item = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  /* border-left: 1px solid #cacaca; */
  height: 100%;
  padding: 10px 20px 10px 20px;
  cursor: pointer;
`;
const H4 = styled.h4`
  margin: 0;
  display: flex;
  justify-content: space-between;
`;
const DropDownContainer = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 5px;
  cursor: pointer;
`;
const DropDownMenu = styled.div`
  background-color: white;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  border: 1px solid #adadad;
  border-radius: 0px 0px 15px 15px;
  text-align: left;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  .front:hover {
    background-color: #bebe51;
  }
  .last:hover {
    background-color: #bebe51;
    border-radius: 0px 0px 15px 15px;
  }
`;
const MenuItem = styled.h4`
  margin: 0;
  display: flex;
  justify-content: space-between;
  padding: 15px 10px 15px 10px;
  border-bottom: ${(p) => !p.last && '1px solid #b3b3b3'};
  background-color: ${(p) => p.selected && '#bebe51'};
  border-radius: ${(p) => p.selected && p.last && '0px 0px 15px 15px'};
`;
export default TopNav;
