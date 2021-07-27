import styled from 'styled-components';

const ItemDetails_Price = ({ item }) => {
  return (
    <>
      {item.promotion_price ?
        <>
          <CrossedPrice>${item.price}</CrossedPrice>
          <Saving>You Save: ${(item.price - item.promotion_price).toFixed(2)} ({(100 - (item.promotion_price / item.price) * 100).toFixed(0)}% OFF)</Saving>
          <Price>${item.promotion_price}</Price>
        </> :
        <Price>${item.price}</Price>
      }
    </>
  );
};

const Price = styled.div`
  font-size: 24px;
  margin-top: 30px;
`;
const CrossedPrice = styled.div`
  font-size: 16px;
  color: grey;
  text-decoration: line-through;
  margin-top: 30px;
`;
const Saving = styled.div`
  font-size: 16px;
  margin-top: 3px;
`;

export default ItemDetails_Price;
