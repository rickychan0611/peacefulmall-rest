import { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentShop as currentShopAtom,
  selectedPage as selectedPageAtom
} from '../../data/atoms';
import Shop_Desktop_Header from './Shop_Desktop_Header';
import ShopInfo from '../ShopSideBar/ShopInfo';
import BottomNavBar from '../BottomNavBar';
import Shop_Overview_Sliders from './Shop_Overview_Sliders';

const Shop_Moble_Overview = () => {
  const currentShop = useRecoilValue(currentShopAtom);
  const [, setSelectedPage] = useRecoilState(selectedPageAtom);

  useEffect(() => {
    setSelectedPage("overview")
  }, []);

  return (
    <div>
      <Shop_Desktop_Header />
      {currentShop.images && currentShop.images[0] ? (
        <Img src={process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(currentShop.images)[0]} />
      ) : (
        <Img src="/no-image.png" />
      )}

      {/* <Description style={{ marginBottom: 20 }}>{currentShop.description}</Description> */}

      <ShopInfo shop={currentShop} />

      <br />
      <hr />
      <br />

      <Shop_Overview_Sliders />

      <BottomNavBar />
      <br />
      <br />
      <br />
    </div >
  );
};

const Img = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin-bottom: 10px;
`;

export default Shop_Moble_Overview;
