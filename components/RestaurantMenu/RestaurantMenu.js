import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';
import styled from 'styled-components';
import { Segment, Label, Sticky, Ref } from 'semantic-ui-react';

import MenuItem from '../../components/MenuItem/MenuItem.js';

import _ from 'lodash';
import dishes from '../../data/dishes';
import Slider from '../Slider/Slider.js';
import useIsMobile from '../../util/useIsMobile.js';

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

const RestaurantMenu = () => {
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const router = useRouter();
  const contextRef = useRef();
  const isMobile = useIsMobile();

  return (
    <Ref innerRef={contextRef}>
      <div>
        {/* Menu cat slider*/}
        <Sticky offset={isMobile ? 20 : 90} context={contextRef}>
          <Slider topic="Full Menu" marginBottom={20} hideScrollbar hideViewAll>
            <CatWrapper>
              {catNames.map((item, i) => {
                return (
                  <Label
                    color="black"
                    key={i}
                    style={{ margin: 5, padding: '10px 15px 10px 15px', cursor: 'pointer', textAlign: "left" }}
                    onClick={() => {
                      router.push(
                        '/shop/' + router.query.slug + '/' + router.query.shop_id + '#' + i
                      );
                    }}>
                    {item}
                  </Label>
                );
              })}
            </CatWrapper>
          </Slider>
        </Sticky>

        {/* Menu cards*/}
        {catNames.map((item, i) => {
          return (
              <MenuContainer key={i}>
                <CatTitle id={i}>{item}</CatTitle>
                <hr/>
                <MenuItemsWrapper isMobile={isMobile}>
                  {_.times(11, (i) => (
                    <div key={i}>
                      <MenuItem item={dishes[0]} />
                    </div>
                  ))}
                </MenuItemsWrapper>
              </MenuContainer>
          );
        })}
        <br />
      </div>
    </Ref>
  );
};


const MenuContainer = styled.div`
margin-bottom: 30px;
`;

const CatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  background-color: white;
  padding: 10px 0;
  max-height: 104px;
`;
const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: ${p => p.isMobile ? "column" : "row"};
  flex-wrap: ${p => p.isMobile ? "nowrap" : "wrap"};;
  justify-content: space-between;
`;
const CatTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  scroll-margin-top: 240px;
  padding-bottom: 10px;
`;
export default RestaurantMenu;
