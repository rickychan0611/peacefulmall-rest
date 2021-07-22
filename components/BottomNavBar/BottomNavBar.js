import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { openSideMenu as openSideMenuAtom } from '../../data/atoms.js';

const BottomNavBar = () => {
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);

  return (
    <Container>
      <IconWrapper onClick={() => {router.push("/shop/" + router.query.slug + "/" + router.query.shop_id)}}>
        <Icon name="store" size="large"/>
        <Label>Overview</Label>
      </IconWrapper>
      <IconWrapper onClick={() => {router.push("/shop/" + router.query.slug + "/" + router.query.shop_id + "/menu")}}>
        <Icon name="bars" size="large"/>
        <Label>Full Menu</Label>
      </IconWrapper>
      <IconWrapper onClick={() => {router.push("/shop/" + router.query.slug + "/" + router.query.shop_id + "/reviews")}}>
        <Icon name="star" size="large"/>
        <Label>Reviews</Label>
      </IconWrapper>
      <IconWrapper onClick={() => {router.push("/shop/" + router.query.slug + "/" + router.query.shop_id + "/articles")}}>
        <Icon name="newspaper" size="large"/>
        <Label>Articles</Label>
      </IconWrapper>
      {/* <IconWrapper onClick={() => {router.push("/shop/" + router.query.slug + "/" + router.query.shop_id + "#shopTop")}}>
        <Icon name="arrow alternate circle up outline" size="large"/>
        <Label>To top</Label>
      </IconWrapper> */}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  background-color: white;
  width: 100%;
  height: 60px;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 30px rgba(0,0,0,.2);
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: bold;
`;
export default BottomNavBar;
