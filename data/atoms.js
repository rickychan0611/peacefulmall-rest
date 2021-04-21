import { atom } from 'recoil';

export const selections = atom({
  key: 'selections',
  default: {cuisine: "all", category: "", restaurant: ""}
});

export const openSideMenu = atom({
  key: 'openSideMenu',
  default: false
});

export const selectedItem = atom({
  key: 'selectedItem',
  default: {}
});
