import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Divider } from 'semantic-ui-react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { data } from '../../data/restaurants';
import SliderTitle from '../SliderTitle';

import { useRecoilState } from 'recoil';
import { selectedCuisine as selectedCuisineAtom } from '../../data/atoms.js';

const DishesSlider = ({topic}) => {
  const [dishes, setDishes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useRecoilState(selectedCuisineAtom);

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
    // console.log(temp3);

    let arr = [];
    for (var i = temp3.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tempArr = temp3[i];
      temp3[i] = temp3[j];
      temp3[j] = tempArr;
      arr.push(tempArr)
    }
    console.log(arr);
    setDishes(arr);
  }, [selectedCuisine]);

  return (
    <>
      <SliderTitle title={topic} />
      <Container horizontal nativeMobileScroll>
        {dishes[0] &&
          dishes.map((item, i) => {
            return (
              <Card key={i}>
                <Img
                  src={`https://source.unsplash.com/featured/?restauants,dishes,food,taste,${item.name+topic}`}
                />
                <Name>{item.name}</Name>
                <Description>{item.description}</Description>
                <Price>50% off - $12.00</Price>
                <Description>Restaurant Name ⭐⭐⭐⭐⭐</Description>
              </Card>
            );
          })}
      </Container>
    </>
  );
};

const Container = styled(ScrollContainer)`
  overflow: auto;
  white-space: nowrap;
  display: flex;
`;
const Card = styled.div`
  display: inline-block;
  position: relative;
  margin: 10px;
  width: 250px;
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
const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: red;
  margin-top: 5px;
`;

export default DishesSlider;
