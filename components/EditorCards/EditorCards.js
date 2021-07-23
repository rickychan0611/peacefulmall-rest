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
  currentShop as currentShopAtom,
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
                setCurrentShop(null)
                router.push('/shop/id/' + item.restaurant_id + '/articles/' + item.id)
              }}>
              <Img
                src={process.env.NEXT_PUBLIC_STRAPI_URL + item.cover_photo.url}
              />
              <Wrapper>
                <Name>
                  {item.title}
                </Name>
                <br></br>
                {router.asPath === "/" &&
                  <div>
                    <Description>{t("Name")}: Restaurant Name</Description>
                    <Description>{t("location")}: Vacnouver</Description>
                    <Description>{t("style")}: Chinese</Description>
                  </div>}
              </Wrapper>
            </Card>
          );
        })}
    </>
  );
};

const Card = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  min-width: 230px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
`;
const Img = styled.img`
  width: 100%;
  /* max-width: 450px; */
  max-height: 200px;
  object-fit: cover;
`;
const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`;
const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ReviewCards;
