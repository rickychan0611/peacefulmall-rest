import { useState } from 'react';
import { useRouter } from 'next/router';
import useIsMobile from '../../util/useIsMobile'
import styled from 'styled-components';

import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedItem as itemAtom, selections as selectionsAtom } from '../../data/atoms.js';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';
import { selectedStore as selectedStoreAtom } from '../../data/storeAtoms.js';

import { Form, Grid, Icon, Radio, Image } from 'semantic-ui-react';
import BottomAddBar from '../../components/BottomAddBar';
import _ from 'lodash';

const ItemDetails = ({ setOpen, fromRestaurantPage }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [item, setItem] = useRecoilState(itemAtom);
  const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom);
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreAtom);

  const [value, setValue] = useState({ option: 'option0', value: 0 });
  const [qty, setQty] = useState(1);

  const handleClose = () => {
    !isMobile ? setOpen(false) : router.back();
  };

  const price = 10;
  const store = selections.restaurant;
  console.log(selectedStore)
  console.log("item", item)

  const addItem = (total) => {
    //if a restaurant's name is equal to the current resturant, update the object
    //if not, replace the whole orderItem array. Add restaurant to currentRestaurant
    let updatedItems;
    setOrderItems((prev) => {
      if (prev[0] && prev[0].store.slug === selectedStore.slug) {
        updatedItems = [{ ...item, option: value, qty, total, store: selectedStore }, ...prev];
      }
      //replace order with new restaurant's item
      else {
        updatedItems = [{ ...item, option: value, qty, total, store: selectedStore }];
      }
      localStorage.setItem('orderItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
    !fromRestaurantPage && item.restaurant != undefined && router.push('/store/' + selectedStore.slug + "#top")
  };

  return (
    <>
      <div style={{ cursor: 'pointer', margin: 10, fontSize: 18 }}
        onClick={() => {
          router.back()
          handleClose()
        }}  >
        <Icon name="arrow left"/> Back
      </div>
      <Container>
        <StoreHeader onClick={() => {
          router.push('/store/' + selectedStore.slug + "#top")
          handleClose()
        }}  >
          <Image src='/avatar-placeholder.png' avatar size="mini" />&nbsp;&nbsp;
          {selectedStore.name}
        </StoreHeader>
        <h2>{item.name}</h2>
        <Img src={item.img} />
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

      <BottomAddBar
        qty={qty}
        setQty={setQty}
        option={value}
        price={price}
        addItem={addItem}
        setOpen={setOpen}
      />
    </>
  );
};

const Container = styled.div`
  padding: 20px;
  padding-bottom: 90px;
  min-height: calc(100vh - 60px);
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

export default ItemDetails;
