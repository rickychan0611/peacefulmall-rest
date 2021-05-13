import { useState } from 'react';
import styled from 'styled-components';
import { Grid, List, Header, Modal } from 'semantic-ui-react';
import ReviewFeed from '../ReviewFeed/ReviewFeed.js';
import ShopInfo from './ShopInfo';
import ShopArticleList from './ShopArticleList';

const ShopSideBar = ({ shop }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ShopInfo shop={shop} />

      <Header>Reviews</Header>
      <hr />
      <ReviewFeed />
      <hr />
      <ShopArticleList />
    </>
  );
};

const Img = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export default ShopSideBar;
