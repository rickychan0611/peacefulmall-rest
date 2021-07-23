import Shop_Desktop_Overview from '../../../../components/Shop/Shop_Desktop_Overview';
import Shop_Mobile_Overview from '../../../../components/Shop/Shop_Mobile_Overview';
import Shop_Container from '../../../../components/Shop/Shop_Container';
import { useIsDesktop } from '../../../../util/useScreenSize';

const shop = () => {
  const isDesktop = useIsDesktop();

  return (
    <Shop_Container>
      {isDesktop ? <Shop_Desktop_Overview /> : <Shop_Mobile_Overview />}
    </Shop_Container>
  );
};

export default shop;
