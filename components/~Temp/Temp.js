import { useRouter } from 'next/router';
import styled from 'styled-components';
import {  } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { openSideMenu as openSideMenuAtom } from '../../data/atoms.js';

const Temp = () => {
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);

  return (
    <Container>
    </Container>
  );
};

const Container = styled.div`

`;

export default Temp;
