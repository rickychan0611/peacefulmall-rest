import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Button, Header, Icon, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { orderDetails as orderDetailsAtom } from '../data/orderAtoms.js';
import { 
  appReady as appReadyAtom,   
  showCheckoutButton as showCheckoutButtonAtom,
  selections as selectionsAtom
} from '../data/atoms';

import OrderItem from '../components/OrderItem/';
import TotalAmountList from '../components/TotalAmountList/';


const checkout = () => {
  const router = useRouter()
  const orderDetails = useRecoilValue(orderDetailsAtom);
  const selections = useRecoilValue(selectionsAtom);
  const [deliveryTime, setDeliveryTime] = useState("ASAP")
  const appReady = useRecoilValue(appReadyAtom);
  const [, setShowCheckoutButton] = useRecoilState(showCheckoutButtonAtom);

  useEffect(() => {
    appReady && orderDetails && !orderDetails.orderItems[0] && router.push('/')
  },[orderDetails])
  
  useEffect(() => {
    console.log("selections", selections)
    setShowCheckoutButton(false);
    return ()=> setShowCheckoutButton(true)
  },[])

  return (
    <>
      <Container>
        <OrdersContainer>

          <h2>Delivery Details</h2>

          <Header>Address</Header>
          <H4>
            <Icon name="point" />
            1128 W Broadway, Vancouver, BC, J4Y OK7, Canada <a> edit</a>
          </H4>
          <H4>
            <Icon name="smile outline" />
            Instruction: Leave at door <a> edit</a>
          </H4>

          <Header>Delivery Time</Header>
          <div>
              <Button color={deliveryTime === "ASAP" ? "green" : "white"} onClick={()=>setDeliveryTime("ASAP")}>ASAP: 20 - 30min</Button>
              <Button color={deliveryTime === "Schedule" ? "green" : "white"} onClick={()=>setDeliveryTime("Schedule")}>Schedule</Button>
          </div>

          <Header>Order Summary</Header>
          {orderDetails.orderItems &&
            orderDetails.orderItems[0] &&
            orderDetails.orderItems.map((item, i) => {
              return <OrderItem item={item} index={i} key={i} />;
            })}
        <Divider />
        <a onClick={()=> router.push('/store/' + orderDetails.orderItems[0].store.slug)}>+ Add more items</a>
        <Divider />

        <TotalAmountList orderDetails={orderDetails}/> 

        <Divider />

        <Header>Payment method</Header>
        <div>
        {/* <Button color="red"><Icon name="credit card" />Credit Card</Button>
        <Button color="blue"><Icon name="paypal" />Paypal</Button> */}
        </div>
        <Divider />

          <CheckoutButton onClick={() => {}}>
            <div>Place Order</div>
            <div>${orderDetails.total}</div>
          </CheckoutButton>

        </OrdersContainer>
      </Container>
    </>
  );
};

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 80px 20px;
`;
const H4 = styled.h4`
  margin: 0 0 10px 0;
`;
const CheckoutButton = styled.div`
  background-color: black;
  margin-top: 20px;
  margin-bottom: 40px;
  color: white;
  border-radius: 30px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
`;
export default checkout;
