import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  selectedPage as selectedPageAtom,
  articles as articlesAtom
} from '../../data/atoms';

import { Grid, Icon } from 'semantic-ui-react';
import ShopSideBar from '../ShopSideBar';
import ReviewFeed from '../ReviewFeed/index.js';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import Shop_Desktop_Header from './Shop_Desktop_Header';

const Shop_Desktop_Review = () => {
  const { t } = useTranslation('home');
  const router = useRouter();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageAtom);
  const [result, setResult] = useState({});
  const url = '/shop/' + currentShop.name + '/' + currentShop.id
  const [articles, setArticles] = useRecoilState(articlesAtom);

  const query = async (topic, api, params) => {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/' + api, { params });
    setResult(prev => ({ ...prev, [topic]: res.data.data }))
    console.log("REVIEW PAGE", res)
  }

  useEffect(async () => {
    try {
      query("shop", "singleshop", { shop_id: router.query.shop_id });
    }
    catch (err) {
      console.log("query err:", err)
    }
  }, [])

  useEffect(() => {
    setSelectedPage("reviews")
  }, [])

  return (
    <div>
      <Grid>
        <Grid.Column width={4} style={{ paddingBottom: 100 }}>
          <ShopSideBar shop={currentShop} />
        </Grid.Column>
        <Grid.Column width={12} style={{ padding: '30px 20px 80px 20px' }}>
          <div>
            <Shop_Desktop_Header />
            <Wrapper>
              <Title>
                <Icon name="star" size="small" style={{ marginRight: 10 }} />
                User Reviews
              </Title>
            </Wrapper>

            <ReviewFeed />

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
const LastImg = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const Num = styled.div`
  position: absolute;
  color: white;
  font-size: 30px;
  font-weight: bold;
  `;
const ImageRow = styled.div`
  position: relative;
  width: 100%;
  max-width: 965px;
  height: 180px;
  margin-top: 20px;
`;
const ImageWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  `;
const Img = styled.img`
  width: 100%;
  /* width: 100%; */
  /* max-width: 130px; */
  height: 150px;
  object-fit: cover;
`;
const Section = styled.div`
  /* scroll-margin-top: 240px; */
  :before {
  content: '';
  display: block;
  height: 240px; /* fixed header height*/
  margin: -240px 0 0; /* negative fixed header height */
}
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
object-fit: contain;
box-shadow: 0px 0px 5px#a5a5a5;
margin-right: 20px;
`;
const Title = styled.h2`
color: "black";
margin: 0 10px 0 0;
display: flex;
align-items: center;
`;

const Description = styled.div`
font-size: 1rem;
overflow: hidden;
text-overflow: ellipsis;
`;
export default Shop_Desktop_Review;
