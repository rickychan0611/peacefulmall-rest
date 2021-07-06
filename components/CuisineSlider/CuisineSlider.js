import { useEffect, useState } from 'react';
import { useIsMobile } from '../../util/useScreenSize';
import _ from 'lodash';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import SliderTitle from '../SliderTitle';
import axios from 'axios';
import PlaceHolder_Card from '../PlaceHolder_Card/';
import useTranslation from 'next-translate/useTranslation';

import { useRecoilState } from 'recoil';
import {
  currentCat as currentCatAtom,
  sliderCats as sliderCatsAtom,
  catChange as scatChangeAtom
} from '../../data/atoms.js';

// const data = [
//   { name: 'Cantonese', img: 'canton-thumb.jpg' },
//   { name: 'Bubble Tea', img: 'bubble-thumb.jpg' },
//   { name: 'Chinese BBQ', img: 'bbq-thumb.jpg' },
//   { name: 'Fast Food', img: 'fastFood-thumb.jpg' },
//   { name: 'Fried Chicken', img: 'friedChicken-thumb.jpg' },
//   { name: 'Hong Kong', img: 'hongkong-thumb.jpg' },
//   { name: 'Japanese', img: 'japanese-thumb.jpg' },
//   { name: 'Korean', img: 'korean-thumb.jpg' },
//   { name: 'Spicy', img: 'spicy-thumb.jpg' },
//   { name: 'Ramen', img: 'ramen-thumb.jpg' },
//   { name: 'Taiwanese', img: 'taiwan-thumb.jpg' },
//   { name: 'Mexcian', img: 'mexcian-thumb.jpg' }
// ];

const CuisineSlider = ( {sliderCats, cacheDate} ) => {
  const isMobile = useIsMobile();
  const [currentCat, setCurrentCat] = useRecoilState(currentCatAtom);
  // const [sliderCats, setSliderCats] = useRecoilState(sliderCatsAtom);
  const [catChange, setCatChange] = useRecoilState(scatChangeAtom);
  const { t } = useTranslation('home');

  return (
    <>
    {console.log(sliderCats)}
      {!sliderCats ? (
        <div style={{ marginBottom: 20 }}>
          <SliderTitle title={t("chooseAStyle")} icon="leaf" />
          <ItemWrapper isMobile={isMobile}>
            <PlaceHolder_Card size={106} />
          </ItemWrapper>
        </div>
      ) : (
        <>
          <div style={{ cursor: 'grab' }}>
            <SliderTitle title={t("chooseAStyle")} icon="leaf" hideViewAll />
              <Container
                isMobile={isMobile}
                horizontal
                nativeMobileScroll
                hideScrollbars={isMobile}>
                <ItemWrapper isMobile={isMobile}>
                  {sliderCats && sliderCats[0] && sliderCats.map((item, i) => {
                    return (
                      <CatCard
                        selected={item.id === (currentCat ? currentCat.id : 'all')}
                        isMobile={isMobile}
                        key={i}
                        onClick={() => {
                          //** setCatChange to true to allow slider slide back to the beginning */
                          //** slider scrolling position stays while catChange is false */
                          setCatChange(true);
                          setCurrentCat(item);
                        }}
                        key={i}>
                        <Image
                          isMobile={isMobile}
                          src={item.image ? `${process.env.NEXT_PUBLIC_HOST_URL}/storage/${item.image}` : `/no-image.png`}
                        />
                        <Text isMobile={isMobile}>{item.category_name.toUpperCase()}</Text>
                      </CatCard>
                    );
                  })}
                </ItemWrapper>
              </Container>
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
  /* padding-bottom: 10px; */
  margin-bottom: 25px;
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
  margin-right: ${(p) => (p.isMobile ? '10px' : '17px')};
  width: ${(p) => (p.isMobile ? '90px' : '110px')};
  /* outline: ${(p) => (p.selected ? '#ffffff solid 3px' : 0)}; */
  box-shadow: ${(p) => (p.selected ? '0px 0px 8px 2px #8a8787' : 0)};
  border-radius: 10px;
  border: 2px solid white;
`;
const Image = styled.img`
  width: ${(p) => (p.isMobile ? '86px' : '106px')};
  height: ${(p) => (p.isMobile ? '82px' : '106px')};
  object-fit: cover;
  border-radius: 10px;
`;
const Text = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  text-shadow: 2px 2px 2px black;
  position: absolute;
  padding: ${(p) => (p.isMobile ? '3px' : '3px')};
  bottom: 0px;
  font-size: ${(p) => (p.isMobile ? '.8rem' : '1rem')};
  width: 100%;
  text-align: center;
  font-weight: 600;
  white-space: initial;
  border-radius: 0px 0px 10px 10px;
`;

export default CuisineSlider;
