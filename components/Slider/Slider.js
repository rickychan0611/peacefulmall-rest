import {useDesktopMediaQuery } from '../../components/Responsive/Responsive';
import _ from 'lodash';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import { data } from '../../data/restaurants';
import SliderTitle from '../SliderTitle';

const Slider = ({topic, children}) => {
  const isDesktop = useDesktopMediaQuery();

  return (
    <>
      <SliderTitle title={topic} dishChildren={children}/>
      <Container horizontal nativeMobileScroll hideScrollbars={!isDesktop ? true : false}>
        {children}
      </Container>
    </>
  );
};

const Container = styled(ScrollContainer)`
  overflow: auto;
  white-space: nowrap;
  display: flex;
  margin-bottom: 50px;
`;

export default Slider;
