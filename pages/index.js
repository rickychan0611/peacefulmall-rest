import { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';
import {  useRecoilState, useRecoilValue } from 'recoil';
import { repos as reposAtom, view as viewAtom} from '../atoms.js';
import NextButton from '../components/NextButton';

const Home = () => {
  const [repos, setRepos] = useRecoilState(reposAtom);
  const view = useRecoilValue(viewAtom);

  useEffect(async () => {
    const url = `https://reqres.in/api/users?page=${view}`;
    const resp = await fetch(url);
    const body = await resp.json();
    setRepos(body.data);
  }, [view]);

  return (
    <StyledContainer>
      {repos.map((repo) => (
        <div key={repo.id}>
          <a href={repo.avatar}>
            {repo.first_name + " " + repo.last_name}
          </a>
        </div>
      ))}
      <NextButton />
    </StyledContainer>
  )
};

const StyledContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;

  div {
    margin: 10px 0 10px 0;
  }
`;

export default Home;
