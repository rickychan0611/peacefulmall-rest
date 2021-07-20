import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  articles as articlesAtom,
  selectedArticle as selectedArticleAtom,
  selectedPage as selectedPageAtom
} from '../../data/atoms';

import { Grid, Icon } from 'semantic-ui-react';
import EditorCards from '../EditorCards';
import ShopSideBar from '../ShopSideBar';
import Shop_Desktop_Header from './Shop_Desktop_Header';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';

const Shop_Desktop_Article_Index = () => {
  const router = useRouter();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageAtom);
  const [articles, setArticles] = useRecoilState(articlesAtom);
  const [result, setResult] = useState();
  const url = '/shop/' + currentShop.name + '/' + currentShop.id
  const [photos, setPhotos] = useState([]);

  useEffect(async () => {
    setSelectedPage("articles")

    try {
      const getArticles = await axios.get(
        process.env.NEXT_PUBLIC_STRAPI_URL + '/articles?_where[restaurant_id]=' + currentShop.id + "&_sort=updated_at:DESC")
      console.log("getArticles", getArticles.data)
      setArticles(getArticles.data)
    }
    catch (err) {
      console.log("err", err)
    }
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
                <Icon name="newspaper" size="small" style={{ marginRight: 10 }} />
                Featured Articles
              </Title>
            </Wrapper>
            <CardsWrapper>
              <EditorCards />
            </CardsWrapper>
          </div>
        </Grid.Column>
      </Grid>
    </div >
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 30px;
`;
const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
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
  /* text-align: center; */
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default Shop_Desktop_Article_Index;