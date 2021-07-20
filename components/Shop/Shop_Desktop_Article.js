import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  selectedPage as selectedPageAtom
} from '../../data/atoms';

import { Grid, Icon } from 'semantic-ui-react';
import Content from '../Content';
import ShopSideBar from '../ShopSideBar';
import Shop_Desktop_Header from './Shop_Desktop_Header';

const Shop_Desktop_Article = () => {
  const router = useRouter();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [selectedPage, setSelectedPage] = useRecoilState(selectedPageAtom);
  const [result, setResult] = useState();
  const url = '/shop/' + currentShop.name + '/' + currentShop.id
  const [photos, setPhotos] = useState([]);

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
            <Shop_Desktop_Header />
            <Content />
          </div>
        </Grid.Column>
      </Grid>
    </div >
  );
};

export default Shop_Desktop_Article;
