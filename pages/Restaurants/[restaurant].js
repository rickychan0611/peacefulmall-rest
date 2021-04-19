import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import {
  selectedCuisine as selectedCuisineAtom,
  selectedCat as selectedCatAtom,
  selectedRestaurant as selectedRestaurantAtom,
} from '../../data/atoms.js';
import styled from 'styled-components';
import { data } from '../../data/restaurants';
import SliderTitle from '../../components/SliderTitle';
import { Card, Image, Icon, Grid, Container } from 'semantic-ui-react';
import SearchBanner from '../../components/SearchBanner/SearchBanner.js';
import TopBar from '../../components/TopBar/TopBar.js';

const category = () => {
  const [selectedCuisine, setSelectedCuisine] = useRecoilState(selectedCuisineAtom);
  const [selectedCat, setSelectedCat] = useRecoilState(selectedCatAtom);
  const [selectedRestaurant, setSelectedRestaurantAtom] = useRecoilState(selectedRestaurantAtom);
  const [dishes, setDishes] = useState([]);

  const router = useRouter();

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
  }, [selectedCuisine]);

  return (
    <>
      <TopBar />
      <SearchBanner />
      <Container style={{ marginTop: 50 }}>
        <SliderTitle title={router.query.category + ' - ' + router.query.cuisine} hideViewAll />
        <Grid stackable doubling columns={4}>
          {dishes[0] &&
            dishes.map((item, i) => {
              return (
                <Grid.Column>
                  <Card fluid key={i}>
                    <Img
                      src={`https://source.unsplash.com/featured/?restauants,dishes,food,taste,${
                        item.name + selectedCuisine
                      }`}
                    />
                    <Card.Content>
                      <Name>{item.name}</Name>
                      <Description>{item.description}</Description>
                      <Price>50% off - $12.00</Price>
                      <Description>Restaurant Name ⭐⭐⭐⭐⭐</Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

// const Card = styled.div`
//   display: inline-block;
//   position: relative;
//   margin: 10px;
//   width: 100%;
//   /* max-width: 250px; */
//   min-width: 200px;
// `;
const Img = styled.img`
  width: 100%;
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
export default category;
