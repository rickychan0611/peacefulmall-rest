import { useRouter } from 'next/router';
import styled from 'styled-components';
import {  } from 'semantic-ui-react';
import { useDesktopMediaQuery } from '../Responsive/Responsive';
import { useRecoilState } from 'recoil';
import { openSideMenu as openSideMenuAtom } from '../../data/atoms.js';

const Temp = () => {
  const router = useRouter();
  const isDesktop = useDesktopMediaQuery();
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);

  return (
    <Container>
    </Container>
  );
};

const Container = styled.div`

`;

export default Temp;
