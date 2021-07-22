import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentShop as currentShopAtom,
  articles as articlesAtom,
  selectedPage as selectedPageAtom,
  currentShopProducts as currentShopProductsAtom,
  discountedProducts as discountedProductsAtom,
  currentShopPoplularProducts as currentShopPoplularProductsAtom,
  popularProducts as popularProductsAtom,
} from '../../data/atoms';
import Shop_Desktop_Header from './Shop_Desktop_Header';

import { Grid, Icon } from 'semantic-ui-react';
import Slider from '../Slider';
import DishCards from '../DishCards';
import ShopSideBar from '../ShopSideBar';
import ReviewCards from '../ReviewCards';
import EditorCards from '../EditorCards';

import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

const Shop_Desktop = () => {
  const { t } = useTranslation('home');
  const router = useRouter();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [currentShopProducts, setCurrentShopProducts] = useRecoilState(currentShopProductsAtom);
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageAtom);
  const [articles, setArticles] = useRecoilState(articlesAtom);
  const discountedProducts = useRecoilValue(discountedProductsAtom)
  const url = '/shop/' + currentShop.name + '/' + currentShop.id
  const [currentShopPoplularProducts, setCurrentShopPoplularProducts] = useRecoilState(currentShopPoplularProductsAtom);
  const popularProducts = useRecoilValue(popularProductsAtom);

  // get articles
  useEffect(async () => {
    try {
      const getArticles = await axios.get(
        process.env.NEXT_PUBLIC_STRAPI_URL + '/articles?_where[restaurant_id]=' + currentShop.id + "&_sort=updated_at:ASC")
      console.log("getArticles", getArticles.data)
      setArticles(getArticles.data)
    }
    catch (err) {
      console.log("err", err)
    }
  }, [])

  useEffect(() => {
    setSelectedPage("overview")
    console.log("currentShopcurrentShop, ", currentShop)
  }, [currentShop])

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
                <Icon name="food" size="small" style={{ marginRight: 10 }} />
                Popular Items
              </Title>
              <Button style={{ color: "white", backgroundColor: "#ee3160" }} onClick={() => router.push(url + '/menu')}> View Full Menu </Button>
            </Wrapper>
            <Slider>
              <DishCards products={popularProducts} />
            </Slider>

            {discountedProducts &&  <>
              <Wrapper>
                <Title>
                  <Icon name="food" size="small" style={{ marginRight: 10 }} />
                  Discounted Items
                </Title>
                <Button style={{ color: "white", backgroundColor: "#ee3160" }} onClick={() => router.push(url + '/menu')}> View Full Menu </Button>
              </Wrapper>
              <Slider>
                <DishCards products={discountedProducts} />
              </Slider>
            </>}

            {/************* Photo Gallery ***********/}
            {/* <Wrapper>
              <Title>
                <Icon name="photo" size="small" style={{ marginRight: 10 }} />
                Photo Gallery
              </Title>
              <Button onClick={() => router.push(url + '/photos')}> View All Photos </Button>
            </Wrapper> */}
            {/* 
            <ImageRow>
              <ImageWrapper>
                {result && result.popular && result.popular.map((item, i) => {
                  return (
                    <>{item.images && item.images[0] ? (
                      <>
                        {i < 4 && <>
                          <Img src={process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(item.images)[0]} />
                        </>
                        }
                        {i === result.popular.length - 1 &&
                          <LastImg>
                            <Img style={{ opacity: 0.3 }} src={process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(item.images)[0]} />
                            <Num>10+</Num>
                          </LastImg>
                        }
                      </>
                    ) : (
                      <Img src="/no-image.png" />
                    )}</>
                  )
                })}
              </ImageWrapper>
            </ImageRow> */}

            <Wrapper>
              <Title>
                <Icon name="star" size="small" style={{ marginRight: 10 }} />
                User Reviews
              </Title>
              {/* <Button onClick={() => router.push(url + '/reviews')}>View All Reviews</Button> */}
            </Wrapper>
            <Slider >
              {currentShop && currentShop.reviews && currentShop.reviews.length !== 0 ?
                <ReviewCards shop={currentShop} /> : <h4>... No review yet 😋 </h4>}
            </Slider>

            <Wrapper>
              <Title>
                <Icon name="newspaper outline" size="small" style={{ marginRight: 10 }} />
                Featured Articles
              </Title>
              {/* <Button onClick={() => router.push(url + '/articles')}>View All Articles</Button> */}
            </Wrapper>
            <Slider >
              {articles && articles.length !== 0 ?
                <EditorCards /> : <h4>... No article yet 😋 </h4>}
            </Slider>

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
  /* height: 180px; */
  margin-Bottom: 50px;
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
  margin-bottom: 20px;
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
margin: 0 20px 0 0;
display: flex;
align-items: center;
`;

const Description = styled.div`
font-size: 1rem;
overflow: hidden;
text-overflow: ellipsis;
`;
export default Shop_Desktop;
