import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { data } from '../../data/restaurants-old';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Placeholder } from 'semantic-ui-react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';
import { stores as storesAtom, popularStores as popularStoresAtom } from '../../data/storeAtoms.js';

const RestaurantCards = ({ topic }) => {
  const router = useRouter();
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const stores = useRecoilValue(storesAtom);
  // const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const Loader = () => (
    <>
    {_.times(10, (i)=> {
      return (
      <Card
        key={i}
        onClick={() => {
          //store selected store in selections.restaurant
          setSelections((prev) => ({ ...prev, restaurant: r.slug }));
          router.push('/store/' + r.slug + '#top');
        }}>
        {/* <Img src={`/img/food (${Math.floor( Math.random() * (86 - 1) + 1 )}).jpg`} /> */}
        <Placeholder style={{ height: 250, width: 250, margin: '0 0 0 0px' }}>
        </Placeholder>
      </Card>
      )
      })}
    </>
  );

  useEffect(async () => {
    const getAllStores = await axios.post('http://test3.suqingxun.com/api/shop', {
      parameters: { type: 'all' }
    });
    // setStores(getAllStores.data);
    setLoading(false);
    console.log('getAllStores', getAllStores.data);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {stores[0] &&
            stores.map((r, i) => {
              return (
                <Card
                  key={i}
                  onClick={() => {
                    //store selected store in selections.restaurant
                    setSelections((prev) => ({ ...prev, restaurant: r.slug }));
                    router.push('/store/' + r.slug + '#top');
                  }}>
                  {/* <Img src={`/img/food (${Math.floor( Math.random() * (86 - 1) + 1 )}).jpg`} /> */}
                  <Img src={r.photo} />
                  <Name>{r.name}</Name>
                  {/* <Description>{item.description}</Description> */}
                  <Description>Location: {r.neighborhood}</Description>
                  <Description>Style: {r.cuisine_type}</Description>
                  <Description>Price Range: 💲💲💲💲</Description>
                  <Description>Reviews: ⭐⭐⭐⭐⭐ (34)</Description>
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
