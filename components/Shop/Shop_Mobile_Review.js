import { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import {
  selectedPage as selectedPageAtom,
} from '../../data/atoms';

import { Icon } from 'semantic-ui-react';
import BottomNavBar from '../BottomNavBar';
import ReviewFeed from '../ReviewFeed/index.js';
import Shop_Desktop_Header from './Shop_Desktop_Header';

const Shop_Mobile_Review = ({shop}) => {
  const [, setSelectedPage] = useRecoilState(selectedPageAtom);

  useEffect(() => {
    console.log("!!!!!!shop", shop)
    setSelectedPage("reviews")
  }, [])

  return (
    <div>
      <Shop_Desktop_Header />
      <Wrapper>
        <Title>
          <Icon name="star" size="small" style={{ marginRight: 10 }} />
          User Reviews
        </Title>
      </Wrapper>

      {shop?.reviews?.length !== 0 ?
        <ReviewFeed /> : <h4>... No review yet 😋 </h4>}
      <BottomNavBar />
      <br />
      <br />
      <br />
    </div >
  );
};

const Wrapper = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
`;
const Title = styled.h2`
color: "black";
margin: 0 10px 0 0;
display: flex;
align-items: center;
`;

export default Shop_Mobile_Review;
