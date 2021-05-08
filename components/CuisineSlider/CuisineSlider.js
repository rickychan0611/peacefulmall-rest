import useIsMobile from '../../util/useIsMobile';
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
  const isMobile = useIsMobile();

  const [selections, setSelections] = useRecoilState(selectionsAtom);

  return (
    <div style={{cursor: "pointer"}}>
      <SliderTitle title="Choose a Cuisine Style" icon="leaf"/>
      <Sticky offset={50} context={contextRef}>
        <Container isMobile={isMobile} horizontal nativeMobileScroll hideScrollbars={isMobile}>
          <ItemWrapper isMobile={isMobile}>
          {data.map((item, i) => {
            return (
              <CatCard isMobile={isMobile} key={i} onClick={() => setSelections(prev => ({...prev, cuisine: item.name}))} key={i}>
                <Image isMobile={isMobile} src={`/${item.img}`} />
                <Text isMobile={isMobile}>{item.name.toUpperCase()}</Text>
              </CatCard>
            );
          })}
          </ItemWrapper>
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
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: ${p => p.isMobile ? "120px" : "130px"};
  padding-top: 10px;
`;
const CatCard = styled.div`
  display: inline-block;
  position: relative;
  margin-right: 15px;
  width: ${p => p.isMobile ? "100px" : "110px"};
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;
const Text = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.55);
  text-shadow: 0px 0px 10px black;
  position: absolute;
  padding: ${p => p.isMobile ? "3px" : "7px"};
  bottom: ${p => p.isMobile ?  "25px" : "5px"};
  font-size: ${p => p.isMobile ? ".9rem" : "1rem"};
  width: 100%;
  text-align: center;
  font-weight: 600;
  white-space: initial;
`;

export default CuisineSlider;
