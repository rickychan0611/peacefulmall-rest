import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';

import styled from 'styled-components';
import { data } from '../../data/restaurants';
import { Grid, Container, Header, Segment, Item, Label, Divider } from 'semantic-ui-react';
import SearchBanner from '../../components/SearchBanner/SearchBanner.js';
import Slider from '../../components/Slider/Slider.js';
import PopularDishes from '../../components/PopularDishes/PopularDishes.js';
import RestaurantSideBar from '../../components/RestaurantSideBar/RestaurantSideBar.js';
import MenuItem from '../../components/MenuItem/MenuItem.js';

import _ from 'lodash'
import dishes from '../../data/dishes';

const catNames = [
  'Soup',
  'Cold Dishes',
  'Rice Dishes',
  'Beef & Lamb',
  'Pork',
  'Chicken',
  'Seafood',
  'Vegetables',
  'Soup Noodles',
  'Stir-Fried',
  'Dim Sum',
  'Beverages'
];

const category = () => {
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const router = useRouter();
  const isDesktop = useDesktopMediaQuery();

  return (
    <>
      <SearchBanner />
      <Container style={{ marginTop: 30 }}>
        <Grid column={2}>
          <RestaurantSideBar />

          <Grid.Column
            width={11}
            style={{ paddingLeft: 20, height: 'calc(100vh - 120px)', overflowY: 'scroll' }}>
            <Title>Peaceful Restaurant</Title>
            <Description style={{ marginBottom: 60 }}>
              globally inspired restaurant focused on using the freshest ingredients and making our
              food and drinks from scratch. We believe in using the best proteins and produce that
              is locally sourced and thinking consciously about how the product is produced, raised
              and grown.
            </Description>

            <Slider topic="Popular Items">
              <PopularDishes hideViewAll />
            </Slider>

            <h2>Our Full Menu</h2>
            {/* <Slider> */}
            {catNames.map((item, i) => {
              return (
              <Label color="black" key={i} style={{margin: 5, padding: 15, }}>
                {item}
              </Label>
            )})}
            {/* </Slider> */}

            {catNames.map((item, i) => {
              return (
                <Segment raised>
                  <CatTitle>{item}</CatTitle>
                  <ItemWrapper>
                    {_.times(4, (i) => (
                    <div key={i}>
                      <MenuItem item={dishes[0]}/>
                      </div>
                    ))}
                  </ItemWrapper>
                </Segment>
              );
            })}
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* height: ${(p) => (p.isDesktop ? '170px' : '100px')}; */
`;
const H4 = styled.h4`
  margin: 0;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;
const CatTitle = styled(Header)`
  margin-bottom: 40px;
  margin-top: 20px;
`;
const Img = styled.img`
  width: 100%;
  height: 80px;
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
export default category;
