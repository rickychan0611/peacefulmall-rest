import { useState } from 'react';
import styled from 'styled-components';
import { Grid, List, Header, Modal } from 'semantic-ui-react';
import ReviewFeed from '../ReviewFeed/ReviewFeed.js';
import ShopInfo from './ShopInfo';
import ShopArticleList from './ShopArticleList';
import useTranslation from 'next-translate/useTranslation';

const ShopSideBar = ({ shop }) => {
  const { t } = useTranslation('shop');
  const [open, setOpen] = useState(false);
  return (
    <>
      <ShopInfo shop={shop} />

      <Row>
        <Header style={{ margin: 0 }}>{t`Reviews`}</Header>
        <a href="#reviews">View all</a>
      </Row>
      <hr />
      <ReviewContainer>
        <ReviewWrapper>
          <ReviewFeed />
        </ReviewWrapper>
        <Cover>
          <ViewAll>
            <a href="#reviews">View all reviews</a>
          </ViewAll>
        </Cover>
      </ReviewContainer>
      <hr />
      <ShopArticleList t={t} />
    </>
  );
};

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 10px 0px;
`;

const ReviewContainer = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
`;

const ReviewWrapper = styled.div`
  position: absolute;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  height: 400px;
  width: 100%;
  overflow: auto;
  padding-bottom: 100px;
`;

const ViewAll = styled.h4`
  width: 100%;
  text-align: center;
  margin: 0;
`;

const Cover = styled.div`
  position: absolute;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  height: 150px;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
`;

export default ShopSideBar;
