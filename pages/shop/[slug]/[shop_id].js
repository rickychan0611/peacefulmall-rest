import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import Head from 'next/head';
import axios from 'axios';
import styled from 'styled-components';
import { HOST_URL } from '../../../env';
import useIsMobile from '../../../util/useIsMobile';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom,
} from '../../../data/atoms';

import SearchBanner from '../../../components/SearchBanner';
import Shop_Desktop from '../../../components/Shop/Shop_Desktop';
import Shop_Mobile from '../../../components/Shop/Shop_Mobile';
import Footer from '../../../components/Footer';

// import { restaurants } from '../../../data/restaurants';

const shop = () => {
  const router = useRouter();
  const hide = useState(false);
  const isMobile = useIsMobile();
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
      {/* {currentShop && (
        <SearchBannerWrapper>
          <SearchBanner hide={hide} />
        </SearchBannerWrapper>
      )} */}

      <Container style={{ 
        paddingTop: isMobile ? '20px' : '150px' }}>
        {!currentShop || currentShop === 'not found' ? (
          <div style={{ height: '80vh' }}>
            <Dimmer inverted active={!currentShop}>
              <Loader active content="Loading" />
            </Dimmer>
          </div>
        ) : (
          isMobile ? <Shop_Mobile /> : <Shop_Desktop />
        )}
      </Container>
      {currentShop && <Footer />}
    </div>
  );
};

const SearchBannerWrapper = styled.div`
  z-index: 1000;
  position: fixed;
  top: 64px;
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
