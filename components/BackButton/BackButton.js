import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const BackButton = () => {
  const router = useRouter();

  return (
    <Container
      onClick={() => {
        router.back();
      }}>
      <Icon name="arrow left" /> Back
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  font-size: 18px;
  background-color: white;
  width: 100%;
  z-index: 10;
  padding: 10px;
  margin: 0 0 0 0;
  cursor: pointer;
`;

export default BackButton;
