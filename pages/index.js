import { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Container, Image, Ref, Visibility, Sticky } from 'semantic-ui-react';
import CuisineSlider from '../components/CuisineSlider';
import DishCards from '../components/DishCards';
import ShopCards from '../components/ShopCards';
import RestaurantCards from '../components/RestaurantCards';
import TopBar from '../components/TopBar';
import SearchBanner from '../components/SearchBanner';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import ReviewCards from '../components/ReviewCards';
import CheckOutListPusher from '../components/CheckOutListPusher';

import { currentCat as currentCatAtom } from '../data/atoms.js';
import { useRecoilState, useRecoilValue } from 'recoil';
// import { selections as selectionsAtom } from '../data/atoms.js';
import { stores as storesAtom } from '../data/storeAtoms.js';

const Home = () => {
  const stores = useRecoilValue(storesAtom);
  let contextRef = createRef();
  const [currentCat, setCurrentCat] = useRecoilState(currentCatAtom);

  //get stores from server when component is loaded
  // useEffect(async () => {
  //   console.log(contextRef)
  // }, []);

  return (
    <>
      <CheckOutListPusher>
        <Image src="/banner.jpg" />
        <SearchBanner />
        <Ref innerRef={contextRef}>
          <Container style={{ marginTop: '2em'}}>
            <CuisineSlider contextRef={contextRef} />
            <Slider topic="Discounted Dishes" icon="food">
              <DishCards type="discount"/>
            </Slider>
            <Slider topic="Most Popular Dishes" icon="food">
              <DishCards type="popular"/>
            </Slider>
            <Slider topic="Most Loved Restaurants" icon="star">
              <ShopCards />
            </Slider>
            {/* <Slider topic="Fastest Near you" icon="store">
              <RestaurantCards />
            </Slider>
            <Slider topic="Weekly Top 10" icon="store">
              <RestaurantCards />
            </Slider>
            <Slider topic="Peaceful Mall Featured" icon="store">
              <RestaurantCards />
            </Slider>
            <Slider topic="User's Reviews" icon="star">
              <ReviewCards />
            </Slider>
            <Slider topic="Editor's Top Picks" icon="star">
              <ReviewCards />
            </Slider> */}
          </Container>
        </Ref>
        <Footer />
      </CheckOutListPusher>
    </>
  );
};

const StyledContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;

  div {
    margin: 10px 0 10px 0;
  }
`;

export default Home;
