import { atom, useRecoilState } from 'recoil';

export const user = atom({
  key: 'user',
  default: null
});

export const userdata = {
  firstName: "Ricky",
  lastName: "Chan",
  email: "ric0611@gmail.com",
  phone: "6047651390",
  addresses: [
    {
      id: "1",
      address1: "1234 apple street",
      address2: "",
      city: "Vancouver",
      postalCode: "V7A 4M9",
      province: "BC",
      Country: "Canada",
      default: true
    },
    {
      id: "2",
      address1: "950 W Broadway #201",
      address2: "",
      city: "Vancouver",
      postalCode: "V5Z 1K7",
      province: "BC",
      Country: "Canada",
      default: false
    }
  ],
  orders: [
    { orderId: "1234" },
    { orderId: "12989" },
    { orderId: "1676" }
  ]
}