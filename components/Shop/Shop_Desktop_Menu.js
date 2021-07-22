import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom,
  selectedPage as selectedPageAtom
} from '../../data/atoms';
import Shop_Desktop_Header from './Shop_Desktop_Header';

import { Grid, Ref } from 'semantic-ui-react';
import Slider from '../Slider';
import PopularDishes from '../PopularDishes';
import ShopSideBar from '../ShopSideBar';
import RestaurantMenu from '../RestaurantMenu';
import ReviewFeed from '../ReviewFeed/index.js';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

const Shop_Desktop = () => {
  const contextRef = useRef();
  const { t } = useTranslation('shop');
  const router = useRouter();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [currentShopProducts, setCurrentShopProducts] = useRecoilState(currentShopProductsAtom);
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageAtom);

  useEffect(() => {
    setSelectedPage("menu")
  }, [])

  return (
    <div>
      <Grid>
        <Grid.Column width={4} style={{ paddingBottom: 100 }}>
          <ShopSideBar shop={currentShop} />
        </Grid.Column>

        <Grid.Column width={12} style={{ padding: '30px 20px 80px 20px' }}>
          <div>
          <Shop_Desktop_Header />

            <Ref innerRef={contextRef}>
              <RestaurantMenu t={t} contextRef={contextRef} />
            </Ref>
            
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const Section = styled.div`
  /* scroll-margin-top: 240px; */
  :before {
    content: '';
    display: block;
    height: 240px; /* fixed header height*/
    margin: -240px 0 0; /* negative fixed header height */
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;
const Avatar = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: solid 2px white;
  height: 60px;
  width: 60px;
  object-fit: contain;
  box-shadow: 0px 0px 5px#a5a5a5;
  margin-right: 20px;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default Shop_Desktop;
