import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';
import { Divider, Icon, Modal } from 'semantic-ui-react';
import ItemDetailsContext from '../ItemDetailsContext/ItemDetailsContext.js';
import {
  currentItem as currentItemAtom,
  currentShop as currentShopAtom,
  openCheckOutList as openCheckOutListAtom
} from '../../data/atoms.js';
import BottomAddBar from '../BottomAddBar';

// OrderItem is each list item of CheckoutList slide bar
// A modal will be opened when clicked

const OrderItem = ({ item, index }) => {
  const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom);
  const [, setCurrentItem] = useRecoilState(currentItemAtom);
  const [, setCurrentShop] = useRecoilState(currentShopAtom);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({ option: 'option0', value: 0 });
  const [quantity, setQty] = useState();
  const [total, setTotal] = useState();
  const [openCheckOutList, setOpenCheckOutList] = useRecoilState(openCheckOutListAtom);
  const router = useRouter();

  const remove = (index) => {
    setOrderItems((prev) => {
      let removeItems = prev.filter((_, i) => i !== index);
      localStorage.setItem('orderItems', JSON.stringify(removeItems));
      return removeItems;
    });
  };

  const updateItem = (value, key) => {
    console.log('quantity', quantity);
    console.log('item.price', item.price);

    key === 'minus' &&
      item.quantity > 1 &&
      setOrderItems((prev) => {
        let newQty = item.quantity - value;
        return prev.map((item, i) =>
          i === index ? { ...item, quantity: newQty, total: item.price * newQty } : item
        );
      });

    key === 'plus' &&
      setOrderItems((prev) => {
        let newQty = item.quantity + value;
        return prev.map((item, i) =>
          i === index ? { ...item, quantity: newQty, total: item.price * newQty } : item
        );
      });

    return true;
  };

  useEffect(() => {
    localStorage.setItem('orderItems', JSON.stringify(orderItems));
  }, [orderItems]);

  return (
    <>
      <Modal
        closeOnDimmerClick={false}
        closeIcon
        size="tiny"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <ItemDetailsContext checkOutListItem={item} />
        <BottomAddBar
          index={index}
          remove={remove}
          quantity={item.quantity}
          setQty={setQty}
          option={value}
          price={item.promotion_price === null ? item.price : item.promotion_price}
          updateItem={updateItem}
          setOpen={setOpen}
          setOpenCheckOutList={setOpenCheckOutList}
        />
      </Modal>

      <Divider />
      <Row
        onClick={() => {
          setOpen(true);
          console.log(item);
        }}>
        <Qty>
          <ItemText style={{ minWidth: '30px', marginRight: 5 }}>
            {item.quantity}
            <Icon name="times" size="small" color="grey" />
          </ItemText>
          <div>
            <ItemName>{item.name}</ItemName>
            {item.option && item.option.value !== 0 && (
              <p>• {item.option.option + ' ' + '+$' + item.option.value}</p>
            )}
          </div>
        </Qty>
        <ItemText>${+(Math.round(item.total + "e+2")  + "e-2")}</ItemText>
      </Row>

      {router.route !== '/checkout' && (
        <Row style={{ justifyContent: 'center' }}>
          <QtyContainer>
            <div>
              <Icon
                style={{ cursor: 'pointer', marginRight: 15 }}
                name="minus circle"
                onClick={() => {
                  updateItem(1, 'minus');
                }}
              />
              <Icon
                style={{ cursor: 'pointer' }}
                name="plus circle"
                onClick={() => {
                  updateItem(1, 'plus');
                }}
              />
            </div>
            <Remove onClick={() => remove(index)}>
              <Icon name="close" />
              Remove
            </Remove>
          </QtyContainer>
        </Row>
      )}
    </>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  /* padding: 5px 0; */
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
  margin: 0 0 0 25px;
  font-size: 12px;
  font-weight: bold;
  color: red;
  cursor: pointer;
`;
const QtyContainer = styled.div`
  margin: 10px 10px 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
`;
const QtyNum = styled.h5`
  display: inline-block;
  margin: 0 5px 0 0px;
`;

export default OrderItem;
