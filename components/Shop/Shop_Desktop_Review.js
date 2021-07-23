import { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  selectedPage as selectedPageAtom,
} from '../../data/atoms';

import { Grid, Icon } from 'semantic-ui-react';
import ShopSideBar from '../ShopSideBar';
import ReviewFeed from '../ReviewFeed/index.js';
import Shop_Desktop_Header from './Shop_Desktop_Header';

const Shop_Desktop_Review = ({ shop }) => {
  const [currentShop] = useRecoilState(currentShopAtom);
  const [, setSelectedPage] = useRecoilState(selectedPageAtom);

  useEffect(() => {
    setSelectedPage("reviews")
  }, [])

  return (
    <div>
      <Grid>
        <Grid.Column width={4} style={{ paddingBottom: 100 }}>
          <ShopSideBar shop={currentShop} />
        </Grid.Column>
        <Grid.Column width={12} style={{ padding: '30px 20px 80px 20px' }}>
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
          </div>
        </Grid.Column>
      </Grid>
    </div >
  );
};

const Wrapper = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
`;
const Avatar = styled.img`
display: flex;
justify-content: center;
align-items: center;
border-radius: 30px;
border: solid 2px white;
height: 60px;
width: 60px;
object-fit: contain;
box-shadow: 0px 0px 5px#a5a5a5;
margin-right: 20px;
`;
const Title = styled.h2`
color: "black";
margin: 0 10px 0 0;
display: flex;
align-items: center;
`;

export default Shop_Desktop_Review;
