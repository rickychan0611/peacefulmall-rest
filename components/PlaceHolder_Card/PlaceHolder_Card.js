import _ from 'lodash';
import styled from 'styled-components';

import { Placeholder } from 'semantic-ui-react';

const PlaceHolder_Card = ({size}) => (
  <>
    {_.times(50, (i) => {
      return (
        <Card key={i}>
          <Placeholder style={{ height: size, width: size }}></Placeholder>
        </Card>
      );
    })}
  </>
);

const Card = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
  margin: 10px;
  width: 100%;
  cursor: pointer;
`;

export default PlaceHolder_Card;
