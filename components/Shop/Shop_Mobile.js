import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom,
} from '../../data/atoms';

import { Grid } from 'semantic-ui-react';
import Slider from '../Slider';
import PopularDishes from '../PopularDishes';
import ShopSideBar from '../ShopSideBar';
import RestaurantMenu from '../RestaurantMenu';
import ReviewFeed from '../ReviewFeed/index.js';
import axios from 'axios';
import { HOST_URL } from '../../env';

const Shop_Mobile = () => {
  const router = useRouter();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [currentShopProducts, setCurrentShopProducts] = useRecoilState(currentShopProductsAtom);

  return (
    <>
          <div>
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
                'No item found.'
              )}
            </Slider>

            <RestaurantMenu store={currentShop} />
            
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
          </div>
 
    </>
  );
};

const Section = styled.div`
  scroll-margin-top: 240px;
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
  border: solid 2px white;
  height:35px;
  width: 35px;
  object-fit: contain;
  box-shadow: 0px 0px 5px 3px #dddddd;
  margin-right: 5px;
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
