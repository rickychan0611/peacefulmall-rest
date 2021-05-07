import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { data } from '../../data/restaurants-old';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useRecoilState, useRecoilValue } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';
import { stores as storesAtom } from '../../data/storeAtoms.js';

import toIcons from '../../util/toIcons';

const RestaurantCards = ({topic}) => {
  const router = useRouter()
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const stores = useRecoilValue(storesAtom);
  const [dishes, setDishes] = useState([]);

  return (
    <>
        {stores[0] &&
          stores.map((r, i) => {
            return (
              <Card key={i} onClick={()=>{
                router.push('/store/' + r.slug +"#top")
                setSelections(prev => ({...prev, restaurant: r.slug}))
              }}>
                {/* <Img src={`/img/food (${Math.floor( Math.random() * (86 - 1) + 1 )}).jpg`} /> */}
                <Img src={r.photo} />
                <Name>{r.name}</Name>
                {/* <Description>{item.description}</Description> */}
                <Description>Location: {r.neighborhood}</Description>
                <Description>Style: {r.cuisine_type}</Description>
                <Description>Price Range: {toIcons(r.price_range, "💲")}</Description>
                <Description>Reviews: {toIcons(r.overall_rating, "⭐")} ({r.reviews.length})</Description>
              </Card>
            );
          })}
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
  width: 250px;
  height: 250px;
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

export default RestaurantCards;
