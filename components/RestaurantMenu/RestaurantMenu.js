import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Label, Sticky } from 'semantic-ui-react';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom
} from '../../data/atoms';

import MenuItem from '../../components/MenuItem/MenuItem.js';
import Slider from '../Slider/Slider.js';
import { useIsMobile } from '../../util/useScreenSize.js';

const RestaurantMenu = ( {contextRef, t} ) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [currentShopProducts, setCurrentShopProducts] = useRecoilState(currentShopProductsAtom);

  useEffect(() => {
    // console.log(currentShop && currentShop.shop_categories);
    try {
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [currentShop]);

  return (
      <div style={{position: "relative"}}>
        {/* Menu cat slider*/}
        <Sticky offset={isMobile ? 20 : 120} context={contextRef}>
          <Slider topic={t && t`FullMenu`} hideViewAll>
            <CatWrapper>
              {currentShop && currentShop.shop_categories && currentShop.shop_categories[0] && 
                currentShop.shop_categories.map((item, i) => {

                  if (item.category_name !== 'Popular Items') {
                    return (
                      <Label
                        color="black"
                        key={item.id}
                        style={{
                          margin: 5,
                          padding: '10px 15px 10px 15px',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                        onClick={() => {
                          router.push(
                            '/shop/' +
                              router.query.slug +
                              '/' +
                              router.query.shop_id +
                              '#' +
                              item.id
                          );
                        }}>
                        {item.category_name}
                      </Label>
                    );
                  }
                })}
            </CatWrapper>
          </Slider>
        </Sticky>

        {/* Menu cards*/}
        {currentShop && currentShop.shop_categories && currentShop.shop_categories[0] &&
          currentShop.shop_categories.map((cat, i) => {
            let isEmpty = true;
            if (cat.category_name !== 'Popular Items') {
              return (
                <MenuContainer key={i}>
                  <CatTitle id={cat.id} isMobile={isMobile}>
                    <div className="jumptarget">{cat.category_name}</div>
                  </CatTitle>
                  {/* <hr/> */}
                  <MenuItemsWrapper isMobile={isMobile}>
                    {currentShopProducts &&
                      currentShopProducts.map((product) => {
                        if (
                          product.shop_categories.findIndex((item) => item.id === cat.id) !== -1
                        ) {
                          isEmpty = false;
                          return <MenuItem item={product} key={product.id} />;
                        }
                      })}
                  </MenuItemsWrapper>

                  {isEmpty && <div style={{ borderTop: '1px solid #dadada' }}>No item found.</div>}
                </MenuContainer>
              );
            }
          })}
        <br />
      </div>
  );
};

const MenuContainer = styled.div`
  margin-bottom: 30px;
`;

const CatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  background-color: white;
  padding: 10px 0;
  max-height: 104px;
`;
const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.isMobile ? 'column' : 'row')};
  flex-wrap: ${(p) => (p.isMobile ? 'nowrap' : 'wrap')};
  justify-content: space-between;
`;
const CatTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  /* scroll-margin-top: 160px;
  scroll-snap-margin-top: 160px; */
  padding-bottom: 10px;

  .jumptarget::before {
    content: '';
    display: block;
    height: ${(p) => (p.isMobile ? '190px' : '250px')}; /* anchor fixed header height*/
    margin: ${(p) =>
      p.isMobile ? '-190px 0 0' : '-250px 0 0'}; /* anchor negative fixed header height */
  }
`;
export default RestaurantMenu;
