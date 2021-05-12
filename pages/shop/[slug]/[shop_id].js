import { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import _ from 'lodash';
import { useRouter } from 'next/router';
import toSlug from '../../../util/toSlug';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selections as selectionsAtom,
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom,
  currentItem as currentItemAtom,
  currentCat as currentCatAtom
} from '../../../data/atoms';
import { selectedStore as selectedStoreAtom } from '../../../data/storeAtoms';

import { Grid, Container, Dimmer, Loader } from 'semantic-ui-react';
import SearchBanner from '../../../components/SearchBanner';
import Slider from '../../../components/Slider';
import PopularDishes from '../../../components/PopularDishes';
import ShopSideBar from '../../../components/ShopSideBar';
import RestaurantMenu from '../../../components/RestaurantMenu';
import Footer from '../../../components/Footer';
import ReviewFeed from '../../../components/ReviewFeed/index.js';
import axios from 'axios';
import { HOST_URL } from '../../../env';

import { restaurants } from '../../../data/restaurants';

const shop = () => {
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const selectedStore = useRecoilValue(selectedStoreAtom);
  const router = useRouter();
  const [hide, setHide] = useState(false);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [currentShopProducts, setCurrentShopProducts] = useRecoilState(currentShopProductsAtom);

  useEffect(async () => {
    console.log('currentShopProducts', currentShopProducts);

    if (router.query.shop_id && !currentShop && !currentShopProducts) {
      try {
        console.log('qetting shop from server...');
        const getSingleShop = await axios.get(HOST_URL + '/api/singleshop', {
          params: { shop_id: router.query.shop_id }
        });
        console.log('getSingleShop.data', getSingleShop.data);
        setCurrentShop(getSingleShop.data);
      } catch (err) {
        console.log(err);
        // router.push('/404');
      }

      try {
        console.log('getShopProducts from server...');
        const getShopProducts = await axios.get(HOST_URL + '/api/shopproducts', {
          params: {
            shop_id: router.query.shop_id,
            category_id: 'all'
          }
        });
        console.log('getShopProducts.data', getShopProducts.data);
        setCurrentShopProducts(getShopProducts.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, [router]);

  return (
    <div>
      <Head>
        <title>{currentShop && currentShop.name} - Peaceful Mall Restaurants</title>
      </Head>
      {currentShop && (
        <SearchBannerWrapper>
          <SearchBanner hide={hide} />
        </SearchBannerWrapper>
      )}

      <Container style={{ padding: '150px 0px 0px 0px' }}>
        {!currentShop || currentShop === 'not found' ? (
          <div style={{ height: '80vh' }}>
            <Dimmer inverted active={!currentShop}>
              <Loader active content="Loading" />
            </Dimmer>
          </div>
        ) : (
          <>
            <Grid>
              <Grid.Column width={4} style={{ paddingBottom: 100 }}>
                <ShopSideBar shop={currentShop} />
              </Grid.Column>

              <Grid.Column width={12} style={{ padding: '0 20px' }}>
                <div>
                  <Wrapper>
                    {currentShop.logo ? (
                      <Avatar src={HOST_URL + '/storage/' + currentShop.logo} />
                    ) : (
                      <Avatar src="/avatar-placeholder.png" />
                    )}
                    <div style={{ width: 'calc(100% - 50px)' }}>
                      <Title>{currentShop.name}</Title>
                      <Description style={{ marginBottom: 60 }}>
                        {currentShop.description}
                      </Description>
                    </div>
                  </Wrapper>

                  <Slider topic="Popular Items" hideViewAll>
                    {currentShopProducts ? (
                      <PopularDishes products={currentShopProducts} />
                    ) : (
                      'No item found.'
                    )}
                  </Slider>

                  <RestaurantMenu store={currentShop} />
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
      {currentShop && <Footer />}
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
  top: 64px;
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
export default shop;
