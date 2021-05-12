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

export const currentItem = atom({
  key: 'currentItem',
  default: null
});

export const currentShop = atom({
  key: 'currentShop',
  default: null
});

export const currentShopProducts = atom({
  key: 'currentShopProducts',
  default: null
});

export const currentCat = atom({
  key: 'currentCat',
  default: null
});

export const sliderCats = atom({
  key: 'sliderCats',
  default: null
});


export const scrolling = atom({
  key: 'scrolling',
  default: 1
});

export const showCheckoutButton = atom({
  key: 'showCheckoutButton',
  default: true
});

export const slidersStates = atom({
  key: 'slidersStates',
  default: null
});

export const sliderPosition = atom({
  key: 'sliderPosition',
  default: {}
});
export const catChange = atom({
  key: 'catChange',
  default: false
});