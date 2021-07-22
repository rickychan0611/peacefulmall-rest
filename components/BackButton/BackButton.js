import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import {
  currentItem as currentItemAtom,
  currentShop as currentShopAtom,
} from '../../data/atoms.js';

const BackButton = ({noMenu}) => {
  const router = useRouter();
  const [currentItem, setCurrentItem] = useRecoilState(currentItemAtom);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);

  return (
    <Container>
      <div onClick={() => {
        router.back();
      }}><Icon name="arrow left" /> Back </div>
      &nbsp;&nbsp;&nbsp;&nbsp;  
      {!noMenu && <>| &nbsp;&nbsp;&nbsp;&nbsp; 
      <div onClick={() => {
        router.push("/shop/" + currentShop.name + "/" + currentShop.id + "/menu");
      }}><Icon name="newspaper" /> View Full Menu</div></>}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  font-size: 18px;
  background-color: white;
  width: 100%;
  z-index: 10;
  padding: 10px;
  margin: 0 0 0 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
`;

export default BackButton;
