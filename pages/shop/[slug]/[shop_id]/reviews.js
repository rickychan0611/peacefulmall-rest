import Shop_Desktop_Review from '../../../../components/Shop/Shop_Desktop_Review';
import Shop_Mobile_Review from '../../../../components/Shop/Shop_Mobile_Review';
import Shop_Container from '../../../../components/Shop/Shop_Container';
import { useIsDesktop } from '../../../../util/useScreenSize';

const menu = () => {
  const isDesktop = useIsDesktop();

  return (
    <Shop_Container>
      {isDesktop ? <Shop_Desktop_Review/> : <Shop_Mobile_Review />}
    </Shop_Container>
  );
};

export default menu;
