import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { data } from '../../data/restaurants';
import ItemModal from '../ItemModal/';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';

import { useRecoilState } from 'recoil';
import { selections as selectionsAtom, selectedItem as itemAtom } from '../../data/atoms.js';
import { Button, Label, Segment } from 'semantic-ui-react';

const DishCards = ({ topic, featured }) => {
  const isDesktop = useDesktopMediaQuery();
  const [dishes, setDishes] = useState([]);
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const [selectedItem, setSelectedItem] = useRecoilState(itemAtom);
  const [open, setOpen] = useState(false);

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
      let IMG_URL = `/img/food (${Math.floor(Math.random() * (86 - 1) + 1)}).jpg`;

      // const IMG_URL = `https://source.unsplash.com/featured/?dinning, steak${Math.floor(
      //   Math.random() * 10000
      // )}`;
      temp3.push({
        ...item,
        img: IMG_URL,
        description:
          'This is description. This is description. This is description. This is description. This is description. This is description. '
      });
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

  const route = (item) => {
    console.log(item);
    setSelectedItem(item);

    isDesktop ? setOpen(true) : router.push('/item/' + item);
  };

  return (
    <>
      <ItemModal open={open} setOpen={setOpen} />

      {dishes[0] &&
        dishes.map((item, i) => {
          return (
            <Card
              key={i}
              onClick={() => {
                route(item);
              }}>
              <Label as="a" color="red" ribbon style={{position: "absolute", left: -13, margin: 0}}>
                10% OFF
              </Label>
              <Img src={item.img}/>
                <Name>Dish's Name</Name>
                <Description>{item.description}</Description>
                <Price><span style={{textDecoration: "line-through", marginRigth: 5, color: "black"}}>$15.00 </span> $12.00</Price>
                <Description>Restaurant Name </Description>
                <Button basic size="tiny" style={{marginTop: 5, padding: 10, color: "red"}}>Order Now! </Button>
            </Card>
            // </Segment>
          );
        })}
    </>
  );
};

const Wrapper = styled.div`
  padding: 0px 10px 10px 10px;
`;
const Card = styled.div`
  display: inline-block;
  position: relative;
  margin: 10px;
  width: 200px;
  cursor: pointer;
`;
const Img = styled.img`
  width: 100%;
  height: 180px;
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

export default DishCards;
