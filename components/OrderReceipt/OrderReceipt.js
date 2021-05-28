import { Container, Button, Header, Icon, Divider, Modal, Input, Form } from 'semantic-ui-react';
import styled from 'styled-components';

import OrderItem from '../OrderItem/';

const OrderReceipt = ({ order }) => {
  return (
    <>
        <OrdersContainer>
          <h4 style={{ margin: 0 }}>Order from</h4>
          <h2 style={{ margin: 0 }}>{order.shop.name}</h2>
          <Divider />
          <>
            <H4>{order.receiver_name && 'Receiver: ' + order.receiver_name.toUpperCase()} </H4>
            <H4>Your Address:</H4>
            <H4>
              {order.receiver_detail_address},&nbsp;
              {order.receiver_city},&nbsp;
              {order.receiver_province},&nbsp;
              {order.receiver_country} <br />
              {order.receiver_phone}
              <br />
            </H4>
          </>
          <Header>Order Summary</Header>
          {order.order_items.map((item, i) => {
            return (
              <ItemContainer>
                <Qty>
                  <ItemText style={{ minWidth: '30px' }}>{item.product_quantity} x</ItemText>
                  <div>
                    <ItemName>{item.product_name}</ItemName>
                    {/* {item.option && item.option.value !== 0 && (
                      <p>• {item.option.option + ' ' + '+$' + item.option.value}</p>
                    )} */}
                  </div>
                </Qty>
                <ItemText>${item.sub_total_amount}</ItemText>
              </ItemContainer>
            );
          })}
          <Divider />
          <TotalContainer>
            <Content>Subtotal:</Content>
            <Price>${order.sub_total_amount}</Price>
          </TotalContainer>
          <TotalContainer>
            <Content>Discount:</Content>
            <Price>-${order.discount ? order.discount : 0}</Price>
          </TotalContainer>
          <TotalContainer>
            <Content>Shipping fee:</Content>
            <Price>${+order.shipping_amount}</Price>
          </TotalContainer>
          <TotalContainer>
            <Content>Taxes:</Content>
            <Price>${+order.tax_amount}</Price>
          </TotalContainer>
          <TotalContainer>
            <Content>Tip:</Content>
            <Price>${0}</Price>
          </TotalContainer>
          <Divider />
          <TotalContainer>
            <Content>
              <span style={{ color: 'black' }}>Total:</span>
            </Content>
            <Price>
              <span style={{ color: 'black' }}>${+order.pay_amount}</span>
            </Price>
          </TotalContainer>
        </OrdersContainer>
    </>
  );
};

const TotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 7px 0;
`;
const Content = styled.div`
  color: 'grey';
  font-size: 14px;
`;
const Price = styled.div`
  font-size: 14px;
`;
const OrdersContainer = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  /* padding: 25px; */
`;
const H4 = styled.h4`
  margin: 0 0 10px 0;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 15px 0;
  border-top: solid 1px #dbdbdb;
`;
const Qty = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;
const ItemText = styled.p`
  margin: 0;
  font-size: 16px;
`;
const ItemName = styled.p`
  margin: 0;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin: 10px 0 10px 0;
`;
export default OrderReceipt;