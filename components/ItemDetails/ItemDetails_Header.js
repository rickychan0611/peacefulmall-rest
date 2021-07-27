import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom
} from '../../data/atoms.js';

const ItemDetails_Header = ({ item }) => {
  const router = useRouter();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);

  return (
    <>
      <StoreHeader
        onClick={() => {
          router.push('/shop/' + currentShop.name + '/' + currentShop.id + '/menu');
          // handleClose();
        }}>
        <Image
          style={{ margimRight: 10 }}
          src={
            currentShop && currentShop.logo
              ? process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + currentShop.logo
              : '/avatar-placeholder.png'
          }
          avatar
          size="mini"
        />
        &nbsp;&nbsp;
        <div style={{ fontSize: 16 }}>{currentShop && currentShop.name}</div>
      </StoreHeader>
      <h2>{item.name}</h2>
    </>
  );
};

const StoreHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
`;

export default ItemDetails_Header;
