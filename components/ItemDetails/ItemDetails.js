import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { 
  selectedItem as itemAtom,

} from '../../data/atoms.js';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';

import { Form, Grid, Icon, Radio } from 'semantic-ui-react';
import BottomAddBar from '../../components/BottomAddBar';
import _ from 'lodash';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';

const ItemDetails = ({ setOpen }) => {
  const isDesktop = useDesktopMediaQuery();
  const router = useRouter();
  const [item, setItem] = useRecoilState(itemAtom);
  const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom);
  const [value, setValue] = useState({option: 'option0', value: 0});
  const [qty, setQty] = useState(1);

  const handleClose = () => {
    isDesktop ? setOpen(false) : router.back();
  };

  const price = 10

  const addItem = (total) => {
    setOrderItems(prev => {
      let updatedItems = [{...item, option: value, qty, total}, ...prev]
      localStorage.setItem('orderItems', JSON.stringify(updatedItems))
      return updatedItems
  })}

  return (
    <>
      <div onClick={() => handleClose()} style={{ cursor: 'pointer', margin: 10 }}>
        <Icon name="arrow left" size="large" /> Restaurant's page
      </div>
      <Container>
        <h2>{item.name}</h2>
        <Img src={item.img} />
        <Description>{item.description}</Description>
        <h4>Choose your options</h4>
        <Form>
          <Form.Field>
            Selected option: <b>{value.option} : +${value.value}</b>
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
                      setValue({option: value, value: i});
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

      <BottomAddBar qty={qty} setQty={setQty} option={value} price={price} addItem={addItem} setOpen={setOpen}/>
    </>
  );
};

const Container = styled.div`
  padding: 20px;
  padding-bottom: 90px;
  min-height: calc(100vh - 60px);
`;
const Description = styled.h4`
  color: grey;
`;
const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export default ItemDetails;
