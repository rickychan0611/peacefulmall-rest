import styled from 'styled-components';
import { Container, Image } from 'semantic-ui-react';
import CuisineSlider from '../components/CuisineSlider';
import DishesSlider from '../components/DishesSlider';
import RestaurantsSlider from '../components/RestaurantsSlider';
import TopBar from '../components/TopBar';
import SearchBanner from '../components/SearchBanner';
import Footer from '../components/Footer';
import ReviewsSlider from '../components/ReviewsSlider';

const Home = () => {

  return (
    <>
      <TopBar />
      <Image src="/banner.jpg" />
      <SearchBanner />
      <Container style={{ marginTop: '2em' }}>
        <CuisineSlider/>
        <DishesSlider topic="Discounted Dishes"/>
        <DishesSlider topic="Top Rated Dishes"/>
        <RestaurantsSlider topic="Most Loved Restaurants"/>
        <RestaurantsSlider topic="Fastest Near you"/>
        <RestaurantsSlider topic="Weekly Top 10"/>
        <RestaurantsSlider topic="Peaceful Mall Featured"/>
        <ReviewsSlider topic="User's Reviews"/>
        <ReviewsSlider topic="Editor's Top Picks"/>
      </Container>
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
