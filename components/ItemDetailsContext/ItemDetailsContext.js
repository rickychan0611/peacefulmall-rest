import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HOST_URL } from '../../env';

import { useRecoilState } from 'recoil';
import {
  currentItem as currentItemAtom,
  currentShop as currentShopAtom
} from '../../data/atoms.js';

import { Form, Grid, Icon, Radio, Image } from 'semantic-ui-react';

import BottomAddBar from '../BottomAddBar'

const ItemDetailsContext = ({ checkOutListItem }) => {
  const [currentItem, setCurrentItem] = useRecoilState(currentItemAtom);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [item, setItem] = useState();
  const [value, setValue] = useState({ option: 'option0', value: 0 });
  const [quantity, setQty] = useState(1);

  useEffect(() => {
    console.log(checkOutListItem)
    checkOutListItem ? setItem(checkOutListItem) : setItem(currentItem);
  }, [checkOutListItem, currentItem]);

  return (
    <>
      {item && (
        <Wrapper>
          <Container>
            <StoreHeader
              onClick={() => {
                // router.push('/store/' + toSlug(selectedStore.name) + '/' + selectedStore.id + '#top');
                // handleClose();
              }}>
              <Image
                src={
                  currentShop.logo
                    ? HOST_URL + '/storage/' + currentShop.logo
                    : '/avatar-placeholder.png'
                }
                avatar
                size="mini"
              />
              &nbsp;&nbsp;
              {currentShop.name}
            </StoreHeader>
            <h2>{item.name}</h2>

            {item.images && item.images[0] ? (
              <Img src={HOST_URL + '/storage/' + JSON.parse(item.images)[0]} />
            ) : (
              <Img src="/no-image.png" />
            )}

            <Description>{item.description}</Description>
            <h4>Choose your options</h4>
            <Form>
              <Form.Field>
                Selected option:{' '}
                <b>
                  {value.option} : +${value.value}
                </b>
              </Form.Field>
              {_.times(6, (i) => (
                <Form.Field key={i}>
                  <Grid>
                    <Grid.Column width={8}>
                      <Radio
                        label={'option' + i}
                        name="radioGroup"
                        value={'option' + i}
                        checked={value.option === 'option' + i}
                        onChange={(e, { value }) => {
                          console.log(e);
                          setValue({ option: value, value: i });
                        }}
                      />
                    </Grid.Column>
                    <Grid.Column width={8} style={{ textAlign: 'right' }}>
                      + ${i}
                    </Grid.Column>
                  </Grid>
                </Form.Field>
              ))}
            </Form>
          </Container>
        </Wrapper>
      )}
      {/* <BottomAddBar /> */}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Container = styled.div`
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 150px;
  min-height: calc(100vh - 60px);
  width: 100%;
  max-width: 500px;
`;
const StoreHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
const Description = styled.h4`
  color: grey;
`;
const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export default ItemDetailsContext;
