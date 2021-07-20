import { useState } from 'react';
import styled from 'styled-components';
import { Grid, List, Header } from 'semantic-ui-react';
import ReviewFeed from '../ReviewFeed/ReviewFeed.js';
import ShopInfo from './ShopInfo';
import ShopArticleList from './ShopArticleList';
import useTranslation from 'next-translate/useTranslation';
import { useIsDesktop } from '../../util/useScreenSize';
import router from 'next/router';

const ShopSideBar = ({ shop }) => {
  const { t } = useTranslation('shop');
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const profilePic = shop.images && process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(shop.images)[0]
  const url = '/shop/' + shop.name + '/' + shop.id

  return (
    <>
      {isDesktop && shop.images && <Img src={profilePic} />}
      <Button onClick={() => router.push(url + '/')}> Overview </Button>
      <Button onClick={() => router.push(url + '/menu')}> Menu </Button>
      <Button onClick={() => router.push(url + '/photos')}> Photos </Button>
      <Button onClick={() => router.push(url + '/articles')}> Articles </Button>
      <Button onClick={() => router.push(url + '/reviews')}> Reviews </Button>
      <ShopInfo shop={shop} />

      {/* <Row>
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
      <ShopArticleList t={t} /> */}
    </>
  );
};

const Button = styled.div({
  margin: 5,
  padding: "6px 15px",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: 25,
  fontSize: 12,
  fontWeight: "bold",
  // backgroundColor: "#e8ebe9",
  color: "black",
  border: "1px solid grey"
});

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 10px 0px;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  height: 20vh;
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
