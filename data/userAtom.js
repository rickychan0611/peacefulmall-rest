import { atom, useRecoilState } from 'recoil';

export const user = atom({
  key: 'user',
  default: null
});