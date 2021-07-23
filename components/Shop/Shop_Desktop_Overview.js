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
import ShopSideBar from '../ShopSideBar';
import ReviewCards from '../ReviewCards';
import EditorCards from '../EditorCards';
import useTranslation from 'next-translate/useTranslation';
import Shop_Overview_Sliders from './Shop_Overview_Sliders';

const Shop_Desktop = () => {
  const { t } = useTranslation('home');
  const router = useRouter();
  const currentShop = useRecoilValue(currentShopAtom);
  const articles = useRecoilValue(articlesAtom);
  const discountedProducts = useRecoilValue(discountedProductsAtom)
  const popularProducts = useRecoilValue(popularProductsAtom);
  const url = '/shop/' + currentShop.name + '/' + currentShop.id

  return (
    <div>
      <Grid>
        <Grid.Column width={4} style={{ paddingBottom: 100 }}>
          <ShopSideBar shop={currentShop} />
        </Grid.Column>

        <Grid.Column width={12} style={{ padding: '30px 20px 80px 20px' }}>
          <div>
            <Shop_Desktop_Header />

            <Shop_Overview_Sliders />

          </div>
        </Grid.Column>
      </Grid>
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
`;
const Title = styled.h2`
color: "black";
margin: 0 20px 0 0;
display: flex;
align-items: center;
`;
export default Shop_Desktop;
