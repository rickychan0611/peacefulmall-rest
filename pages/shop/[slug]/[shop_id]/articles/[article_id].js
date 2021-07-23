import Shop_Desktop_Article from '../../../../../components/Shop/Shop_Desktop_Article';
import Shop_Mobile_Article from '../../../../../components/Shop/Shop_Mobile_Article';
import Shop_Container from '../../../../../components/Shop/Shop_Container';
import { useIsDesktop } from '../../../../../util/useScreenSize';

const articlesId = () => {
  const isDesktop = useIsDesktop();

  return (
    <Shop_Container>
      {isDesktop ? <Shop_Desktop_Article/> : <Shop_Mobile_Article />}
    </Shop_Container>
  );
};

export default articlesId;
