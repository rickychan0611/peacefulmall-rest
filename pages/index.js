import { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import { Container, Image, Ref, Visibility, Sticky } from 'semantic-ui-react';
import CuisineSlider from '../components/CuisineSlider';
import DishCards from '../components/DishCards';
import RestaurantCards from '../components/RestaurantCards';
import TopBar from '../components/TopBar';
import SearchBanner from '../components/SearchBanner';
import Footer from '../components/Footer';
import ReviewsSlider from '../components/ReviewsSlider';
import Slider from '../components/Slider';

const Home = () => {
  const [calculations, setCalculations] = useState({});

  let contextRef = createRef();

  return (
    <>
      <Image src="/banner.jpg" />
      <SearchBanner />
      <Ref innerRef={contextRef}>
        <Container style={{ marginTop: '2em' }}>
          <CuisineSlider contextRef={contextRef} />
          <Slider topic="Discounted Dishes">
            <DishCards />
          </Slider>
          <Slider topic="Most Popular Dishes">
            <DishCards />
          </Slider>
          <Slider topic="Most Loved Restaurants">
            <RestaurantCards />
          </Slider>
          <Slider topic="Fastest Near you">
            <RestaurantCards />
          </Slider>
          <Slider topic="Weekly Top 10">
            <RestaurantCards />
          </Slider>
          <Slider topic="Peaceful Mall Featured">
            <RestaurantCards />
          </Slider>
          <ReviewsSlider topic="User's Reviews" />
          <br />
          <br />
          <ReviewsSlider topic="Editor's Top Picks" />
        </Container>
      </Ref>

      <Footer />
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
