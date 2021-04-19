import { useState, useEffect, createRef } from 'react';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import _ from 'lodash';
import styled from 'styled-components';
import { Sticky } from 'semantic-ui-react';
import ScrollContainer from 'react-indiana-drag-scroll';
import SliderTitle from '../SliderTitle';

import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';

const data = [
  { name: 'Cantonese', img: 'canton-thumb.jpg' },
  { name: 'Bubble Tea', img: 'bubble-thumb.jpg' },
  { name: 'Chinese BBQ', img: 'bbq-thumb.jpg' },
  { name: 'Fast Food', img: 'fastFood-thumb.jpg' },
  { name: 'Fried Chicken', img: 'friedChicken-thumb.jpg' },
  { name: 'Hong Kong', img: 'hongkong-thumb.jpg' },
  { name: 'Japanese', img: 'japanese-thumb.jpg' },
  { name: 'Korean', img: 'korean-thumb.jpg' },
  { name: 'Spicy', img: 'spicy-thumb.jpg' },
  { name: 'Ramen', img: 'ramen-thumb.jpg' },
  { name: 'Taiwanese', img: 'taiwan-thumb.jpg' },
  { name: 'Mexcian', img: 'mexcian-thumb.jpg' }
];

const CuisineSlider = ({ contextRef }) => {
  const [selections, setSelections] = useRecoilState(selectionsAtom);

  return (
    <div style={{cursor: "pointer"}}>
      <SliderTitle title="Cuisines" />
      <Sticky context={contextRef}>
        <Container horizontal nativeMobileScroll hideScrollbars={isMobile ? true : false}>
          {data.map((item, i) => {
            return (
              <CatCard key={i} onClick={() => setSelections(prev => ({...prev, cuisine: item.name}))}>
                <Image size="small" src={`/${item.img}`} />
                <Text>{item.name.toUpperCase()}</Text>
              </CatCard>
            );
          })}
        </Container>
        <div style={{backgroundColor: "white", height: "20px", marginTop: -3, marginBottom: 30}}/>
      </Sticky>
    </div>
  );
};

const Container = styled(ScrollContainer)`
  overflow: auto;
  white-space: nowrap;
  background-color: white;
`;
const CatCard = styled.div`
  display: inline-block;
  position: relative;
  margin: 10px;
`;
const Image = styled.img`
  width: 150px;
  height: 150px;
`;
const Text = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 20px 0;
  text-shadow: 0px 0px 10px black;
  position: absolute;
  bottom: calc(50% - 30px);
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
`;

export default CuisineSlider;
