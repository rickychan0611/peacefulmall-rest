import { useEffect, useState, createRef } from 'react';
import { useRouter } from 'next/router';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';
import { useRecoilState } from 'recoil';
import { activeTabIndex as activeTabAtom } from '../../data/atoms.js';

import styled from 'styled-components';
import { Grid, Container, Ref, Visibility } from 'semantic-ui-react';
import SearchBanner from '../../components/SearchBanner/SearchBanner.js';
import Slider from '../../components/Slider/Slider.js';
import PopularDishes from '../../components/PopularDishes/PopularDishes.js';
import RestaurantSideBar from '../../components/RestaurantSideBar/RestaurantSideBar.js';

import _ from 'lodash';
import RestaurantTabs from '../../components/RestaurantTabs/RestaurantTabs.js';

const restaurant = () => {
  const [activeTabIndex, setActiveTabIndex] = useRecoilState(activeTabAtom);

  const router = useRouter();
  const isDesktop = useDesktopMediaQuery();
  const labelRef = createRef();
  const [hide, setHide] = useState(false);

  const handleScroll = (e, { calculations }) => {
    console.log(calculations.pixelsPassed);
    calculations.pixelsPassed > 350 ? setHide('hidden') : setHide('active');
  };

  useEffect(() => {
    return () => setActiveTabIndex(0);
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <SearchBannerWrapper>
        <SearchBanner hide={hide} />
      </SearchBannerWrapper>
      <Container style={{ paddingTop: hide === "hidden" ? 110 : 180}}>
        <Grid column={2}>
          <Grid.Column
            width={4}
            style={{
              height: 'calc(100vh - 100px)',
              overflowY: 'scroll',
              paddingBottom: 100
            }}>
            <RestaurantSideBar />
          </Grid.Column>

          <Grid.Column
            width={12}
            style={{
              paddingLeft: 20,
              height: 'calc(100vh - 100px)',
              overflowY: 'scroll',
              scrollBehavior: 'smooth'
            }}>
            <Ref innerRef={labelRef}>
              <Visibility offset={[10, 10]} onUpdate={handleScroll}>
                <div>
                  <Title>Peaceful Restaurant</Title>
                  <Description style={{ marginBottom: 60 }}>
                    globally inspired restaurant focused on using the freshest ingredients and
                    making our food and drinks from scratch. We believe in using the best proteins
                    and produce that is locally sourced and thinking consciously about how the
                    product is produced, raised and grown.
                  </Description>

                  <Slider topic="Popular Items">
                    <PopularDishes hideViewAll />
                  </Slider>
                  <TabsContainer id="tabs">
                    <RestaurantTabs labelRef={labelRef} />
                  </TabsContainer>
                  {/* <RestaurantMenu labelRef={labelRef}/> */}
                </div>
              </Visibility>
            </Ref>
          </Grid.Column>
        </Grid>
        {/* <Slider topic="Fastest Near you">
            <RestaurantCards/>
          </Slider> */}
      </Container>
    </div>
  );
};

const SearchBannerWrapper = styled.div`
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
const TabsContainer = styled.div`
  /* margin-top: -10px;
  padding-top: 10px */
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
