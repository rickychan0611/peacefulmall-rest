import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useIsMobile } from '../../util/useScreenSize';
import _ from 'lodash';
import styled from 'styled-components';
import toSlug from '../../util/toSlug';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentItem as currentItemAtom,
  currentCat as currentCatAtom
} from '../../data/atoms.js';
import { Button, Label } from 'semantic-ui-react';
import useTranslation from 'next-translate/useTranslation';

import { HOST_URL } from '../../env';
import PlaceHolder_Card from '../PlaceHolder_Card';
import { currentPosition as currentPositionAtom } from '../../data/atoms';

const NearShopsCards = () => {
  const router = useRouter();
  const [dishes, setDishes] = useState([]);
  const isMobile = useIsMobile();
  const [currentItem, setCurrentItem] = useRecoilState(currentItemAtom);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [currentCat, setCurrentcat] = useRecoilState(currentCatAtom);
  const [shops, setShops] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('home');
  const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionAtom);

  //get products from server when component is loaded
  useEffect(async () => {
    if (currentPosition && currentPosition.lat && currentPosition.lng) {
      setLoading(true);
      const getShops = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/shops/nearby', {
        params: {
          latitude: currentPosition.lat,
          longitude: currentPosition.lng,
          radius: 10000
        }
      });
      console.log("getShops.data.data", getShops)
      console.log("latitude", currentPosition.lat)
      console.log("longitude", currentPosition.lng)
      setShops(getShops.data.data);
      setLoading(false);
    }
  }, [currentPosition]);

  return (
    <>
      {loading ? (
        <PlaceHolder_Card size={302} />
      ) : (
        <>
          {shops &&
            shops[0] &&
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

                  <Name>{shop.name}</Name>
                  {/* <Description>{item.description}</Description> */}
                  <Description>{t('location')}: {shop.address_city}</Description>
                  <Description>{t('style')}: {"shop.cuisine_type"}</Description>
                  <Description>{t('PriceRange')}: 💲💲💲💲</Description>
                  <Description>{t('Reviews')}: ⭐⭐⭐⭐⭐ (34)</Description>
                </Card>
              );
            })}
        </>
      )}
    </>
  );
};



const Card = styled.div`
  display: inline-block;
  position: relative;
  margin: 10px;
  width: 250px;
  cursor: pointer;
`;
const Img = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
`;
const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default NearShopsCards;
