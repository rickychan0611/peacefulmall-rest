import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import SliderTitle from '../SliderTitle';
import useIsMobile from '../../util/useIsMobile';
import { useRecoilState } from 'recoil';
import {
  currentCat as currentCatAtom,
  sliderPosition as sliderPositionAtom,
  catChange as scatChangeAtom
} from '../../data/atoms.js';

const Slider = ({ topic, children, icon, hideViewAll }) => {
  const isMobile = useIsMobile();
  const sliderRef = useRef(null);
  const [currentCat, setCurrentcat] = useRecoilState(currentCatAtom);
  const [sliderPosition, setSliderPosition] = useRecoilState(sliderPositionAtom);
  const [catChange, setCatChange] = useRecoilState(scatChangeAtom);

  const id = topic + ' indiana-scroll-container indiana-scroll-container--native-scroll';

  useEffect(() => {
    //Slider scroll back horizontally when a currentCat changes

    if (sliderRef.current && catChange) {
      let left = sliderRef.current.scrollLeft;

      const smoothScrollBack = () => {
        if (left <= 0) {
          clearInterval(scroll);
          //** slider scrolling position stays while setCatChange to false */
          setCatChange(false);
          //** reset all sliders' positions */
          setSliderPosition((prev) => ({ ...prev, [id]: 0 }));
        }
        left = left - 30;
        sliderRef.current.scrollTo(left, 0);
      };

      const scroll = setInterval(() => {
        smoothScrollBack();
      });
    }
  }, [currentCat]);

  useEffect(() => {
    // After passing BACK button, scroll back to previous poistion by remembering the
    // current.scrollLeft position in siderPositionAtom , only happens once when slider is loaded
    // siderPosition is saved when ScrollContainer is clicked.
    sliderRef.current.scrollTo(sliderPosition[id], 0);
  }, []);

  return (
    <div>
      <SliderTitle title={topic} icon={icon} dishChildren={children} hideViewAll={hideViewAll} />
      <ScrollContainer
        className={topic}
        id={topic}
        horizontal
        nativeMobileScroll
        hideScrollbars={isMobile}
        innerRef={sliderRef}
        style={{
          overflow: 'auto',
          whiteSpace: 'nowrap',
          display: 'flex',
          marginBottom: 50,
          zIndex: 100
        }}
        onClick={() => {
          setSliderPosition((prev) => ({ ...prev, [id]: sliderRef.current.scrollLeft }));
        }}>
        {children}
      </ScrollContainer>
    </div>
  );
};


export default Slider;
