import { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { useRouter } from 'next/router';
import toSlug from '../../../util/toSlug';

import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedItem, selections as selectionsAtom } from '../../../data/atoms';
import { selectedStore as selectedStoreAtom } from '../../../data/storeAtoms';

import { Grid, Container, Dimmer, Loader } from 'semantic-ui-react';
import SearchBanner from '../../../components/SearchBanner';
import Slider from '../../../components/Slider';
import PopularDishes from '../../../components/PopularDishes';
import RestaurantSideBar from '../../../components/RestaurantSideBar';
import RestaurantMenu from '../../../components/RestaurantMenu';
import Footer from '../../../components/Footer';
import ReviewFeed from '../../../components/ReviewFeed/index.js';

import { restaurants } from '../../../data/restaurants';

const store = () => {
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const selectedStore = useRecoilValue(selectedStoreAtom);
  const router = useRouter();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    //fetches a restaurant by its slug when the page refreshes
    if (router.query.store) {
      setSelections((prev) => ({ ...prev, restaurant: router.query.store }));
    }
  }, [router]);

  useEffect(() => {
    if (selectedStore === "not found") router.push('/404')
    console.log(selectedStore);
  }, [selectedStore]);

  return (
    <div id="top">
      {selectedStore && 
      <SearchBannerWrapper>
        <SearchBanner hide={hide} />
      </SearchBannerWrapper>}

      <Container style={{ padding: '150px 0px 0px 0px' }}>
        {!selectedStore || selectedStore === "not found"? (
          <div style={{ height: '80vh' }}>
          <Dimmer inverted active={!selectedStore}>
            <Loader active content="Loading"/>
          </Dimmer>
          </div>
        ) : (
          <>
            <Grid>
              <Grid.Column
                width={4}
                style={{
                  // height: 'calc(100vh - 100px)',
                  // overflowY: 'scroll',
                  paddingBottom: 100
                }}>
                <RestaurantSideBar store={selectedStore} />
              </Grid.Column>

              <Grid.Column
                width={12}
                style={{
                  padding: '0 20px'
                  // height: 'calc(100vh - 100px)',
                }}>
                <div>
                  <Wrapper>
                    <Avatar src="/logo-p.png" />
                    <div style={{ width: 'calc(100% - 50px)' }}>
                      <Title>{selectedStore.name}</Title>
                      <Description style={{ marginBottom: 60 }}>
                        globally inspired restaurant focused on using the freshest ingredients and
                        making our food and drinks from scratch. We believe in using the best
                        proteins and produce that is locally sourced and thinking consciously about
                        how the product is produced, raised and grown.
                      </Description>
                    </div>
                  </Wrapper>

                  <Slider topic="Popular Items" hideViewAll>
                    <PopularDishes />
                  </Slider>

                  <RestaurantMenu store={selectedStore} />
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
              </Grid.Column>
            </Grid>
          </>
        )}
      </Container>
      {selectedStore && <Footer />}
    </div>
  );
};

const Section = styled.div`
  scroll-margin-top: 240px;
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
export default store;
