import { atom, selector } from 'recoil';
import { selectedStore } from './storeAtoms';
import { user as userAtom } from './userAtom';

export const orderItems = atom({
  key: 'orderItems',
  default: [],
  dangerouslyAllowMutability: true
});

export const shippingMethod = atom({
  key: 'shippingMethod',
  default: 'Delivery'
});

export const orderDetails = selector({
  key: 'orderDetails',
  get: ({ get }) => {
    const items = get(orderItems);
    const user = get(userAtom);
    let subtotal = 0;
    items &&
      items[0] &&
      items.forEach((item, index) => {
        subtotal = subtotal + item.total;
      });
    let taxTotal = 0;
    items &&
      items[0] &&
      items.forEach((item, index) => {
        taxTotal = taxTotal + (item.total * item.tax.tax_rate / 100).toFixed(2);
      });

    return {
      orderItems: items,
      subtotal,
      taxTotal,
      shippingFee: 0,
      discount: 0,
      shop: items[0] && items[0].shop,
      deliveryAddress: user ? user.deliveryAddress : '',
      shippingMethod: get(shippingMethod),
      total: subtotal + +taxTotal
    };
  }
});
