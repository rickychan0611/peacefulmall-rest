import { atom, selector } from 'recoil';

export const orderItems = atom({
  key: 'orderItems',
  default: [],
  dangerouslyAllowMutability: true,
});

export const orderDetails = selector({
  key: 'orderDetails',
  get: ({get}) => {
    const items = get(orderItems)
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
        total: subtotal + taxes
      }
    )
  }
  
})