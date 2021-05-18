import { createRef } from 'react';
import styled from 'styled-components';
import { useIsMobile } from '../util/useScreenSize';

import { Container, Image, Ref, Icon, Sticky } from 'semantic-ui-react';
import CuisineSlider from '../components/CuisineSlider';
import DishCards from '../components/DishCards';
import ShopCards from '../components/ShopCards';
import SearchBanner from '../components/SearchBanner';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import ReviewCards from '../components/ReviewCards';
import CheckOutListPusher from '../components/CheckOutListPusher';
import CurrentAddress from '../components/CurrentAddress';

const Home = () => {
  let contextRef = createRef();

  return (
    <>
      <CheckOutListPusher>
        <Image src="/banner.jpg" />
        <SearchBanner />

        <CurrentAddress />

        <Ref innerRef={contextRef}>
          <Container style={{ marginTop: '2em' }}>
            <CuisineSlider contextRef={contextRef} />
            <Slider topic="Discounted Dishes" icon="food">
              <DishCards type="discount" />
            </Slider>
            <Slider topic="Most Popular Dishes" icon="food">
              <DishCards type="popular" />
            </Slider>
            <Slider topic="Most Loved Restaurants" icon="star">
              <ShopCards />
            </Slider>
            <Slider topic="Fastest Near you" icon="store">
              <ShopCards />
            </Slider>
            <Slider topic="Weekly Top 10" icon="store">
              <ShopCards />
            </Slider>
            <Slider topic="Peaceful Mall Featured" icon="store">
              <ShopCards />
            </Slider>
            <Slider topic="User's Reviews" icon="star">
              <ReviewCards />
            </Slider>
            <Slider topic="Editor's Top Picks" icon="star">
              <ReviewCards />
            </Slider>
          </Container>
        </Ref>
        <Footer />
      </CheckOutListPusher>
    </>
  );
};

const CurrentAddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 48px;
  padding: 0 10px 0 10px;
  border-bottom: 1px solid #b9b8b8;
  padding-bottom: 5px;
  padding-top: 3px;
`;
const Address = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
export default Home;
