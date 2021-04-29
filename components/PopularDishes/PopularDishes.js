import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { data } from '../../data/restaurants';
import {useDesktopMediaQuery } from '../../components/Responsive/Responsive';

import { useRecoilState } from 'recoil';
import  { selections as selectionsAtom }  from '../../data/atoms.js';
import ItemModal from '../ItemModal';
import MenuItem from '../MenuItem';

const PopularDishes = ({topic, featured}) => {
  const [dishes, setDishes] = useState([]);
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const isDesktop = useDesktopMediaQuery();

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
  }, [selections]);

  const [open, setOpen] = useState(false);

  return (
    <>

    <ItemModal open={open} setOpen={setOpen}/>

    <ItemWrapper isDesktop={isDesktop}>
        {dishes[0] &&
          dishes.map((item, i) => {
            return (
              <MenuItem item={item} isVCard key={i}/>
            );
          })}
    </ItemWrapper>
    </>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 360px;
  /* height: ${p => p.isDesktop ? "330px" : "330px"}; */
  padding-top: 10px;
  align-items: stretch;
  /* overflow-x: scroll; */
`;

const Card = styled.div`
  display: inline-block;
  position: relative;
  margin: 5px;
  width: 130px;
  height: 165px;
`;
const Img = styled.img`
  width: 130px;
  height: 100px;
  object-fit: cover;
`;
const Name = styled.div`
  font-size: .9rem;
  font-weight: bold;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  white-space: initial;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Price = styled.div`
  font-size: .9rem;
  font-weight: bold;
`;

export default PopularDishes;
