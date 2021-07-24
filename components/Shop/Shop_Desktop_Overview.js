import { useEffect } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentShop as currentShopAtom,
  selectedPage as selectedPageAtom
} from '../../data/atoms';
import Shop_Header from './Shop_Header';
import ShopSideBar from '../ShopSideBar';
import Shop_Overview_Sliders from './Shop_Overview_Sliders';

const Shop_Desktop = () => {

  const currentShop = useRecoilValue(currentShopAtom);
  const [, setSelectedPage] = useRecoilState(selectedPageAtom);

  useEffect(() => {
    setSelectedPage("overview")
  }, [])

  return (
    <div>
      <Grid>
        <Grid.Column width={4} style={{ paddingBottom: 100 }}>
          <ShopSideBar shop={currentShop} />
        </Grid.Column>

        <Grid.Column width={12} style={{ padding: '30px 20px 80px 20px' }}>
          <div>
            <Shop_Header />

            <Shop_Overview_Sliders />

          </div>
        </Grid.Column>
      </Grid>
    </div >
  );
};

export default Shop_Desktop;
