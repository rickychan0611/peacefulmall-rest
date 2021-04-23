import { useEffect, useState, createRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';

import styled from 'styled-components';
import { Segment, Label } from 'semantic-ui-react';

import MenuItem from '../../components/MenuItem/MenuItem.js';

import _ from 'lodash';
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

const RestaurantMenu = ({ labelRef }) => {
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const router = useRouter();
  const isDesktop = useDesktopMediaQuery();
  console.log(router.query.restaurant);

  return (
    <Container>
      {/* <Sticky offset={120} context={labelRef}> */}
      <CatWrapper>
        {catNames.map((item, i) => {
          return (
            <Label
              color="black"
              key={i}
              style={{ margin: 5, padding: "10px 15px 10px 15px", cursor: 'pointer', zIndex: 999 }}
              onClick={() => router.push('/restaurant/' + router.query.restaurant + '#' + i)}>
              {item}
            </Label>
          );
        })}
      </CatWrapper>
      {/* </Sticky> */}
      <MenuContainer>
        {catNames.map((item, i) => {
          return (
            <Segment raised>
              <CatTitle id={i}>{item}</CatTitle>
              <ItemWrapper>
                {_.times(4, (i) => (
                  <div key={i}>
                    <MenuItem item={dishes[0]} />
                  </div>
                ))}
              </ItemWrapper>
            </Segment>
          );
        })}
      </MenuContainer>
    </Container>
  );
};

const Container = styled.div`
`;
const MenuContainer = styled.div`
  overflow: scroll;
  height: 60vh;
  scroll-behavior: smooth;

`;
const CatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background-color: white;
  padding-bottom: 10px;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;
const CatTitle = styled.div`
  margin-bottom: 20px;
  /* padding-top: 120px;
  margin-top: -100px; */
  font-size: 24px;
  font-weight: bold;
`;
export default RestaurantMenu;
