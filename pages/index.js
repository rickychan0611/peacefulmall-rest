import { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { repos as reposAtom, view as viewAtom } from '../atoms.js';
import { Container, Image } from 'semantic-ui-react';
import CatBar from '../components/CatBar';
import TopBar from '../components/TopBar';
import SearchBanner from '../components/SearchBanner';
import Footer from '../components/Footer';

const Home = () => {
  const [repos, setRepos] = useRecoilState(reposAtom);
  const view = useRecoilValue(viewAtom);

  useEffect(async () => {
    // const url = `https://reqres.in/api/users?page=${view}`;
    // const resp = await fetch(url);
    // const body = await resp.json();
    // setRepos(body.data);
  }, []);

  return (
    <>
      <TopBar />
      <Image src="/banner.jpg" />
      <SearchBanner />
      <Container style={{ marginTop: '2em' }}>
        <CatBar />
      </Container>
      <Footer />
    </>
  );
};

const StyledContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;

  div {
    margin: 10px 0 10px 0;
  }
`;

export default Home;
