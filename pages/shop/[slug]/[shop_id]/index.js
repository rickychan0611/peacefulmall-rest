import { useEffect, useState } from 'react';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import Head from 'next/head';
import axios from 'axios';
import styled from 'styled-components';

import { useIsMobile, useIsTablet, useIsDesktop } from '../../../../util/useScreenSize';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom,
  currentShopPoplularProducts as currentShopPoplularProductsAtom,
} from '../../../../data/atoms';

import SearchBanner from '../../../../components/SearchBanner';
import Shop_Desktop_Overview from '../../../../components/Shop/Shop_Desktop_Overview';
import Shop_Mobile from '../../../../components/Shop/Shop_Mobile';
import { useRouter } from 'next/router';

const shop = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [, setCurrentShopProducts] = useRecoilState(currentShopProductsAtom);
  const [, setCurrentShopPoplularProducts] = useRecoilState(currentShopPoplularProductsAtom);
  
  useEffect(async () => {
    console.log("Single shop", currentShop)
    if (!currentShop || currentShop.id !== router.query.shop_id) {

      const getSingleShop = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/singleshop', {
        params: { shop_id: router.query.shop_id }
      });
      const getShopProducts = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/shopproducts', {
        params: {
          shop_id: router.query.shop_id,
          category_id: 'all'
        }
      });
      const getShopPopularProducts = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/shopproducts', {
        params: {
          shop_id: router.query.shop_id,
          category_id: 'popular'
        }
      });
      setCurrentShop(getSingleShop.data.data);
      setCurrentShopProducts(getShopProducts.data.data);
      setCurrentShopPoplularProducts(getShopPopularProducts.data.data);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{currentShop && currentShop.name} - Peaceful Mall Restaurants</title>
      </Head>
      {currentShop && !isMobile ? (
        <SearchBannerWrapper>
          <SearchBanner />
        </SearchBannerWrapper>
      ) : (
        <SearchBannerWrapper>
          <SearchBanner />
          {/* <BackButton /> */}
        </SearchBannerWrapper>
      )}
      <Container
        style={{
          marginTop: isMobile ? '85px' : isTablet ? '85px' : '85px'
        }}>
        {!currentShop || currentShop === 'not found' ? (
          <div style={{ height: '80vh' }}>
            <Dimmer inverted active={!currentShop}>
              <Loader active content="Loading" />
            </Dimmer>
          </div>
        ) : isDesktop ? (
          <Shop_Desktop_Overview />
        ) : (
          <>
            <Shop_Mobile />
          </>
        )}
      </Container>
      {/* {currentShop && <Footer />} */}
    </div>
  );
};

// export const getServerSideProps = async (context) => {
//   // context.res.setHeader('Cache-Control', 's-maxage=3600');

//   const getSingleShop = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/singleshop', {
//     params: { shop_id: context.params.shop_id }
//   });

//   const getShopProducts = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/shopproducts', {
//     params: {
//       shop_id: context.params.shop_id,
//       category_id: 'all'
//     }
//   });

// return {
//   props: {
//     getSingleShop: getSingleShop.data.data,
//     getShopProducts: getShopProducts.data.data,
//   }
// }
// }

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
