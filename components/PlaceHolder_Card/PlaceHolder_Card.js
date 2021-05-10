import _ from 'lodash';
import styled from 'styled-components';

import { Placeholder } from 'semantic-ui-react';

const PlaceHolder_Card = () => (
  <>
    {_.times(10, (i) => {
      return (
        <Card key={i}>
          <Placeholder style={{ height: 250, width: 250, margin: '0 0 0 0px' }}></Placeholder>
        </Card>
      );
    })}
  </>
);

const Card = styled.div`
  display: inline-block;
  position: relative;
  margin: 10px;
  width: 250px;
  cursor: pointer;
`;

export default PlaceHolder_Card;
