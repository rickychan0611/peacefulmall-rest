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
    console.log("Atom OrderItems", items)
    let subtotal = 0;
    items &&
      items[0] &&
      items.forEach((item, index) => {
        subtotal = subtotal + ((item.promotion_price ? +item.promotion_price : +item.price) * item.quantity);
      });
    let taxTotal = 0;
    items &&
      items[0] &&
      items.forEach((item, index) => {
        taxTotal = taxTotal + (item.total * ((item.tax ? +item.tax.tax_rate : 12) / 100))
      });

    return {
      orderItems: items,
      subtotal,
      taxTotal : +(Math.round(taxTotal + "e+2")  + "e-2"),
      shippingFee: 0,
      discount: 0,
      shop: items[0] && items[0].shop,
      deliveryAddress: user ? user.deliveryAddress : '',
      shippingMethod: get(shippingMethod),
      total:  +(Math.round((+subtotal + +taxTotal) + "e+2")  + "e-2")
    };
  }
});
