import { Divider, Label, Icon, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { useRouter } from 'next/router'

import { useRecoilState } from 'recoil';
import  { selections as selectionsAtom }  from '../../data/atoms.js';

const SliderTitle = ({ title, dishChildren, hideViewAll }) => {
  const [selections, setSelections] = useRecoilState(selectionsAtom);

  const router = useRouter()

  return (
    <>
      <Grid verticalAlign='middle'>
        <Grid.Column floated="left" width={12} >
          <Container>
          <Title>{title}</Title>
          {selections.cuisine !== 'all' && (
            <Label as="a" color="blue" onClick={() => setSelections(prev => ({...prev, cuisine: 'All'}))}>
              {selections.cuisine}
              <Icon name="close" />
            </Label>
          )}
          </Container>
        </Grid.Column>
        <Grid.Column floated="right" textAlign="right" width={4}>
        <a style={{cursor: "pointer"}} onClick={() => {
            setSelections(prev => ({...prev, category: title}))
            router.push({
              pathname: '/[cuisine]/[category]',
              query: {cuisine: selections.cuisine, category: title}
            })
          }}>{!hideViewAll && 'View All >'}</a>
        </Grid.Column>
      </Grid>
      {/* <Divider /> */}
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0 0px 0;
`;
const Title = styled.h2`
  color: black;
  margin: 0 10px 0 0;
  display: inline;
`;

export default SliderTitle;
