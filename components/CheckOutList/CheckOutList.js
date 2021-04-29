import styled from 'styled-components';
import { Sidebar } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { openCheckOutList as openCheckOutListAtom } from '../../data/atoms.js';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';
import OrderItem from '../OrderItem';

const CheckOutList = () => {
  const [openCheckOutList, setOpenCheckOutList] = useRecoilState(openCheckOutListAtom);
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
      vertical
      width="wide"
      visible={openCheckOutList}
    >
      {orderItems[0] ?
        <OrdersContainer>
          <H4>Your Order</H4>
          <H4 style={{ color: 'red' }}>Restaurant's name</H4>
          <CheckoutButton
            onClick={() => setOpenCheckOutList(!openCheckOutList)}>
            <H4>Checkout</H4>
            <H4>${total()}</H4>
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
  padding: 80px 20px;
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
`;
const Img = styled.img`
  height: 200px;
  width: 100%;
  object-fit: contain;
`;
export default CheckOutList;
