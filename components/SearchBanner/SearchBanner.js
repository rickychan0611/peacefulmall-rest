import { useEffect } from 'react';
import { useIsMobile } from '../../util/useScreenSize';
import SearchBanner_Desktop from './SearchBanner_Desktop';
import SearchBanner_Mobile from './SearchBanner_Mobile';

const SearchBanner = ({ hide }) => {
  const isMobile = useIsMobile();

  return <>{isMobile ? <SearchBanner_Mobile /> : <SearchBanner_Desktop />}</>;
};

export default SearchBanner;
