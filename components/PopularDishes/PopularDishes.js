import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { data } from '../../data/restaurants-old';

import { useRecoilState } from 'recoil';
import  { selections as selectionsAtom }  from '../../data/atoms.js';
import ItemModal from '../ItemModal';
import MenuItem from '../MenuItem';

const PopularDishes = ({topic, featured, products}) => {

  // useEffect(() => {
  //   let temp = [];
  //   let temp2 = [];
  //   let temp3 = [];
  //   data.categorys.map((item) => {
  //     temp.push(item);
  //   });
  //   temp.map((item) => {
  //     temp2.push(item['menu-items']);
  //   });
  //   temp2.map((item) => {
  //     temp3.push(item);
  //   });
  //   temp3 = [].concat.apply([], temp3);

  //   let arr = [];
  //   for (var i = temp3.length - 1; i > 0; i--) {
  //     var j = Math.floor(Math.random() * (i + 1));
  //     var tempArr = temp3[i];
  //     temp3[i] = temp3[j];
  //     temp3[j] = tempArr;
  //     arr.push(tempArr)
  //   }
  //   setDishes(arr);
  // }, [selections]);

  // const [open, setOpen] = useState(false);

  return (
    <>

    {/* <ItemModal open={open} setOpen={setOpen} fromRestaurantPage={true}/> */}

    <ItemWrapper isARow={products.length < 10} noItem={products.length === 0}>
      {/* {products.length} */}
        {products && products[0] ?
          [...products, ...products].map((item, i) => {
            return (
              <MenuItem item={item} smallCard key={i}/>
            );
          })
          :
          <div>No item found</div>
          }
    </ItemWrapper>
    </>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: ${(p) => (p.noItem ? '60px' : p.isARow ? '180px' : '360px')};
  padding-top: 10px;
  align-items: stretch;
`;

export default PopularDishes;
