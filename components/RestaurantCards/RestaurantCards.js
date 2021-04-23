import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { data } from '../../data/restaurants';
import { useRouter } from 'next/router'

import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';

const RestaurantCards = ({topic}) => {
  const [dishes, setDishes] = useState([]);
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const router = useRouter()

  useEffect(() => {
    let temp = [];
    let temp2 = [];
    let temp3 = [];
    data.categorys.map((item) => {
      temp.push(item);
    });
    temp.map((item) => {
      temp2.push(item['menu-items']);
    });
    temp2.map((item) => {
      temp3.push(item);
    });
    temp3 = [].concat.apply([], temp3);

    let arr = [];
    for (var i = temp3.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tempArr = temp3[i];
      temp3[i] = temp3[j];
      temp3[j] = tempArr;
      arr.push(tempArr)
    }
    setDishes(arr);
    console.log(dishes)
  }, [selections]);

  // const IMG_URL = `/img/food (${Math.floor( Math.random() * (86 - 1) + 1 )}).jpg`;

  return (
    <>
        {dishes[0] &&
          dishes.map((item, i) => {
            return (
              <Card key={i} onClick={()=>{
                router.push('/restaurant/' + "peaceful-restaurant")
              }}>
                <Img src={`/img/food (${Math.floor( Math.random() * (86 - 1) + 1 )}).jpg`} />
                <Name>Restaurant Name</Name>
                {/* <Description>{item.description}</Description> */}
                <Description>Location: Vacnouver</Description>
                <Description>Style: Chinese</Description>
                <Description>Price Range: 💲💲💲💲</Description>
                <Description>Reviews: ⭐⭐⭐⭐⭐ (34)</Description>
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
  // cursor: pointer;
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
