import { useEffect } from 'react';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  articles as articlesAtom,
  selectedPage as selectedPageAtom
} from '../../data/atoms';

import { Icon } from 'semantic-ui-react';
import EditorCards from '../EditorCards';
import BottomNavBar from '../BottomNavBar';
import Shop_Header from './Shop_Header';
import axios from 'axios';

const Shop_Mobile_Article_Index = () => {
  const [currentShop] = useRecoilState(currentShopAtom);
  const [, setSelectedPage] = useRecoilState(selectedPageAtom);
  const [articles, setArticles] = useRecoilState(articlesAtom);

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
      <Shop_Header />
      <Wrapper>
        <Title>
          <Icon name="newspaper" size="small" style={{ marginRight: 10 }} />
          Featured Articles
        </Title>
      </Wrapper>
      <CardContainer>
        {articles && articles.length !== 0 ?
          <EditorCards /> : <>No article yet</>}
      </CardContainer>
      <BottomNavBar />
      <br />
      <br />
      <br />
    </div >
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 30px;
`;
const CardContainer = styled.div`
      padding-bottom: 30px;
      display: grid;
      grid-gap: ${(p) => (p.isMobile && !p.toggle ? "10px" : "15px")};
      grid-template-columns: ${(p) =>
    p.isMobile
      ? "repeat(auto-fill, minmax(220px, 1fr))"
      : "repeat(auto-fill, minmax(220px, 1fr))"};
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
export default Shop_Mobile_Article_Index;
