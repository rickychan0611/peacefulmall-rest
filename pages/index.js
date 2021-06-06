import { createRef } from 'react';
import styled from 'styled-components';
import { useIsMobile } from '../util/useScreenSize';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';
import { HOST_URL } from '../env';
import moment from 'moment';
import { Container, Image, Ref, Icon, Sticky } from 'semantic-ui-react';
import CuisineSlider from '../components/CuisineSlider';
import DishCards from '../components/DishCards';
import ShopCards from '../components/ShopCards';
import SearchBanner from '../components/SearchBanner';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import ReviewCards from '../components/ReviewCards';
import CheckOutListPusher from '../components/CheckOutListPusher';
import CurrentAddress from '../components/CurrentAddress';

const Home = ({ sliderCats, products, shops, cacheDate }) => {
  let contextRef = createRef();
  const { t } = useTranslation('home');
  console.log("home cacheDate: ",  cacheDate)
  return (
    <>
      <CheckOutListPusher>
        <Image src="/banner.jpg" />
        <Ref innerRef={contextRef}>
          <div>
            <Sticky offset={62} context={contextRef}>
              <SearchBanner />
            </Sticky>

            <CurrentAddress />
            <Container style={{ marginTop: '2em' }}>
              <CuisineSlider sliderCats={sliderCats} cacheDate={cacheDate} />
              <Slider topic={t('discountedDishes')} icon="food">
                <DishCards type="discount" products={products} />
              </Slider>
              <Slider topic={t('mostPopular')} icon="food">
                <DishCards type="popular" products={products} />
              </Slider>
              <Slider topic={t('mostLoved')} icon="star">
                <ShopCards shops={shops}/>
              </Slider>
              <Slider topic={t('fastest')} icon="store">
                <ShopCards shops={shops}/>
              </Slider>
              <Slider topic={t('Weekly')} icon="store">
                <ShopCards shops={shops}/>
              </Slider>
              <Slider topic={t('Featured')} icon="store">
                <ShopCards shops={shops}/>
              </Slider>
              <Slider topic={t('UserReviews')} icon="star">
                <ReviewCards shops={shops}/>
              </Slider>
              <Slider topic={t('EditorPicks')} icon="star">
                <ReviewCards shops={shops} />
              </Slider>
            </Container>
          </div>
        </Ref>

        <Footer />
      </CheckOutListPusher>
    </>
  );
};

export const getServerSideProps = async (context) => {
  context.res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=60');

  const getplatcat = await axios.get(HOST_URL + '/api/getplatcat');

  const products = await axios.get(HOST_URL + '/api/products', {
    params: {
      plat_category: 'all',
      type: "all",
      count: '100'
    }
  });

  const shops = await axios.get(HOST_URL + '/api/shops', {
    params: {
      type: 'all',
      shop_type: 'all',
      count: '100'
    }
  });

  const cacheDate = moment(new Date()).format("MMM DD hh:mma")
  return {
    props: {
      sliderCats: getplatcat.data.data,
      products: products.data.data,
      shops: shops.data.data,
      cacheDate
    }
  }
}
export default Home;
