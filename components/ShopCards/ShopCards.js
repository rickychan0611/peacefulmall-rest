import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useIsMobile } from '../../util/useScreenSize';
import _ from 'lodash';
import styled from 'styled-components';
import toSlug from '../../util/toSlug';
import ReactStars from 'react-rating-stars-component';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentItem as currentItemAtom,
  currentCat as currentCatAtom
} from '../../data/atoms.js';
import { Button, Label } from 'semantic-ui-react';
import useTranslation from 'next-translate/useTranslation';

import PlaceHolder_Card from '../PlaceHolder_Card';

const ShopCards = ({ shops }) => {
  const router = useRouter();
  const [dishes, setDishes] = useState([]);
  const isMobile = useIsMobile();
  const [currentItem, setCurrentItem] = useRecoilState(currentItemAtom);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [currentCat, setCurrentcat] = useRecoilState(currentCatAtom);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('home');

  return (
    <>
      {loading || !shops ? (
        <PlaceHolder_Card size={302} />
      ) : (
        <>
          {shops &&
            shops[0] ?
            shops.map((shop, i) => {
              return (
                <Card
                  key={i}
                  onClick={() => {
                    //store selected store in selections.restaurant
                    setCurrentShop(shop)
                    router.push('/shop/' + toSlug(shop.name) + '/' + shop.id);
                  }}>
                  {/* <Img src={`/img/food (${Math.floor( Math.random() * (86 - 1) + 1 )}).jpg`} /> */}

                  {shop.images && shop.images[0] ? (
                    <Img src={process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(shop.images)[0]} />
                  ) : (
                    <Img src="/no-image.png" />
                  )}

                  <Name className="clamp2">{shop.name}</Name>
                  <Description>{shop.description}</Description>
                  {/* <Description>{t('location')}: {shop.address_city}</Description> */}
                  {/* <Description>{t('PriceRange')}: 💲💲💲💲</Description> */}
                  <Row>
                    <ReactStars
                      count={5}
                      edit={false}
                      size={22}
                      activeColor="#ffd700"
                      isHalf={true}
                      value={+shop.rating}
                    /> ({shop.reviews ? shop.reviews.length : 0})
                  </Row>
                  <Row>
                    {t('style')}:&nbsp;&nbsp;
                      {shop.shop_types && shop.shop_types.map((item, i) => {
                        return (
                          <div key={i}>
                            {(i > 0 ? ", " : "  ") + item.type_name}
                          </div>
                        )
                      })}
                  </Row>

                </Card>
              );
            }) : <>no item found</>}
        </>
      )
      }
    </>
  );
};

const Card = styled.div`
      display: flex;
      flex-flow: column nowrap;
      /* margin: 10px; */
      width: 100%;
      min-width: 220px;
      cursor: pointer;
      `;
const Img = styled.img`
      width: 100%;
      height: 180px;
      object-fit: cover;
      `;
const Name = styled.div`
      padding: 7px 0px;
      font-size: 1.2rem;
      font-weight: bold;
      `;
const Row = styled.div`
      display: flex;
      flex-flow: row nowrap;
      /* justify-content: center; */
      align-items: center;
      margin-bottom: 8px;
      `;
const Description = styled.div`
      font-size: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 5px;
      `;

export default ShopCards;
