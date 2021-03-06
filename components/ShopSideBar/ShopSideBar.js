import { useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import ShopInfo from './ShopInfo';
import { useIsDesktop } from '../../util/useScreenSize';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { selectedPage as selectedPageAtom, currentShop as currentShopAtom } from '../../data/atoms.js';

const ShopSideBar = () => {
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageAtom);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const profilePic = currentShop?.images && process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(currentShop?.images)[0]
  const url = '/shop/' + currentShop?.name + '/' + currentShop?.id

  useEffect(() => {
    console.log("@@@@@@@currentShop", currentShop)
  }, [currentShop])

  return (
    <>
      {isDesktop && currentShop?.images && <Img src={profilePic} />}

      <ButtonsWrapper>

        <Button onClick={() => {
          setSelectedPage("overview")
          router.push(url + '/')
        }}
          selected={selectedPage === "overview"}>
          Overview<Icon name="check" />
        </Button>

        <Button onClick={() => {
          setSelectedPage("menu")
          router.push(url + '/menu')
        }}
          selected={selectedPage === "menu"}>
          Full Menu <Icon name="bars" /></Button>

        <Button onClick={() => {
          setSelectedPage("articles")
          router.push(url + '/articles')
        }}
          selected={selectedPage === "articles"}>
          Featured Articles <Icon name="newspaper" /></Button>

        <Button onClick={() => {
          setSelectedPage("reviews")
          router.push(url + '/reviews')
        }}
          selected={selectedPage === "reviews"}>
          User Reviews <Icon name="star" /></Button>

      </ButtonsWrapper>

      <ShopInfo shop={currentShop} />

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

const ButtonsWrapper = styled.div`
  margin-bottom: 30px;
`;
const Button = styled.div({
  margin: 5,
  padding: "6px 25px",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: 25,
  fontSize: 12,
  fontWeight: "bold",
  backgroundColor: p => p.selected ? "#ee3160" : "#ffffff",
  color: p => p.selected ? "white" : "black",
  border: "1px solid grey",
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
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
  margin-bottom: 20px;
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
