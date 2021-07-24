import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  selectedPage as selectedPageAtom
} from '../../data/atoms';

import { Grid } from 'semantic-ui-react';
import Content from '../Content';
import ShopSideBar from '../ShopSideBar';
import Shop_Header from './Shop_Header';

const Shop_Desktop_Article = () => {
  const [currentShop] = useRecoilState(currentShopAtom);
  const [, setSelectedPage] = useRecoilState(selectedPageAtom);

  useEffect(() => {
    setSelectedPage("articles")
  },[])

  return (
    <div>
      <Grid>
        <Grid.Column width={4} style={{ paddingBottom: 100 }}>
          <ShopSideBar shop={currentShop} />
        </Grid.Column>

        <Grid.Column width={12} style={{ padding: '30px 20px 80px 20px' }}>
          <div>
            <Shop_Header />
            <Content />
          </div>
        </Grid.Column>
      </Grid>
    </div >
  );
};

export default Shop_Desktop_Article;
