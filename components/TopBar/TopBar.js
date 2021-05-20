import { useIsDesktop } from '../../util/useScreenSize';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage';

import TopBar_Mobile from './TopBar_Mobile.js';
import TopBar_Desktop from './TopBar_Desktop.js';

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
  },
  {
    key: 'zh-TW',
    text: '繁體',
    value: 'zh-TW'
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

const TopBar = () => {
  const isDesktop = useIsDesktop();
  const { t } = useTranslation('home');

  return (
    <Container>
      <SpaceBetween>
        {!isDesktop ? (
          <TopBar_Mobile t={t} changeLocale={changeLocale} locales={locales} />
        ) : (
          <TopBar_Desktop t={t} changeLocale={changeLocale} locales={locales} />
        )}
      </SpaceBetween>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 0;
  position: fixed;
  display: relative;
  z-index: 1000;
  background-color: white;
  width: 100%;
  height: 63px;
  top: 0;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
`;
const SpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

export default TopBar;
