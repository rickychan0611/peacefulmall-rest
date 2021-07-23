import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import RestaurantMenu from '../RestaurantMenu';
import ReviewFeed from '../ReviewFeed';
import BottomNavBar from '../BottomNavBar';
import ShopArticleList from '../ShopSideBar/ShopArticleList';
import { Ref } from 'semantic-ui-react';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';
import { 
  selectedPage as selectedPageAtom
} from '../../data/atoms';

const Shop_Mobile_Menu = () => {
  const contextRef = useRef();
  const { t } = useTranslation('shop');
  const [, setSelectedPage] = useRecoilState(selectedPageAtom);

  useEffect(() => {
    setSelectedPage("menu")
  }, [])

  return (
    <div style={{ marginTop: -100 }}>

      <Ref innerRef={contextRef}>
        <Section id="fullMenu">
          <RestaurantMenu t={t} contextRef={contextRef} />
        </Section>
      </Ref>
      <br />
      <hr />
      <br />
      <Section id="reviews">
        <Title style={{ fontSize: 28 }}>{t`Reviews`}</Title>
        <ReviewFeed />
      </Section>
      <br />
      <hr />
      <br />
      <Section id="articles">
        <ShopArticleList />
      </Section>
      <br />
      <hr />
      <br />
      <BottomNavBar />
    </div>
  );
};

const Section = styled.div`
  /* scroll-margin-top: 80px; */
  :before {
    content:"";
    display:block;
    height:80px; /* fixed header height*/
    margin:-80px 0 0; /* negative fixed header height */
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 5px;
`;

const Img = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  height: 40px;
  width: 40px;
  margin-right: 5px;
  object-fit: contain;
  /* box-shadow: 0px 0px 5px 3px #dddddd; */
  /* border: solid 1px white; */
`;
const Title = styled.h1`
  font-size: 7vw;
  margin: 0;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default Shop_Mobile_Menu;
