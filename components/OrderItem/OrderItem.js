import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';


const OrderItem = ({ item, index }) => {
  const [, setOrderItems] = useRecoilState(orderItemsAtom);
  
  const remove = (index) => {
    setOrderItems(prev => {
      let removeItems = prev.filter((_, i) => i !== index)
      localStorage.setItem('orderItems', JSON.stringify(removeItems))
      return removeItems
    })
  }
  
  return (
  <ItemContainer>
    <Qty>
      <ItemText style={{ minWidth: "30px" }}>{item.qty} x</ItemText>
      <div>
        <ItemName>{item.name}</ItemName>
        {item.option.value !== 0 && <p>• {item.option.option + " " + "+$" + item.option.value}</p>}
        <Remove onClick={() => remove(index)}>Remove</Remove>
      </div>
    </Qty>
    <ItemText>${item.total.toFixed(2)}</ItemText>
  </ItemContainer>
)}

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
const Remove = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: bold;
  color: red;
  cursor: pointer;
`;

export default OrderItem;
