import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  selectedPage as selectedPageAtom
} from '../../data/atoms';

import Content_Mobile from '../Content/Content_Mobile';
import BottomNavBar from '../BottomNavBar';
import Shop_Desktop_Header from './Shop_Desktop_Header';

const Shop_Desktop_Article = () => {
  const [, setSelectedPage] = useRecoilState(selectedPageAtom);

  useEffect(() => {
    setSelectedPage("articles")
  }, [])

  return (
    <div>
      <Content_Mobile />
      <BottomNavBar />
      <br />
      <br />
      <br />
    </div >
  );
};

export default Shop_Desktop_Article;
