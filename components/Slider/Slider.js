import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import SliderTitle from '../SliderTitle';
import useIsMobile from '../../util/useIsMobile';

const Slider = ({ topic, children, icon, hideViewAll }) => {
  const isMobile = useIsMobile();
  const sliderRef = useRef(null);

  useEffect(async () => {

    //Slider scroll back horizontally when a category is selected
    if (sliderRef.current) {
      let left = sliderRef.current.scrollLeft;
      const scrollBack = () => {
        if (left <= 0) {
          clearInterval(scroll)
        }
        console.log('left', left);
        left = left - 30;
        sliderRef.current.scrollTo(left, 0)
      };
      let scroll = setInterval(() => {
        scrollBack();
      });
    }

  });

  return (
    <div>
      <SliderTitle title={topic} icon={icon} dishChildren={children} hideViewAll={hideViewAll} />
      <ScrollContainer
        className={topic}
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
        }}>
        {/* <Container> */}
        {children}
        {/* </Container> */}
      </ScrollContainer>
    </div>
  );
};

const Container = styled.div`
  overflow: auto;
  white-space: nowrap;
  display: flex;
  margin-bottom: 50px;
  z-index: 100;
`;

export default Slider;
