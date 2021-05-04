import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';

import styled from 'styled-components';
import { Grid, Container, Visibility } from 'semantic-ui-react';
import SearchBanner from '../../components/SearchBanner/';
import Slider from '../../components/Slider/';
import PopularDishes from '../../components/PopularDishes/';
import RestaurantSideBar from '../../components/RestaurantSideBar/';
import RestaurantMenu from '../../components/RestaurantMenu/';
import Footer from '../../components/Footer/';
import ReviewFeed from '../../components/ReviewFeed/index.js';

const restaurant = () => {

  const router = useRouter();
  const isDesktop = useDesktopMediaQuery();
  const [hide, setHide] = useState(false);

  const handleScroll = (e, { calculations }) => {
    console.log(calculations.pixelsPassed);
    // calculations.pixelsPassed > 350 ? setHide('hidden') : setHide('active');
  };

 return (
    <div id="top">

      <SearchBannerWrapper>
        <SearchBanner hide={hide} />
      </SearchBannerWrapper>

      <Container style={{ padding: "150px 0px 0px 0px" }}>

        <Grid>
          <Grid.Column
            width={4}
            style={{
              // height: 'calc(100vh - 100px)',
              // overflowY: 'scroll',
              paddingBottom: 100
            }}>
            <RestaurantSideBar />
          </Grid.Column>


          <Grid.Column
            width={12}
            style={{
              padding: "0 20px",
              // height: 'calc(100vh - 100px)',
            }}>
              <Visibility offset={[10, 10]} onUpdate={handleScroll}>
                <div>

                  <Wrapper>
                    <Avatar src='/logo-p.png' />
                    <div style={{ width: "calc(100% - 50px)" }}>
                      <Title>Peaceful Restaurant</Title>
                      <Description style={{ marginBottom: 60 }}>
                        globally inspired restaurant focused on using the freshest ingredients and
                        making our food and drinks from scratch. We believe in using the best proteins
                        and produce that is locally sourced and thinking consciously about how the
                        product is produced, raised and grown.
                      </Description>
                    </div>
                  </Wrapper>

                  <Slider topic="Popular Items" hideViewAll>
                    <PopularDishes />
                  </Slider>

                  <RestaurantMenu />
                  <br />
                  <hr />
                  <br />
                  <Section id="reviews">
                  <ReviewFeed/>
                  </Section>
                  <br />
                  <hr />
                  <br />
                  <Slider topic="Restaurants you may like" hideViewAll>
                    <PopularDishes />
                  </Slider>
                </div>
              </Visibility>
          </Grid.Column>
        </Grid>


      </Container>
      <Footer />

    </div>
  );
};

const Section = styled.div`
  scroll-margin-top: 240px;
  `;
const Wrapper = styled.div`
  display : flex;
  flex-direction: row;
  flex-wrap: nowrap;
  `;
const Avatar = styled.img`
  display : flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: solid 2px white;
  height: 60px;
  width: 60px;
  padding: 5px;
  object-fit: contain;
  box-shadow: 0px 0px 5px 3px #dddddd;
  margin-right: 20px;
   `;
const SearchBannerWrapper = styled.div`
z-index: 1000;
  position: fixed;
  top: 55px;
  .active {
    /* margin-top: 60; */
    visibility: visible;
    transition: all 200ms ease-in;
  }
  .hidden {
    /* margin-top: 60; */
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, -100%);
  }
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
export default restaurant;
