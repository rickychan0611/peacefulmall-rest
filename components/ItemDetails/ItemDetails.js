import { useState } from 'react';
import { useRouter } from 'next/router';
import { useIsMobile } from '../../util/useScreenSize';
import styled from 'styled-components';
import { HOST_URL } from '../../env';
import toSlug from '../../util/toSlug';
import axios from 'axios';
import Loader from '../Loader';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentItem as currentItemAtom,
  currentShop as currentShopAtom
} from '../../data/atoms.js';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';

import { Form, Grid, Icon, Radio, Image } from 'semantic-ui-react';
import BottomAddBar from '../BottomAddBar';
import ItemDetailsContext from '../ItemDetailsContext';
import _ from 'lodash';
import { useEffect } from 'react';

const ItemDetails = ({ setOpen, fromRestaurantPage }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom);
  const [item, setCurrentItem] = useRecoilState(currentItemAtom);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [loading, setLoading] = useState(true);
  const [attributes, setAttributes] = useState([]);
  const [attributeTotal, setAttributeTotal] = useState(0);

  const [value, setValue] = useState({ option: 'option0', value: 0 });
  const [quantity, setQty] = useState(1);

  const price = 10;

  //function: addItem is called in <BottomAddBar>,
  //update orderItems and localstorage, and then redirect to store's page
  const addItem = (total) => {
    let updatedItems;
    console.log('currentShop', currentShop);
    console.log('orderItems', orderItems);
    console.log('attributes!!!', attributes);
    setOrderItems((prev) => {
      //if a prev store's name is equal to the current store, update the object
      if (prev[0] && prev[0].shop.id === currentShop.id) {
        updatedItems = [
          { ...item, attributes, attributeTotal, quantity, total, shop: currentShop },
          ...prev
        ];
      }
      //if not, replace the whole orderItem object. Add store to currentShop
      else {
        updatedItems = [
          { ...item, attributes, attributeTotal, quantity, total, shop: currentShop }
        ];
      }
      localStorage.setItem('orderItems', JSON.stringify(updatedItems));
      return updatedItems;
    });

    router.push('/shop/' + toSlug(currentShop.name) + '/' + currentShop.id + '#fullMenu');
  };

  //If currentItem is empty, get the product by url id from server
  //then, setCurrentItem and setCurrentShop
  useEffect(async () => {
    const product_id = router.query.item_id;
    setLoading(true);

    if (!item && product_id) {
      try {
        const getProduct = await axios.get(HOST_URL + '/api/singleproduct', {
          params: {
            product_id
          }
        });
        setCurrentItem(getProduct.data);
        setCurrentShop(getProduct.data.shop);
        setLoading(false);
        console.log('NO product', getProduct.data);
        console.log('NO currentShop', getProduct.data.shop);
      } catch (err) {
        console.log(err);
        setLoading(false);
        router.push('/404');
      }
    } else if (item && item.id !== +product_id) {
      setLoading(false);
    }
  }, [router.query.item_id]);

  useEffect( () => {
    console.log('attributes', attributes);
    let total = 0;
    attributes &&
      attributes[0] &&
      attributes.forEach((att) => {
        console.log("ATTTT", att)
        att.options.forEach((opt) => {
          total = total + opt.option_price * (opt.quantity ? opt.quantity : 1);
        });
      });
    console.log('total', total);
    setAttributeTotal(total);
  }, [attributes]);

  return (
    <>
      {!item ? (
        <Loader loading={loading} />
      ) : (
        <>
          <BackButton
            onClick={() => {
              router.back();
            }}>
            <Icon name="arrow left" /> Back
          </BackButton>
          <ItemDetailsContext attributes={attributes} setAttributes={setAttributes} />
          <BottomAddBar
            attributeTotal={attributeTotal}
            attributes={attributes}
            quantity={quantity}
            setQty={setQty}
            option={value}
            price={item.promotion_price === null ? item.price : item.promotion_price}
            addItem={addItem}
          />
        </>
      )}
    </>
  );
};

const BackButton = styled.div`
  position: fixed;
  cursor: 'pointer';
  font-size: 18px;
  background-color: white;
  width: 100%;
  z-index: 10;
  padding: 10px;
  margin: 0 0 0 0;
  cursor: pointer;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Container = styled.div`
  padding: 20px;
  padding-top: 60px;
  padding-bottom: 150px;
  min-height: calc(100vh - 60px);
  width: 100%;
  max-width: 500px;
`;
const StoreHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
const Description = styled.h4`
  color: grey;
`;
const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export default ItemDetails;
