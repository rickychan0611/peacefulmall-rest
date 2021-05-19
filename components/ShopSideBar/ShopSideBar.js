import { useState } from 'react';
import styled from 'styled-components';
import { Grid, List, Header, Modal } from 'semantic-ui-react';
import ReviewFeed from '../ReviewFeed/ReviewFeed.js';
import ShopInfo from './ShopInfo';
import ShopArticleList from './ShopArticleList';
import useTranslation from 'next-translate/useTranslation';

const ShopSideBar = ({ shop }) => {
  const { t } = useTranslation('shop')
  const [open, setOpen] = useState(false);
  return (
    <>
      <ShopInfo shop={shop} />

      <Header>{t`Reviews`}</Header>
      <hr />
      <ReviewFeed />
      <hr />
      <ShopArticleList t={t}/>
    </>
  );
};

const Img = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export default ShopSideBar;
