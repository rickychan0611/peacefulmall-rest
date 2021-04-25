import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';

import styled from 'styled-components';
import { Segment, Label, Sticky } from 'semantic-ui-react';

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

const RestaurantMenu = ({labelRef}) => {
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const router = useRouter();
  const isDesktop = useDesktopMediaQuery();

  return (
    <Container>
      <Title>Full Menu</Title>
      <Sticky offset={115} context={labelRef}>
      <CatWrapper>
        {catNames.map((item, i) => {
          return (
            <Label
              color="black"
              key={i}
              style={{ margin: 5, padding: "10px 15px 10px 15px", cursor: 'pointer', zIndex: 998 }}
              onClick={() => router.push('/restaurant/' + router.query.restaurant + '#' + i)}>
              {item}
            </Label>
          );
        })}
      </CatWrapper>
      </Sticky>

      {catNames.map((item, i) => {
        return (
          <div style={{padding: 5}}>
          <Segment raised>
            <CatTitle id={i}>{item}</CatTitle>
              <ItemWrapper>
                {_.times(11, (i) => (
                  <div key={i} style={{width: "48%"}}>
                      <MenuItem item={dishes[0]} />
                  </div>
                ))}
              </ItemWrapper>
          </Segment>
          </div>
        );
      })}
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

const Title = styled.h2`
  color: black;
  margin: 0 10px 10px 0;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
`;
const MenuContainer = styled.div`
  // overflow-y: scroll;
  // height: 67vh;
  // scroll-behavior: smooth;
`;
const CatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background-color: white;
  padding: 10px 0;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const CatTitle = styled.div`
  margin-top: 20px;
  padding-top: 240px;
  margin-top: -240px;
  font-size: 24px;
  font-weight: bold;
`;
export default RestaurantMenu;
