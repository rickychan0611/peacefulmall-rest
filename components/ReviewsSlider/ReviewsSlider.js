import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Divider, Button } from 'semantic-ui-react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { data } from '../../data/restaurants';
import SliderTitle from '../SliderTitle';

import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';

const ReviewsSlider = ({ topic }) => {
  const [dishes, setDishes] = useState([]);
  const [selections, setSelections] = useRecoilState(selectionsAtom);

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
      arr.push(tempArr);
    }
    setDishes(arr);
  }, [selections]);

  return (
    <>
      <SliderTitle title={topic} />
      <Container horizontal nativeMobileScroll>
        {dishes[0] &&
          dishes.map((item, i) => {
            let IMG_URL = `/img/food (${Math.floor( Math.random() * (86 - 1) + 1 )}).jpg`;

            return (
              <Card key={i}>
                <Img
                  src={IMG_URL}
                />
                <Description> ⭐⭐⭐⭐⭐</Description>
                <Name>
                  I like it so much. The food is so good. I like it. I like it. I like it. I like
                  it. I like it.
                </Name>
                {/* <Description>{item.description}</Description> */}
                <Review>
                  Very first day of soft opening, so their service speed needs a little improvement;
                  otherwise they made use of this deadspace and turned into something quite
                  soothing. Great place to hang, and the food is like how it's advertised, clean and
                  delicate and very healthy.
                </Review>
                <Description>Read more...</Description>
                <br></br>
                <Description>Name: Restaurant Name</Description>
                <Description>Location: Vacnouver</Description>
                <Description>Style: Chinese</Description>
              </Card>
            );
          })}
      </Container>
    </>
  );
};

const Container = styled(ScrollContainer)`
  overflow: auto;
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
  height: 150px;
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

export default ReviewsSlider;
