import Shop_Desktop_Article_Index from '../../../../../components/Shop/Shop_Desktop_Article_Index';
import Shop_Mobile_Article_Index from '../../../../../components/Shop/Shop_Mobile_Article_Index';
import Shop_Container from '../../../../../components/Shop/Shop_Container';
import { useIsDesktop } from '../../../../../util/useScreenSize';

const article = () => {
  const isDesktop = useIsDesktop();

  return (
    <Shop_Container>
      {isDesktop ? <Shop_Desktop_Article_Index/> : <Shop_Mobile_Article_Index />}
    </Shop_Container>
  );
};

export default article;
