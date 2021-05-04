import { atom } from 'recoil';

export const appReady = atom({
  key: 'appReady',
  default: false
});

export const selections = atom({
  key: 'selections',
  default: {cuisine: "all", category: "", restaurant: ""}
});

export const openSideMenu = atom({
  key: 'openSideMenu',
  default: false
});

export const openOrderSlide = atom({
  key: 'openOrderSlide',
  default: false
});

export const openCheckOutList = atom({
  key: 'openCheckOutList',
  default: false
});

export const selectedItem = atom({
  key: 'selectedItem',
  default: {}
});

export const scrolling = atom({
  key: 'scrolling',
  default: 1
});

export const showCheckoutButton = atom({
  key: 'showCheckoutButton',
  default: true
});