import Shop_Desktop_Menu from '../../../../components/Shop/Shop_Desktop_Menu';
import Shop_Mobile_Menu from '../../../../components/Shop/Shop_Mobile_Menu';
import Shop_Container from '../../../../components/Shop/Shop_Container';
import { useIsDesktop } from '../../../../util/useScreenSize';

const menu = () => {
  const isDesktop = useIsDesktop();

  return (
    <Shop_Container>
      {isDesktop ? <Shop_Desktop_Menu/> : <Shop_Mobile_Menu />}
    </Shop_Container>
  );
};

export default menu;
