import _ from 'lodash';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import SliderTitle from '../SliderTitle';
import useIsMobile from '../../util/useIsMobile';

const Slider = ({topic, children, icon, hideViewAll}) => {
  const isMobile = useIsMobile();

  return (
    <>
      <SliderTitle title={topic} icon={icon} dishChildren={children} hideViewAll={hideViewAll}/>
      <Container horizontal nativeMobileScroll hideScrollbars={isMobile}
      style={{zIndex: 1000}}>
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
  z-index: 100;
`;

export default Slider;
