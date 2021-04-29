import { atom } from 'recoil';

export const orderItems = atom({
  key: 'orderItems',
  default: [],
  dangerouslyAllowMutability: true,
});