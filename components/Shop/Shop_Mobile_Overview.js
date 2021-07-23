import styled from 'styled-components';
import { Grid, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentShop as currentShopAtom,
  articles as articlesAtom,
  discountedProducts as discountedProductsAtom,
  popularProducts as popularProductsAtom,
} from '../../data/atoms';
import Shop_Desktop_Header from './Shop_Desktop_Header';
import Slider from '../Slider';
import DishCards from '../DishCards';
import ReviewCards from '../ReviewCards';
import EditorCards from '../EditorCards';
import ShopInfo from '../ShopSideBar/ShopInfo';
import useTranslation from 'next-translate/useTranslation';
import BottomNavBar from '../BottomNavBar';
import Shop_Overview_Sliders from './Shop_Overview_Sliders';

const Shop_Moble_Overview = () => {
  const { t } = useTranslation('home');
  const router = useRouter();
  const currentShop = useRecoilValue(currentShopAtom);
  const articles = useRecoilValue(articlesAtom);
  const discountedProducts = useRecoilValue(discountedProductsAtom)
  const popularProducts = useRecoilValue(popularProductsAtom);
  const url = '/shop/' + currentShop.name + '/' + currentShop.id

  return (
    <div>
      <Shop_Desktop_Header />
      {currentShop.images && currentShop.images[0] ? (
        <Img src={process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(currentShop.images)[0]} />
      ) : (
        <Img src="/no-image.png" />
      )}

      {/* <Description style={{ marginBottom: 20 }}>{currentShop.description}</Description> */}

      <ShopInfo shop={currentShop} />

      <br />
      <hr />
      <br />

      <Shop_Overview_Sliders />

      <BottomNavBar />
      <br />
      <br />
      <br />
    </div >
  );
};

const Button = styled.div({
  margin: 5,
  padding: "6px 15px",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: 25,
  fontSize: 12,
  fontWeight: "bold",
  // backgroundColor: "#e8ebe9",
  color: "black",
  border: "1px solid grey"
});
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 20px;
  justify-content: space-between;
`;
const Title = styled.h2`
color: "black";
margin: 0 20px 0 0;
display: flex;
align-items: center;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 5px;
`;
const Img = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  height: 40px;
  width: 40px;
  margin-right: 5px;
  object-fit: contain;
  /* box-shadow: 0px 0px 5px 3px #dddddd; */
  /* border: solid 1px white; */
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default Shop_Moble_Overview;
