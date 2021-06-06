import { useState } from 'react';
import { useRouter } from 'next/router';
import { useIsMobile } from '../../util/useScreenSize';
import { HOST_URL } from '../../env';
import toSlug from '../../util/toSlug';
import axios from 'axios';
import Loader from '../Loader';

import { useRecoilState } from 'recoil';
import {
  currentItem as currentItemAtom,
  currentShop as currentShopAtom
} from '../../data/atoms.js';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';

import BottomAddBar from '../BottomAddBar';
import BackButton from '../BackButton';
import ItemDetailsContext from '../ItemDetailsContext';
import _ from 'lodash';
import { useEffect } from 'react';
import {uid} from 'react-uid';

const ItemDetails = ({ setOpen, fromRestaurantPage }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom);
  const [item, setCurrentItem] = useRecoilState(currentItemAtom);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [loading, setLoading] = useState(true);
  const [attributes, setAttributes] = useState([]);
  const [attributeTotal, setAttributeTotal] = useState(0);

  const [quantity, setQty] = useState(1);

  //function: addItem is called in <BottomAddBar>,
  //update orderItems and localstorage, and then redirect to store's page
  const addItem = () => {
    let updatedItems;
    console.log('currentShop', currentShop);
    console.log('orderItems', orderItems);
    console.log('item.attributes!!!', item.attributes);
    console.log('attributes!!!', attributes);
    setOrderItems((prev) => {
      //if a prev store's name is equal to the current store, update the object
      let att = [];
      // nestedProperty.set(item.attributes, "0.options.0")
      console.log(item.attributes)

      if (prev[0] && prev[0].shop.id === currentShop.id) {
        updatedItems = [
          { ...item, attributeTotal, quantity, shop: currentShop, uid: uid(item) },
          ...prev
        ];
      }
      //if not, replace the whole orderItem object. Add store to currentShop
      else {
        updatedItems = [
          { ...item, attributeTotal, quantity, shop: currentShop, uid: uid(item) }
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
        setCurrentItem(getProduct.data.data);
        setCurrentShop(getProduct.data.data.shop);
        setLoading(false);
        console.log('NO product', getProduct.data.data);
        console.log('NO currentShop', getProduct.data.data.shop);
      } catch (err) {
        console.log(err);
        setLoading(false);
        // router.push('/404');
      }
    } else if (item && item.id !== +product_id) {
      setLoading(false);
    }
  }, [router.query.item_id]);

  useEffect(() => {
    let total = 0;
    item && item.attributes && item.attributes.forEach(att => {
      att.options[0] && att.options.forEach(opt => {
        console.log(opt.option_price)
        total = total + (opt.option_price * (opt.quantity ? opt.quantity : 0))
      })
    })
    console.log("setAttributeTotal", total)

    setAttributeTotal(total)
  }, [item]);

  return (
    <>
      {!item ? (
        <Loader loading={loading} />
      ) : (
        <>
          <BackButton />
          <ItemDetailsContext attributes={attributes} setAttributes={setAttributes} />
          <BottomAddBar
            attributeTotal={attributeTotal}
            attributes={attributes}
            quantity={quantity}
            setQty={setQty}
            price={item.promotion_price === null ? item.price : item.promotion_price}
            addItem={addItem}
          />
        </>
      )}
    </>
  );
};

export default ItemDetails;
