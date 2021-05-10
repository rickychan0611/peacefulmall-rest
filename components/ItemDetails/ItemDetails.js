import { useState } from 'react';
import { useRouter } from 'next/router';
import useIsMobile from '../../util/useIsMobile';
import styled from 'styled-components';
import { HOST_URL } from '../../env';
import toSlug from '../../util/toSlug';
import axios from 'axios';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentItem as currentItemAtom,
  currentStore as currentStoreAtom,
  selections as selectionsAtom
} from '../../data/atoms.js';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';

import { Form, Grid, Icon, Radio, Image, Dimmer, Loader } from 'semantic-ui-react';
import BottomAddBar from '../../components/BottomAddBar';
import _ from 'lodash';
import { useEffect } from 'react';

const ItemDetails = ({ setOpen, fromRestaurantPage }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom);
  const [item, setCurrentItem] = useRecoilState(currentItemAtom);
  const [currentStore, setCurrentStore] = useRecoilState(currentStoreAtom);
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState({ option: 'option0', value: 0 });
  const [qty, setQty] = useState(1);

  const price = 10;

  //function: addItem is called in <BottomAddBar>,
  //update orderItems and localstorage, and then redirect to store's page
  const addItem = (total) => {
    let updatedItems;

    setOrderItems((prev) => {
      //if a prev store's name is equal to the current store, update the object
      if (prev[0] && prev[0].shop.id === currentStore.id) {
        updatedItems = [{ ...item, option: value, qty, total, store: currentStore }, ...prev];
      }
      //if not, replace the whole orderItem object. Add store to currentStore
      else {
        updatedItems = [{ ...item, option: value, qty, total, store: currentStore }];
      }
      localStorage.setItem('orderItems', JSON.stringify(updatedItems));
      return updatedItems;
    });

    router.push('/store/' + toSlug(item.shop.name) + '/' + item.shop.id + '#top');
  };

  //If currentItem is empty, get the product by url id from server
  //then, setCurrentItem and setCurrentStore
  useEffect(async () => {
    setLoading(true);
    const product_id = router.query.item_id;
    const query = () => axios.get(HOST_URL + '/api/singleproduct', {
      params: {
        product_id
      }
    });

      if (item && item.id !== +product_id) {
        setLoading(false);
      }
    else if (!item && product_id) {
      const getProduct = await query()
      setCurrentItem(getProduct.data);
      setCurrentStore(getProduct.data.shop);
      setLoading(false);
      console.log('NO product', getProduct.data);
    }
  }, [router.query.item_id]);

  return (
    <>
      {!item ? (
        <div style={{ height: '80vh' }}>
          <Dimmer inverted active={loading}>
            <Loader active content="Loading" />
          </Dimmer>
        </div>
      ) : (
        <>
          <BackButton
            onClick={() => {
              router.back();
            }}>
            <Icon name="arrow left" /> Back
          </BackButton>
          <Wrapper>
            <Container>
              <StoreHeader
                onClick={() => {
                  // router.push('/store/' + toSlug(selectedStore.name) + '/' + selectedStore.id + '#top');
                  // handleClose();
                }}>
                <Image
                  src={
                    item.shop.logo
                      ? HOST_URL + '/storage/' + item.shop.logo
                      : '/avatar-placeholder.png'
                  }
                  avatar
                  size="mini"
                />
                &nbsp;&nbsp;
                {item.shop.name}
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
          <BottomAddBar qty={qty} setQty={setQty} option={value} price={price} addItem={addItem} />
        </>
      )}
    </>
  );
};

const BackButton = styled.div`
  position: fixed;
  cursor: 'pointer';
  font-size: 18px;
  background-color: white;
  width: 100%;
  z-index: 10;
  padding: 10px;
  margin: 0 0 0 0;
`;
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
  padding-top: 60px;
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

export default ItemDetails;
