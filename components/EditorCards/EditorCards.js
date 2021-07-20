import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { data } from '../../data/restaurants-old';
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { useRecoilState } from 'recoil';
import {
  selections as selectionsAtom,
  articles as articlesAtom,
  selectedArticle as selectedArticleAtom,
  currentShop as currentShopAtom
} from '../../data/atoms.js';
import { useRouter } from 'next/router';

const ReviewCards = () => {
  const [dishes, setDishes] = useState([]);
  const { t } = useTranslation('home')
  const router = useRouter();
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const [articles, setArticles] = useRecoilState(articlesAtom);
  const [selectedArticle, setSelectedArticle] = useRecoilState(selectedArticleAtom);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);

  return (
    <>
      {articles && articles[0] &&
        articles.map((item, i) => {
          return (
            <Card key={i}
              onClick={() => {
                setSelectedArticle(item)
                router.push('/shop/' + currentShop.name + '/' + currentShop.id + '/articles/' + item.id)
              }}>
              <Img
                src={process.env.NEXT_PUBLIC_STRAPI_URL + item.cover_photo.url}
              />
              <Name>
                {item.title}
              </Name>
              {/* <Description>{item.description}</Description> */}
              {/* <Review>
                {item.content}
              </Review>
              <Description><a>{t("ReadMore")}</a></Description> */}
              <br></br>
              {router.query.article_id &&
                <>
                  <Description>{t("Name")}: Restaurant Name</Description>
                  <Description>{t("location")}: Vacnouver</Description>
                  <Description>{t("style")}: Chinese</Description>
                </>}
            </Card>
          );
        })}
    </>
  );
};

// const Container = styled(ScrollContainer)`
//   overflow: auto;
//   display: flex;
// `;
const Card = styled.div`
  display: inline-block;
  position: relative;
  /* margin: 10px; */
  width: 250px;
  cursor: pointer;
  /* border: 1px solid black; */
  box-shadow: 0 0 10px rgba(0,0,0,.2)
`;
const Img = styled.img`
  width: 250px;
  height: 200px;
  object-fit: cover;
`;
const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 10px 0 10px 0;
  padding: 10px;
  /* height: 100px; */
`;
const Review = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: red;
  margin-top: 5px;
`;

export default ReviewCards;
