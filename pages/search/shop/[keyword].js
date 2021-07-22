import { useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import ShopCards from '../../../components/ShopCards';
import DishCards from '../../../components/DishCards';
import SearchBanner from '../../../components/SearchBanner';
import BackButton from '../../../components/BackButton';
import SearchToggle from '../../../components/SearchToggle';
import { useIsMobile } from '../../../util/useScreenSize';
import { useRecoilState } from 'recoil';
import { searchValue as searchValueAtom } from '../../../data/atoms';
import { useRouter } from 'next/router';

const search = ({ shops, products, keyword }) => {
  const isMobile = useIsMobile();
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtom);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  useEffect(async () => {

    setToggle(false)
    console.log("products search result ", products)
    // console.log("shops search result ", shops)
    console.log("shopType!!!!!!! ", shops)
    setSearchValue(keyword);

    if (shops.length === 0) setToggle(true)

    return () => setSearchValue();
  }, [keyword]);

  return (
    <>
      <SearchBannerWrapper>
        <SearchBanner />
        <BackButton noMenu/>
      </SearchBannerWrapper>
      <Container style={{ marginTop: 100, paddingBottom: 50 }}>
        <ToggleContainer>
          <SearchToggle toggle={toggle} setToggle={setToggle} shops={shops} products={products} />
        </ToggleContainer>

        {((!toggle && shops.length === 0) || (toggle && products.length === 0)) && (
          <>
            <Header>Sorry, no result found for </Header>
            <br />
            <Header style={{ fontSize: 24, marginBottom: 20 }}>"{keyword}"</Header>
          </>
        )}

        <CardContainer isMobile={isMobile} toggle={toggle}>
          {!toggle ? <ShopCards shops={shops} /> : <DishCards products={products} />}
        </CardContainer>
      </Container>
    </>
  );
};

export const getServerSideProps = async (context) => {
  console.log(context.params.keyword);
  let getShops = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/search', {
    params: {
      keyword: context.params.keyword
    }
  });
  let getShopType = {data: {data: []}};
  const getShopCat = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/getshoptype');
  const index = getShopCat.data.data.findIndex(item => item.type_name === context.params.keyword)
  if (index !== -1) {
    getShopType = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/shops', {
      params: {
        type: "all",
        shop_type: getShopCat.data.data[index].id,
        count: 100
      }
    });
    // getShops.data.data.shops == [...getShopType.data.data.shops, ...getShops.data.data.shops]
  }
  return {
    props: {
      keyword: context.params.keyword,
      // shops: getShops.data.data.shops,
      products: getShops.data.data.products,
      shopType: getShopType.data.data,
      shops: [...getShopType.data.data, ...getShops.data.data.shops]
    }
  };
};

const Header = styled.div`
  margin: 0;
`;
const ToggleContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 30px 0px;
  width: 100%;
`;

const CardContainer = styled.div`
  display: grid;
  grid-gap: ${(p) => (p.isMobile && !p.toggle ? '10px' : '20px')};
  grid-template-columns: ${(p) =>
    p.isMobile ? 'repeat(auto-fill, minmax(150px, 1fr))' : 'repeat(auto-fill, minmax(180px, 1fr))'};
`;

const SearchBannerWrapper = styled.div`
  z-index: 1000;
  position: fixed;
  top: 62px;
  .active {
    visibility: visible;
    transition: all 200ms ease-in;
  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, -100%);
  }
`;

export default search;
