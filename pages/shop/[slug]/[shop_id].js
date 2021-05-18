import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import Head from 'next/head';
import axios from 'axios';
import styled from 'styled-components';
import { HOST_URL } from '../../../env';
import { useIsMobile, useIsTablet, useIsDesktop } from '../../../util/useScreenSize';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom
} from '../../../data/atoms';

import SearchBanner from '../../../components/SearchBanner';
import Shop_Desktop from '../../../components/Shop/Shop_Desktop';
import Shop_Mobile from '../../../components/Shop/Shop_Mobile';
import Footer from '../../../components/Footer';
import CurrentAddress from '../../../components/CurrentAddress';

// import { restaurants } from '../../../data/restaurants';

const shop = () => {
  const router = useRouter();
  const hide = useState(false);
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [currentShopProducts, setCurrentShopProducts] = useRecoilState(currentShopProductsAtom);

  useEffect(async () => {
    console.log('currentShop!!!', currentShop)
    if (router.query.shop_id) {
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
    }
  }, [router, router.query.shop_id]);

  useEffect(async () => {
    console.log('currentShopProducts!!!', currentShopProducts);

    if (router.query.shop_id) {
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
        console.log('err' + err);
      }
    }
  }, [router, router.query]);

  return (
    <div>
      <Head>
        <title>{currentShop && currentShop.name} - Peaceful Mall Restaurants</title>
      </Head>
      {currentShop && !isMobile ? (
        <SearchBannerWrapper>
          <SearchBanner hide={hide} />
          <CurrentAddress />
        </SearchBannerWrapper>
      ) : (
        <CurrentAddress />
      )}

      <Container
        style={{
          marginTop: isMobile ? '0px' : isTablet ? '80px' : '140px'
        }}>
        {!currentShop || currentShop === 'not found' ? (
          <div style={{ height: '80vh' }}>
            <Dimmer inverted active={!currentShop}>
              <Loader active content="Loading" />
            </Dimmer>
          </div>
        ) : isDesktop ? (
          <Shop_Desktop />
        ) : (
          <Shop_Mobile />
        )}
      </Container>
      {currentShop && <Footer />}
    </div>
  );
};

const SearchBannerWrapper = styled.div`
  z-index: 1000;
  position: fixed;
  top: 62px;
  .active {
    visibility: visible;
    transition: all 200ms ease-in;
  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, -100%);
  }
`;
export default shop;
