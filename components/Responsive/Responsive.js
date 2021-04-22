import { useMediaQuery } from 'react-responsive';

export const DesktopView = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
export const TabletView = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
export const MobileView = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

export const useDesktopMediaQuery = () => useMediaQuery({ query: '(min-width: 900px)' });

export const useTableMediaQuery = () => useMediaQuery({ query: '(min-width: 768px, max-width: 901px)' });

export const useMobileMediaQuery = () => useMediaQuery({ query: '(max-width: 767px)' });