import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Divider, Sticky } from "semantic-ui-react";
import { useRecoilState } from "recoil";
import {
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom,
  currentShopPoplularProducts as currentShopPoplularProductsAtom,
  searchResults as searchResultsAtom,
  searchValue as searchValueAtom,
} from "../../data/atoms";

import ShopDishCards from "../../components/ShopDishCards";
import Slider from "../Slider/Slider.js";
import { useIsMobile } from "../../util/useScreenSize.js";
import { useIsDesktop } from "../../util/useScreenSize.js";

import { trackWindowScroll } from "react-lazy-load-image-component";

const RestaurantMenu = ({ contextRef, t }) => {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const [, setLoading] = useState(true);
  const [currentShop] = useRecoilState(currentShopAtom);
  const [currentShopProducts] = useRecoilState(currentShopProductsAtom);
  const [currentShopPoplularProducts] = useRecoilState(
    currentShopPoplularProductsAtom
  );
  const [searchResults, setSearchResults] = useRecoilState(searchResultsAtom);
  const [searchValue] = useRecoilState(searchValueAtom);

  useEffect(() => {
    // console.log(currentShop && currentShop.shop_categories);
    try {
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [currentShop]);

  return (
    <div style={{ position: "relative" }}>
      {/* Menu cat slider*/}
      {true && (
        <Sticky offset={isDesktop ? 95 : 65} context={contextRef}>
          <div>
            <Slider topic={t && t`FullMenu`} hideViewAll hideScrollbar>
              <CatWrapper>
                {
                  currentShop?.shop_categories?.map((item, i) => {
                    if (item.category_name !== "Popular Items") {
                      return (
                        <LabelContainer
                          color="black"
                          key={item.id}
                          onClick={() => {
                            router.push(
                              "/shop/" +
                              router.query.slug +
                              "/" +
                              router.query.shop_id +
                              "/menu#" +
                              item.id
                            );
                          }}
                        >
                          {item.category_name}
                        </LabelContainer>
                      );
                    }
                  })}
              </CatWrapper>
            </Slider>
          </div>
        </Sticky>
      )}

      {/* Menu cards*/}
      {/******** Search Results| 搜索结果 ********/}
      {isDesktop ? (
        <div id="result" style={{ paddingTop: 1 }} />
      ) : (
        <div id="result" style={{ paddingTop: 200, marginTop: -200 }} />
      )}

      {searchResults && searchResults[0] &&
        <MenuContainer>
          <>
            <CatTitle isMobile={isMobile}>
              <div className="jumptarget">{searchResults.length} results found for "{searchValue}" | 搜索结果</div>
            </CatTitle>
            <Divider />
            <CardContainer isMobile={isMobile}>
              {searchResults ?
                searchResults.map((product) => {
                  return <ShopDishCards item={product} key={product.id} />;
                }) :
                <div>No result found.</div>
              }
            </CardContainer>
          </>
        </MenuContainer>
      }

      {/******** Full Menu ********/}
      {
        currentShop &&
        currentShop.shop_categories &&
        currentShop.shop_categories[0] &&
        currentShop.shop_categories.map((cat, i) => {
          let isEmpty = true;
          if (cat.category_name !== "Popular Items") {
            return (
              <MenuContainer key={i}>
                {isDesktop ? (
                  <div id={cat.id} 
                  style={{ paddingTop: 220, marginTop: -220 }}
                  />
                ) : (
                  <div
                    id={cat.id}
                    style={{ paddingTop: 200, marginTop: -200 }}
                  />
                )}

                <CatTitle isMobile={isMobile}>
                  <div className="jumptarget">{cat.category_name}</div>
                </CatTitle>
                <Divider />
                {/* <hr/> */}
                <CardContainer isMobile={isMobile}>
                  {currentShopProducts &&
                    currentShopProducts.map((product) => {
                      if (
                        product.shop_categories.findIndex(
                          (item) => item.id === cat.id
                        ) !== -1
                      ) {
                        isEmpty = false;
                        return (
                          <ShopDishCards item={product} key={product.id} catName={cat.category_name}
                          // isLunchTime={isLunchTime} 
                          />
                        );
                      }
                    })}
                </CardContainer>
                {isEmpty && (
                  <div style={{ borderTop: "1px solid #dadada" }}>
                    No item found.
                  </div>
                )}
              </MenuContainer>
            );
          }
        })
      }
      <br />
    </div >
  );
};

const LabelContainer = styled.div({
  margin: 5,
  padding: "6px 15px",
  cursor: "pointer",
  textAlign: "left",
  borderRadius: 25,
  fontSize: 12,
  fontWeight: "bold",
  backgroundColor: "#e8ebe9",
  color: "black"
});
const CatWrapper = styled.div`
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      width: 100%;
      min-width: 100px;
      background-color: white;
      padding: 0px 0 0px 0;
      max-height: 90px;
      `;
const CardContainer = styled.div`
      padding-bottom: 30px;
      display: grid;
      grid-gap: ${(p) => (p.isMobile && !p.toggle ? "10px" : "15px")};
      grid-template-columns: ${(p) =>
    p.isMobile
      ? "repeat(auto-fill, minmax(150px, 1fr))"
      : "repeat(auto-fill, minmax(200px, 1fr))"};
      `;
const Anchor = styled.div`
      display: block;
      position: relative;
      top: 500;
      visibility: hidden;
      margin-top: -500;
      padding: 500;
      `;
const MenuContainer = styled.div`
      margin-bottom: 30px;
      `;
const CatTitle = styled.div`
      font-size: 24px;
      font-weight: bold;
      line-height: normal;
      /* scroll-margin-top: 160px;
      scroll-snap-margin-top: 160px; */
      padding-bottom: 5px;
      /* margin-top: 30px; */
      `;
export default trackWindowScroll(RestaurantMenu);