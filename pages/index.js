import { createRef, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';
import { Container, Ref, Icon, Sticky } from 'semantic-ui-react';
import CuisineSlider from '../components/CuisineSlider';
import DishCards from '../components/DishCards';
import ShopCards from '../components/ShopCards';
import SearchBanner from '../components/SearchBanner';
import Slider from '../components/Slider';
import ReviewCards from '../components/ReviewCards';
import EditorCards from '../components/EditorCards';
import CheckOutListPusher from '../components/CheckOutListPusher';
import CurrentAddress from '../components/CurrentAddress';
import { useRecoilState } from 'recoil';
import {
  currentPosition as currentPositionAtom,
  articles as articlesAtom,
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom,
  currentShop
} from '../data/atoms';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import styled from 'styled-components';
import { useIsMobile } from "../util/useScreenSize.js";
import { useIsDesktop } from "../util/useScreenSize.js";

const Home = () => {
  let contextRef = createRef();
  const { t } = useTranslation('home');
  const [result, setResult] = useState({});
  const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionAtom);
  const [, setCurrentShop] = useRecoilState(currentShopAtom);
  const [, setCurrentShopProducts] = useRecoilState(currentShopProductsAtom);
  const [articles, setArticles] = useRecoilState(articlesAtom);
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();

  const currentLatLng = () => {
    {
      currentPosition &&
        geocodeByAddress(currentPosition.detail_address + " " + currentPosition.city + " " + currentPosition.province + " " + currentPosition.country)
          .then(results => getLatLng(results[0]))
          .then(({ lat, lng }) => {
            console.log('Successfully got latitude and longitude', { lat, lng })
            if (lat !== currentPosition.lat || lng !== currentPosition.lng) {
              setCurrentPosition(prev => ({ ...prev, lat, lng }))
            }
          }
          );
    }
  }

  const query = async (topic, api, params) => {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/' + api, { params });
    setResult(prev => ({ ...prev, [topic]: res.data.data }))
  }

  useEffect(async () => {
    setCurrentShop();
    setCurrentShopProducts();
    try {
      query("platcat", "getplatcat");
      query("discount", "products", { plat_category: 'all', type: 'discount', count: '20' });
      query("popular", "products", { plat_category: 'all', type: 'popular', count: '20' });
      query("allShops", "shops", { shop_type: 'all', type: 'all', count: '20' });
      query("reviews", "reviews");
    }
    catch (err) {
      console.log("query err:", err)
    }
  }, [])

  //get nearby shops
  useEffect(async () => {
    try {
      //If there is no current position, get all shops
      if (currentPosition) {
        await currentLatLng()
        console.log("currentPosition", currentPosition)
        query("nearby", "shops/nearby", {
          latitude: currentPosition.lat, longitude: currentPosition.lng, radius: 1000
        });
      }
      else {
        query("nearby", "shops", { shop_type: 'all', type: 'all', count: '20' });
      }
    }
    catch (err) {
      console.log("query err:", err)
    }
  }, [currentPosition])


  // get articles
  useEffect(async () => {
    try {
      const getArticles = await axios.get(
        process.env.NEXT_PUBLIC_STRAPI_URL + '/articles?_sort=updated_at:DESC')
      console.log("getArticles", getArticles.data)
      setArticles(getArticles.data)
    }
    catch (err) {
      console.log("err", err)
    }
  }, [])

  useEffect(() => {
    console.log("all queries:", result)
  }, [result])

  return (
    <>
      <CheckOutListPusher>
        <Image src="/restaurant-banner-noText.jpg" />
        <Ref innerRef={contextRef}>
          <div>
            <Sticky offset={isDesktop ? 93 : 63} context={contextRef}>
              <SearchBanner />
              <CurrentAddress />
            </Sticky>

            <Container style={{ marginTop: '2em' }}>

              <CuisineSlider sliderCats={result.platcat} />

              <Slider topic={"Restaurants near you"} icon="store">
                <ShopCards shops={result.nearby} />
              </Slider>

              <Slider topic={t('discountedDishes')} icon="food">
                <DishCards products={result.discount} />
              </Slider>

              <Slider topic={t('mostPopular')} icon="food">
                <DishCards products={result.popular} />
              </Slider>

              {/* according to view count */}
              <Slider topic={t('mostLoved')} icon="star">
                <ShopCards shops={result.allShops} />
              </Slider>

              {/* according to editor's choice */}
              <Slider topic={t('Featured')} icon="store">
                <ShopCards shops={result.allShops} />
              </Slider>

              <Slider topic={t('UserReviews')} icon="star">
                <ReviewCards reviews={result.reviews} />
              </Slider>

              <Slider topic={t('FeaturedArticles')} icon="newspaper">
                <EditorCards />
              </Slider>

              <Wrapper>
                <Title>
                  <Icon name="store" size="small" style={{ marginRight: 10 }} />
                  All Restaurants
                </Title>
              </Wrapper>
              <CardContainer isMobile={isMobile}>
                <ShopCards shops={result.allShops} />
                <ShopCards shops={result.allShops} />
                <ShopCards shops={result.allShops} />
                <ShopCards shops={result.allShops} />
                <ShopCards shops={result.allShops} />
                <ShopCards shops={result.allShops} />
              </CardContainer>
            </Container>
          </div>
        </Ref>

        {/* <Footer /> */}
      </CheckOutListPusher>
    </>
  );
};

const Image = styled.img`
  width: 100%;
  margin-bottom: -10px;
  min-height: 70px;
  object-fit: cover;  
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 20px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin: 0 10px 0px 0;
  display: flex;
  align-items: center;
`;
const CardContainer = styled.div`
  display: grid;
  grid-gap: ${(p) => (p.isMobile && !p.toggle ? "10px" : "20px")};
  grid-template-columns: ${(p) =>
    p.isMobile
      ? "repeat(auto-fill, minmax(220px, 1fr))"
      : "repeat(auto-fill, minmax(220px, 1fr))"};
`;

// export const getServerSideProps = async (context) => {

//   const getplatcat = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/getplatcat');

//   // const products = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/products', {
//   //   params: {
//   //     plat_category: 'all',
//   //     type: "all",
//   //     count: '20'
//   //   }
//   // });

//   // const shops = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/shops', {
//   //   params: {
//   //     type: 'all',
//   //     shop_type: 'all',
//   //     count: '20'
//   //   }
//   // });

//   const cacheDate = moment(new Date()).format("MMM DD hh:mma")
//   return {
//     props: {
//       sliderCats: getplatcat.data.data,
//       // products: products.data.data,
//       // shops: shops.data.data,
//       cacheDate
//     }
//   }
// }

export default Home;
