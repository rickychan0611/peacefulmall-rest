import { useMobileMediaQuery } from '../../components/Responsive/Responsive';
import TopBar_Mobile from './TopBar_Mobile.js';
import TopBar_Desktop from './TopBar_Desktop.js';

const TopBar = () => {
  const isMobile = useMobileMediaQuery();

  return (
    <>{isMobile ? <TopBar_Mobile /> : <TopBar_Desktop />}</>
  );
};

export default TopBar;
