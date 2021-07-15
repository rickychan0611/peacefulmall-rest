import { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useIsMobile } from '../util/useScreenSize';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';

import moment from 'moment';
import { Container, Image, Ref, Icon, Sticky } from 'semantic-ui-react';
import CuisineSlider from '../components/CuisineSlider';
import DishCards from '../components/DishCards';
import ShopCards from '../components/ShopCards';
import NearShopsCards from '../components/NearShopsCards';
import SearchBanner from '../components/SearchBanner';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import ReviewCards from '../components/ReviewCards';
import CheckOutListPusher from '../components/CheckOutListPusher';
import CurrentAddress from '../components/CurrentAddress';
import { useRecoilState } from 'recoil';
import { sliderCats as sliderCatsAtom } from '../data/atoms.js';

const Home = () => {
  let contextRef = createRef();
  const { t } = useTranslation('home');
  const [result, setResult] = useState({});

  const query = async (topic, api, params) => {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/' + api, { params });
    console.log("res", res)
    setResult(prev => ({ ...prev, [topic]: res.data.data }))
  }

  useEffect(async () => {
    try {
      query("platcat", "getplatcat");
      query("discount", "products", { plat_category: 'all', type: 'discount', count: '20' });
      query("popular", "products", { plat_category: 'all', type: 'popular', count: '20' });
      query("allShops", "shops", { shop_type: 'all', type: 'all', count: '20' });
    }
    catch (err) {
      console.log("query err:", err)
    }
  }, [])

  return (
    <>
      <CheckOutListPusher>
        <Image src="/restaurant-banner-noText.jpg" />
        <Ref innerRef={contextRef}>
          <div>
            <Sticky offset={62} context={contextRef}>
              <SearchBanner />
            </Sticky>

            <CurrentAddress />
            <Container style={{ marginTop: '2em' }}>

              <CuisineSlider sliderCats={result.platcat} />

              <Slider topic={t('discountedDishes')} icon="food">
                <DishCards products={result.discount} />
              </Slider>

              <Slider topic={t('mostPopular')} icon="food">
                <DishCards products={result.popular} />
              </Slider>

              <Slider topic={t('mostLoved')} icon="star">
                <ShopCards shops={result.allShops} />
              </Slider>

              <Slider topic={"Restaurants near you"} icon="store">
                <ShopCards shops={result.allShops} />
              </Slider>

              {/* <Slider topic={t('Featured')} icon="store">
                <ShopCards shops={shops} />
              </Slider> */}
              {/* <Slider topic={t('UserReviews')} icon="star">
                <ReviewCards shops={shops}/>
              </Slider> */}
              {/* <Slider topic={t('EditorPicks')} icon="star">
                <ReviewCards shops={shops} />
              </Slider> */}
            </Container>
          </div>
        </Ref>

        {/* <Footer /> */}
      </CheckOutListPusher>
    </>
  );
};

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
