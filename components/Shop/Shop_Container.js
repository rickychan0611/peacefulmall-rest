import { useEffect, useState } from 'react';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';
import { useIsMobile, useIsTablet, useIsDesktop } from '../../util/useScreenSize';
import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  articles as articlesAtom,
  selectedPage as selectedPageAtom,
  currentShopProducts as currentShopProductsAtom,
  currentShopPoplularProducts as currentShopPoplularProductsAtom,
} from '../../data/atoms';

import SearchBanner from '../../components/SearchBanner';
import { useRouter } from 'next/router';

const Shop_Container = ({ children }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [currentShopProducts, setCurrentShopProducts] = useRecoilState(currentShopProductsAtom);
  const [, setCurrentShopPoplularProducts] = useRecoilState(currentShopPoplularProductsAtom);
  const [, setSelectedPage] = useRecoilState(selectedPageAtom);
  const [, setArticles] = useRecoilState(articlesAtom);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    console.log("!!!!currentShop", currentShop)
    console.log("router.query.shop_id", router.query.shop_id)
    if (!currentShop || currentShop.length === 0 || !currentShopProducts) {
      console.log("RUNNN")
      if (!currentShop || currentShop.id !== router.query.shop_id) {
        try {
          setLoading(true)

          const getSingleShop = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/singleshop', {
            params: { shop_id: router.query.shop_id }
          });
          setCurrentShop(getSingleShop.data.data);

          const getShopProducts = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/shopproducts', {
            params: {
              shop_id: router.query.shop_id,
              category_id: 'all'
            }
          });
          setCurrentShopProducts(getShopProducts.data.data);
        }
        catch (err) {
          console.log(err)
        }
        finally {
          setLoading(false)
        }
      }
    }
  }, []);

  useEffect(async () => {
    try {
      const getShopPopularProducts = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/shopproducts', {
        params: {
          shop_id: router.query.shop_id,
          category_id: 'popular'
        }
      });
      setCurrentShopPoplularProducts(getShopPopularProducts.data.data);
    }
    catch (err) {
      console.log(err)
    }
  }, []);

  useEffect(async () => {
    if (currentShop) {
      try {
        const getArticles = await axios.get(
          process.env.NEXT_PUBLIC_STRAPI_URL + '/articles?_where[restaurant_id]=' +
          router.query.shop_id + "&_sort=updated_at:ASC")
        setArticles(getArticles.data)
      }
      catch (err) {
        console.log(err)
      }
    }
  }, [currentShop]);

  useEffect(() => {
    console.log("currentShopcurrentShop, ", currentShop)
  }, [currentShop])

  return (
    <div>
      <SearchBannerWrapper isDesktop={isDesktop}>
        <SearchBanner />
      </SearchBannerWrapper>
      <Container
        style={{
          marginTop: isMobile ? '45px' : isTablet ? '45px' : '85px'
        }}>
        {loading ?
          <div style={{ height: '80vh' }}>
            <Dimmer inverted active={loading}>
              <Loader active content="Loading" />
            </Dimmer>
          </div>
          :
          <>{children}</>
        }
      </Container>
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
  top: ${p => p.isDesktop ? "94px" : "62px"} ;
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
export default Shop_Container;
