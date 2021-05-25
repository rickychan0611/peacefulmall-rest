import { atom, useRecoilState } from 'recoil';

export const userdata = {
  firstName: "Ricky",
  lastName: "Chan",
  email: "ric0611@gmail.com",
  phone: "6047651390",
  deliveryAddress: {
      id: "1",
      address1: "12034 apple street",
      address2: "",
      city: "Vancouver",
      postalCode: "V7A 4M9",
      province: "BC",
      country: "Canada",
      dropoff: "Leave it at my door",
      instructions: ""
  },
  addresses: [
    {
      id: "1",
      address1: "12034 apple street",
      address2: "",
      city: "Vancouver",
      postalCode: "V7A 4M9",
      province: "BC",
      country: "Canada",
    },
    {
      id: "2",
      address1: "950 W Broadway",
      address2: "202",
      city: "Vancouver",
      postalCode: "V5Z 1K7",
      province: "BC",
      country: "Canada",
    },
    {
      id: "3",
      address1: "999 Oak Street",
      address2: "#29",
      city: "Vancouver",
      postalCode: "A5Z 8K7",
      province: "BC",
      Country: "Canada",
    }
  ],
  orders: [
    { orderId: "1234" },
    { orderId: "12989" },
    { orderId: "1676" }
  ]
}

export const user = atom({
  key: 'user',
  default: null
});