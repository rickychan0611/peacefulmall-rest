import { useEffect, useState } from 'react';
import useIsMobile from '../../util/useIsMobile';
import _ from 'lodash';
import styled from 'styled-components';
import { Sticky, Dimmer, Loader } from 'semantic-ui-react';
import ScrollContainer from 'react-indiana-drag-scroll';
import SliderTitle from '../SliderTitle';
import axios from 'axios';
import { HOST_URL } from '../../env';

import { useRecoilState } from 'recoil';
import { currentCat, selections as selectionsAtom } from '../../data/atoms.js';
import {
  currentItem as currentItemAtom,
  currentStore as currentStoreAtom,
  currentCat as currentCatAtom
} from '../../data/atoms.js';
import PlaceHolder_Card from '../PlaceHolder_Card';

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
  const [currentCat, setCurrentCat] = useRecoilState(currentCatAtom);
  const [cat, setCat] = useState();

  useEffect(async () => {
    const query = await axios.get(HOST_URL + '/api/getplatcat');
    console.log(query.data);
    setCat(query.data);
  }, []);

  return (
    <>
      {!cat ? (
        "Loading..."
      ) : (
        <>
          <div style={{ cursor: 'pointer' }}>
            <SliderTitle title="Choose a Cuisine Style" icon="leaf" />
            <Sticky offset={60} context={contextRef}>
              <Container
                isMobile={isMobile}
                horizontal
                nativeMobileScroll
                hideScrollbars={isMobile}>
                <ItemWrapper isMobile={isMobile}>
                  {cat.map((item, i) => {
                    return (
                      <CatCard
                        selected={item.id === (currentCat ? currentCat.id : "all")}
                        isMobile={isMobile}
                        key={i}
                        onClick={() => setCurrentCat(item)}
                        key={i}>
                        <Image isMobile={isMobile} 
                        src={item.image ? `${HOST_URL}/storage/${item.image}` : `/no-image.png`} />
                        <Text isMobile={isMobile}>{item.category_name.toUpperCase()}</Text>
                      </CatCard>
                    );
                  })}
                </ItemWrapper>
              </Container>
            </Sticky>
          </div>
        </>
      )}
    </>
  );
};

const Container = styled(ScrollContainer)`
  overflow: auto;
  white-space: nowrap;
  background-color: white;
  padding-bottom: 10px;
  margin-bottom: 30px;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: ${(p) => (p.isMobile ? '106px' : '130px')};
  padding: 10px;
`;
const CatCard = styled.div`
  display: inline-block;
  position: relative;
  margin-right: ${(p) => (p.isMobile ? '15px' : '17px')};
  width: ${(p) => (p.isMobile ? '86px' : '110px')};
  outline: ${(p) =>  p.selected ? '#e7f78e solid 4px' : 0};
  box-shadow: ${(p) =>  p.selected ? '0px 0px 10px #302f2f' : 0};

`;
const Image = styled.img`
  width: ${(p) => (p.isMobile ? '86px' : '110px')};
  height: ${(p) => (p.isMobile ? '86px' : '110px')};
  object-fit: cover;
`;
const Text = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  text-shadow: 0px 0px 10px black;
  position: absolute;
  padding: ${(p) => (p.isMobile ? '3px' : '7px')};
  bottom: 0px;
  font-size: ${(p) => (p.isMobile ? '.8rem' : '1rem')};
  width: 100%;
  text-align: center;
  font-weight: 600;
  white-space: initial;
`;

export default CuisineSlider;
