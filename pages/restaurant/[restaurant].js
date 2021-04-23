import { useEffect, useState, createRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';

import styled from 'styled-components';
import { data } from '../../data/restaurants';
import {
  Grid,
  Container,
  Header,
  Segment,
  Item,
  Label,
  Divider,
  Ref,
  Sticky
} from 'semantic-ui-react';
import SearchBanner from '../../components/SearchBanner/SearchBanner.js';
import Slider from '../../components/Slider/Slider.js';
import PopularDishes from '../../components/PopularDishes/PopularDishes.js';
import RestaurantSideBar from '../../components/RestaurantSideBar/RestaurantSideBar.js';
import MenuItem from '../../components/MenuItem/MenuItem.js';
import RestaurantMenu from '../../components/RestaurantMenu/RestaurantMenu.js';

import _ from 'lodash';
import dishes from '../../data/dishes';
import RestaurantTaps from '../../components/RestaurantTaps/RestaurantTaps.js';
import RestaurantCards from '../../components/RestaurantCards/RestaurantCards.js';

const catNames = [
  'Soup',
  'Cold Dishes',
  'Rice Dishes',
  'Beef & Lamb',
  'Pork',
  'Chicken',
  'Seafood',
  'Vegetables',
  'Soup Noodles',
  'Stir-Fried',
  'Dim Sum',
  'Beverages'
];

const restaurant = () => {
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const router = useRouter();
  const isDesktop = useDesktopMediaQuery();
  const labelRef = createRef();
  console.log(router.query.restaurant);

  return (
    <>
      <div style={{ position: 'fixed', top: 60 }}>
        <SearchBanner />
      </div>
      <Container style={{ marginTop: 100 }}>
        <Grid column={2}>
          <Grid.Column
            width={4}
            style={{
              height: 'calc(100vh - 140px)',
              overflowY: 'scroll'
            }}>
            <RestaurantSideBar />
          </Grid.Column>

          <Grid.Column
            width={12}
            style={{
              paddingLeft: 20,
              height: 'calc(100vh - 140px)',
              overflowY: 'scroll',
              scrollBehavior: 'smooth'
            }}>
            <Ref innerRef={labelRef}>
              <div>
                <Title>Peaceful Restaurant</Title>
                <Description style={{ marginBottom: 60 }}>
                  globally inspired restaurant focused on using the freshest ingredients and making
                  our food and drinks from scratch. We believe in using the best proteins and
                  produce that is locally sourced and thinking consciously about how the product is
                  produced, raised and grown.
                </Description>

                <Slider topic="Popular Items">
                  <PopularDishes hideViewAll />
                </Slider>

                <RestaurantTaps labelRef={labelRef} />

                {/* <RestaurantMenu labelRef={labelRef}/> */}
              </div>
            </Ref>
          </Grid.Column>
        </Grid>
        {/* <Slider topic="Fastest Near you">
            <RestaurantCards/>
          </Slider> */}
      </Container>
    </>
  );
};

const CatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background-color: white;
  padding-bottom: 10px;
  /* height: ${(p) => (p.isDesktop ? '170px' : '100px')}; */
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* height: ${(p) => (p.isDesktop ? '170px' : '100px')}; */
`;
const H4 = styled.h4`
  margin: 0;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;
const CatTitle = styled.div`
  margin-bottom: 20px;
  padding-top: 180px;
  margin-top: -160px;
  font-size: 24px;
  font-weight: bold;
`;
const Img = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
`;
const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default restaurant;
