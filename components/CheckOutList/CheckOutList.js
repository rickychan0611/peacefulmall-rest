import {useRouter} from 'next/router';
import styled from 'styled-components';
import { Sidebar, Icon } from 'semantic-ui-react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { 
  openCheckOutList as openCheckOutListAtom,
 } from '../../data/atoms.js';
import { 
  orderItems as orderItemsAtom,
  orderDetails as orderDetailsAtom
 } from '../../data/orderAtoms.js';

import OrderItem from '../OrderItem';
import { Router } from 'next/router';

const CheckOutList = () => {
  const router = useRouter();
  const [openCheckOutList, setOpenCheckOutList] = useRecoilState(openCheckOutListAtom);
  const orderDetails = useRecoilValue(orderDetailsAtom);
  const [orderItems, ] = useRecoilState(orderItemsAtom);

  const total = () => {
    let counter = 0
    orderItems[0] && orderItems.forEach(item => {
      counter = counter + item.total
    })
    return counter.toFixed(2)
  }

  return (
    <SidebarContainer
      animation="overlay"
      direction="right"
      onHide={() => setOpenCheckOutList(false)}
      width="wide"
      visible={openCheckOutList}
    >
      <Icon name="close" size="large"
          style={{ marginTop: 80, marginLeft: 10, marginBottom: 20, cursor: "pointer" }}
          onClick={()=>setOpenCheckOutList(false)}/>
      {orderItems && orderItems[0] ?
        <OrdersContainer>
          <H4>Your Order</H4>
          <H4 style={{ color: 'red' }}>{orderDetails.store && orderDetails.store.name}</H4>
          <CheckoutButton
            onClick={() => {
              router.push('/checkout')
              setOpenCheckOutList(!openCheckOutList)}}>
            <H4>Checkout</H4>
            <H4>${orderDetails.subtotal}</H4>
          </CheckoutButton>
          {orderItems[0] && orderItems.map((item, i) => {
            return (
              <OrderItem item={item} index={i} key={i} />
            )
          })}
        </OrdersContainer>
        :
        <>
          <EmptyMsg>
            <Img src="/cook-girl.jpg" />
            <h4 style={{ color: 'gray' }}>
              Your cart is empty <br />
          Add items to get started!
        </h4>
          </EmptyMsg>
        </>
      }
    </SidebarContainer>
  );
};

const SidebarContainer = styled(Sidebar)`
  background-color: white;
  position: fixed !important;
  box-shadow: 10px 0px 25px rgba(0, 0, 0, .3);
  max-width: 320px;
`;
const EmptyMsg = styled.div`
  display: flex;
  justify-items: center;
  text-align: center;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 80px 20px;
`;
const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 0px 20px;
`;
const H4 = styled.h4`
  margin: 0;
`;
const CheckoutButton = styled.div`
  background-color: #ff614d;
  margin-top: 20px;
  margin-bottom: 40px;
  color: white;
  border-radius: 30px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
const Img = styled.img`
  height: 200px;
  width: 100%;
  object-fit: contain;
`;
export default CheckOutList;
