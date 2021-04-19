import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import { data } from '../../data/restaurants';
import SliderTitle from '../SliderTitle';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';

const Slider = ({topic, children}) => {
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
      arr.push(tempArr)
    }
    setDishes(arr);
  }, [selections]);

  return (
    <>
      <SliderTitle title={topic} dishChildren={children}/>
      <Container horizontal nativeMobileScroll hideScrollbars={isMobile ? true : false}>
        {children}
      </Container>
      <div style={{backgroundColor: "white", height: "50px", marginTop: -3}}/>

    </>
  );
};

const Container = styled(ScrollContainer)`
  overflow: auto;
  white-space: nowrap;
  display: flex;
`;

export default Slider;
