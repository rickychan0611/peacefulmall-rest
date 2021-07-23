import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import {
  selectedPage as selectedPageAtom
} from '../../data/atoms.js';

const BottomNavBar = () => {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageAtom);

  return (
    <Container>
      <IconWrapper
        selected={selectedPage === "overview"}
        onClick={() => {
          router.push("/shop/" + router.query.slug + "/" + router.query.shop_id)
          setSelectedPage("overview")
        }}>
        <Icon name="store" size="large" />
        <Label>Overview</Label>
      </IconWrapper>
      <IconWrapper selected={selectedPage === "menu"}
        onClick={() => {
          router.push("/shop/" + router.query.slug + "/" + router.query.shop_id + "/menu")
          setSelectedPage("menu")
        }}>
        <Icon name="bars" size="large" />
        <Label>Full Menu</Label>
      </IconWrapper>
      <IconWrapper
        selected={selectedPage === "reviews"}
        onClick={() => {
          router.push("/shop/" + router.query.slug + "/" + router.query.shop_id + "/reviews")
          setSelectedPage("reviews")
        }}>
        <Icon name="star" size="large" />
        <Label>Reviews</Label>
      </IconWrapper>
      <IconWrapper
        selected={selectedPage === "articles"}
        onClick={() => {
          router.push("/shop/" + router.query.slug + "/" + router.query.shop_id + "/articles")
          setSelectedPage("articles")
        }}>
        <Icon name="newspaper" size="large" />
        <Label>Articles</Label>
      </IconWrapper>
      <IconWrapper
        onClick={() => { router.push("/") }}>
        <Icon name="home" size="large" />
        <Label>Home</Label>
      </IconWrapper>
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
  color: ${p => p.selected ? "#ee3160" : "black"};

`;

const Label = styled.div`
  font-size: 12px;
  font-weight: bold;
`;
export default BottomNavBar;
