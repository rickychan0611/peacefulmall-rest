import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Sidebar, Icon } from 'semantic-ui-react';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  openCheckOutList as openCheckOutListAtom,
  loginPending as loginPendingAtom
} from '../../data/atoms.js';
import {
  orderItems as orderItemsAtom,
  orderDetails as orderDetailsAtom
} from '../../data/orderAtoms.js';
import { user as userAtom } from '../../data/userAtom';

import OrderItem from '../OrderItem';

const CheckOutList = () => {
  const router = useRouter();
  const [openCheckOutList, setOpenCheckOutList] = useRecoilState(openCheckOutListAtom);
  const orderDetails = useRecoilValue(orderDetailsAtom);
  const [orderItems] = useRecoilState(orderItemsAtom);
  const [loginPending, setLoginPending] = useRecoilState(loginPendingAtom);
  const user = useRecoilValue(userAtom);

  return (
    <SidebarContainer
      animation="overlay"
      direction="right"
      // onHide={() => setOpenCheckOutList(false)}
      width="wide"
      visible={openCheckOutList}>
      <Icon
        name="close"
        size="large"
        style={{ marginTop: 80, marginLeft: 10, marginBottom: 20, cursor: 'pointer' }}
        onClick={() => setOpenCheckOutList(false)}
      />
      {orderItems && orderItems[0] ? (
        <OrdersContainer>
          <H4>You are ordering from: </H4>
          <H4
            style={{ marginTop: 10, cursor: 'pointer', color: '#4183c4' }}
            onClick={() =>
              router.push('/shop/' + orderDetails.shop.name + '/' + orderDetails.shop.id)
            }>
            {orderDetails.shop && orderDetails.shop.name}
            <Icon name="linkify" />
          </H4>
          <CheckoutButton
            onClick={() => {
              if (!user) {
                setLoginPending(true);
                router.push('/sign-in');
              }
              else router.push('/checkout');
              setOpenCheckOutList(!openCheckOutList);
            }}>
            <H4>Checkout</H4>
            <H4>${orderDetails.subtotal.toFixed(2)}</H4>
          </CheckoutButton>

          {orderItems[0] &&
            orderItems.map((item, i) => {
              return <OrderItem item={item} index={i} key={i} />;
            })}
        </OrdersContainer>
      ) : (
        <>
          <EmptyMsg>
            <Img src="/cook-girl.jpg" />
            <h4 style={{ color: 'gray' }}>
              Your cart is empty <br />
              Add items to get started!
            </h4>
          </EmptyMsg>
        </>
      )}
    </SidebarContainer>
  );
};

const SidebarContainer = styled(Sidebar)`
  background-color: white;
  position: fixed !important;
  box-shadow: 10px 0px 25px rgba(0, 0, 0, 0.3);
  max-width: 90vw;
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
  background-color: #ee3160;
  margin-top: 20px;
  margin-bottom: 10px;
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
