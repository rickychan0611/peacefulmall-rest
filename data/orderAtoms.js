import { atom, selector } from 'recoil';
import { selectedStore } from './storeAtoms'
import { user as userAtom } from './userAtom'

export const orderItems = atom({
  key: 'orderItems',
  default: [],
  dangerouslyAllowMutability: true,
});

export const orderDetails = selector({
  key: 'orderDetails',
  get: ({get}) => {
    const items = get(orderItems)
    const user = get(userAtom)
    let subtotal = 0
    items && items[0] && items.forEach((item, index)=>{
      subtotal = subtotal + item.total
    })
    const taxes = Math.round(subtotal * 0.05 * 100) / 100

    return (
      { 
        orderItems: items,
        subtotal,
        taxes,
        shippingFee: 0,
        discount: 0,
        total: subtotal + taxes,
        store: items[0] && items[0].store,
        deliveryAddress: user.deliveryAddress
      }
    )
  }
  
})