import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Button, Header, Icon, Divider, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  orderDetails as orderDetailsAtom,
  shippingMethod as shippingMethodAtom
} from '../data/orderAtoms.js';
import {
  appReady as appReadyAtom,
  showCheckoutButton as showCheckoutButtonAtom,
  selections as selectionsAtom
} from '../data/atoms';

import OrderItem from '../components/OrderItem/';
import TotalAmountList from '../components/TotalAmountList/';
import AddressChange from '../components/AddressChange/AddressChange.js';

const checkout = () => {
  const router = useRouter();
  const orderDetails = useRecoilValue(orderDetailsAtom);
  const selections = useRecoilValue(selectionsAtom);
  const [deliveryTime, setDeliveryTime] = useState('ASAP');
  const appReady = useRecoilValue(appReadyAtom);
  const [, setShowCheckoutButton] = useRecoilState(showCheckoutButtonAtom);
  const [, setShippingMethod] = useRecoilState(shippingMethodAtom);
  const [open, setOpen] = useState(false);

  const EditButton = () => (
    <Edit
      onClick={() => {
        setOpen(true);
      }}>
      <Icon name="edit" />
      edit
    </Edit>
  );

  useEffect(() => {
    console.log(orderDetails)
    // appReady && orderDetails && !orderDetails.orderItems[0] && router.push('/');
  }, [orderDetails]);

  useEffect(() => {
    // setShowCheckoutButton(false);
    // return () => setShowCheckoutButton(true);
  }, []);

  return (
    <>
    
    </>
  )
  // return (
  //   <>
  //     <Modal closeIcon open={open} size="tiny" onClose={() => setOpen(false)}>
  //       <AddressChange setOpen={setOpen} />
  //     </Modal>

  //     {orderDetails.store && (
  //       <Container>
  //         <OrdersContainer>
  //           <h4 style={{ margin: 0 }}>Order from</h4>
  //           <h2 style={{ margin: 0 }}>{orderDetails.store && orderDetails.store.name}</h2>
  //           <Divider />
  //           <iframe
  //             width="100%"
  //             height="250"
  //             style={{ border: 10 }}
  //             loading="lazy"
  //             allowFullScreen
  //             src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBugBL6F0x-jyq_4l-6OS1i8Du6yv9bH-s&q=
  //             ${orderDetails.store.address}`}></iframe>
  //           <Divider />

  //           <Header>Delivery or Pick-up?</Header>
  //           <PickupContainer style={{ justifyContent: 'flex-start' }}>
  //             <Row onClick={() => setShippingMethod('Delivery')}>
  //               <RadioButton
  //                 readOnly
  //                 type="radio"
  //                 value={'Delivery'}
  //                 checked={orderDetails.shippingMethod === 'Delivery'}
  //               />
  //               <Column>
  //                 <H4>Delivery</H4>
  //               </Column>
  //             </Row>
  //             <Row style={{ marginLeft: 40 }} onClick={() => setShippingMethod('Pick-up')}>
  //               <RadioButton
  //                 readOnly
  //                 type="radio"
  //                 value={'Pick-up'}
  //                 checked={orderDetails.shippingMethod === 'Pick-up'}
  //               />
  //               <Column>
  //                 <H4>Pick-up</H4>
  //               </Column>
  //             </Row>
  //           </PickupContainer>

  //           {orderDetails.shippingMethod === 'Delivery' && (
  //             <>
  //               <Header>Your Address</Header>
  //               <H4>
  //                 <Icon name="point" />
  //                 {orderDetails.deliveryAddress.address1},&nbsp;
  //                 {orderDetails.deliveryAddress.address2 &&
  //                   orderDetails.deliveryAddress.address2 + ','}
  //                 &nbsp;
  //                 {orderDetails.deliveryAddress.city},&nbsp;
  //                 {orderDetails.deliveryAddress.province},&nbsp;
  //                 {orderDetails.deliveryAddress.country}
  //                 <EditButton />
  //               </H4>
  //               <H4>
  //                 <Icon name="smile outline" />
  //                 Instruction: {orderDetails.deliveryAddress.dropoff}
  //                 <EditButton />
  //               </H4>
  //               <H4 style={{ marginLeft: 20 }}>{orderDetails.deliveryAddress.instructions}</H4>

  //               {/* <Header>Delivery Time</Header>
  //               <div>
  //                 <Button
  //                   color={deliveryTime === 'ASAP' ? 'green' : 'white'}
  //                   onClick={() => setDeliveryTime('ASAP')}>
  //                   ASAP: 20 - 30min
  //                 </Button>
  //                 <Button
  //                   color={deliveryTime === 'Schedule' ? 'green' : 'white'}
  //                   onClick={() => setDeliveryTime('Schedule')}>
  //                   Schedule
  //                 </Button>
  //               </div> */}
  //             </>
  //           )}
  //           <Header>Order Summary</Header>
  //           {orderDetails.orderItems &&
  //             orderDetails.orderItems[0] &&
  //             orderDetails.orderItems.map((item, i) => {
  //               return <OrderItem item={item} index={i} key={i} />;
  //             })}
  //           <Divider />
  //           <a onClick={() => router.push('/store/' + orderDetails.orderItems[0].store.slug)}>
  //             + Add more items
  //           </a>
  //           <Divider />

  //           <TotalAmountList orderDetails={orderDetails} />

  //           <Divider />
  //           <Header>Payment method</Header>
  //           <Divider />

  //           <CheckoutButton onClick={() => {}}>
  //             <div>Place Order</div>
  //             <div>${orderDetails.total}</div>
  //           </CheckoutButton>
  //         </OrdersContainer>
  //       </Container>
  //     )}
  //   </>
  // );
};

const OrdersContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 80px 0px;
`;
const H4 = styled.h4`
  margin: 0 0 10px 0;
`;
const Edit = styled.a`
  cursor: pointer;
  margin-left: 10px;
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
const PickupContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  input[type='radio'] {
    border: 0px;
    width: 1.2em;
    height: 1.2em;
    color: black;
  }
`;
const RadioButton = styled.input`
  margin-right: 15px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
export default checkout;
