import styled from 'styled-components';
import { useRouter } from 'next/router';
import { HOST_URL } from '../../env';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom,
} from '../../data/atoms';

import Slider from '../Slider';
import PopularDishes from '../PopularDishes';
import RestaurantMenu from '../RestaurantMenu';
import ReviewFeed from '../ReviewFeed';
import BottomAppBar from '../BottomAppBar';

const Shop_Mobile = () => {
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [currentShopProducts, setCurrentShopProducts] = useRecoilState(currentShopProductsAtom);

  return (
    <div style={{marginTop: -70}}>
      <Section id="shopTop" style={{height: 70}} ></Section>
      <Wrapper>
        {currentShop.logo ? (
          <Avatar src={HOST_URL + '/storage/' + currentShop.logo} />
        ) : (
          <Avatar src="/avatar-placeholder.png" />
        )}
        <div style={{ width: 'calc(100% - 50px)' }}>
          <Title>{currentShop.name}</Title>
        </div>
      </Wrapper>
      <Description style={{ marginBottom: 20 }}>{currentShop.description}</Description>

      <Slider topic="Popular Items" hideViewAll>
        {currentShopProducts ? (
          <PopularDishes products={currentShopProducts} />
        ) : (
          <div style={{marginBottom: 30}}>No item found.</div>
        )}
      </Slider>

      <Section id="fullMenu" >
        <RestaurantMenu store={currentShop} />
      </Section>

      <br />
      <hr />
      <br />
      <Section id="reviews">
        <ReviewFeed />
      </Section>
      <br />
      <hr />
      <br />
      <Slider topic="Restaurants you may like" hideViewAll>
        {/* <PopularDishes /> */}
      </Slider>
      <BottomAppBar />

    </div>
  );
};

const Section = styled.div`
  scroll-margin-top: 80px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 5px;
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
export default Shop_Mobile;
