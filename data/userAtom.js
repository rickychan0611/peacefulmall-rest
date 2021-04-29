import { atom } from 'recoil';

export const user = atom({
  key: 'user',
  default: {
    firstName: "Ricky",
    lastName: "Chan",
    email: "ric0611@gmail.com",
    tel: "6047651390",
  }
});
