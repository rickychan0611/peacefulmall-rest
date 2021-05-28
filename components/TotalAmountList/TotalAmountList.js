import styled from 'styled-components';

const TotalAmountList = ({ orderDetails }) => {
  return (
    <>
      <TotalContainer>
        <Content>Subtotal:</Content>
        <Price>${+orderDetails.subtotal.toFixed(2)}</Price>
      </TotalContainer>
      <TotalContainer>
        <Content>Discount:</Content>
        <Price>-${(+orderDetails.discount).toFixed(2)}</Price>
      </TotalContainer>
      <TotalContainer>
        <Content>Shipping fee:</Content>
        <Price>${(+orderDetails.shippingFee).toFixed(2)}</Price>
      </TotalContainer>
      <TotalContainer>
        <Content>Taxes:</Content>
        <Price>${(+orderDetails.taxTotal).toFixed(2)}</Price>
      </TotalContainer>
      <TotalContainer>
        <Content>Tip:</Content>
        <Price>${(0).toFixed(2)}</Price>
      </TotalContainer>
      <TotalContainer>
        <Content>
          <span style={{ color: 'black' }}>Total:</span>
        </Content>
        <Price>
          <span style={{ color: 'black' }}>${(+orderDetails.total).toFixed(2)}</span>
        </Price>
      </TotalContainer>
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

export default TotalAmountList;
