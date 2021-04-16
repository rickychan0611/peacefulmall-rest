import { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
// import { repos as reposAtom, view as viewAtom } from '../data/atoms.js';
import { Container, Image } from 'semantic-ui-react';
import CuisineSlider from '../components/CuisineSlider';
import DiscountedDishesSlider from '../components/DiscountedDishesSlider';
import MostLovedRestaurantsSlider from '../components/MostLovedRestaurantsSlider';
import CardSlider from '../components/CardSlider';
import TopBar from '../components/TopBar';
import SearchBanner from '../components/SearchBanner';
import Footer from '../components/Footer';
import TopRatedDishesSlider from '../components/TopRatedDishesSlider';
import FeaturedReviewsSlider from '../components/FeaturedReviewsSlider';

const Home = () => {
  // const [repos, setRepos] = useRecoilState(reposAtom);
  // const view = useRecoilValue(viewAtom);

  useEffect(async () => {
    // const url = `https://reqres.in/api/users?page=${view}`;
    // const resp = await fetch(url);
    // const body = await resp.json();
    // setRepos(body.data);
  }, []);

  return (
    <>
      <TopBar />
      <Image src="/banner.jpg" />
      <SearchBanner />
      <Container style={{ marginTop: '2em' }}>
        <CuisineSlider/>
        <DiscountedDishesSlider />
        <TopRatedDishesSlider />
        <MostLovedRestaurantsSlider topic="Most Loved Restaurants"/>
        <MostLovedRestaurantsSlider topic="Fastest Near you"/>
        <MostLovedRestaurantsSlider topic="Weekly Top 10"/>
        <MostLovedRestaurantsSlider topic="Peaceful Mall Featured"/>
        <FeaturedReviewsSlider topic="User's Reviews"/>
        <FeaturedReviewsSlider topic="Editor's Top Picks"/>
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
