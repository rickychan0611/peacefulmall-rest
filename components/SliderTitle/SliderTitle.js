import { Divider, Label, Icon } from 'semantic-ui-react';

import { useRecoilState } from 'recoil';
import { selectedCuisine as selectedCuisineAtom } from '../../data/atoms.js';
import styled from 'styled-components';

const SliderTitle = ({ title }) => {
  const [selectedCuisine, setSelectedCuisine] = useRecoilState(selectedCuisineAtom);

  return (
    <>
      <Container>
        <h2 style={{ color: 'black', margin: '0 10px 0 0' }}>{title}</h2>
        {selectedCuisine && (
          <Label as="a" color="blue" onClick={() => setSelectedCuisine('All')}>
            {selectedCuisine}
            {selectedCuisine !== "All" && <Icon name="close" />}
          </Label>
        )}
      </Container>
      <Divider />
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 0px 0;
`;

export default SliderTitle;
