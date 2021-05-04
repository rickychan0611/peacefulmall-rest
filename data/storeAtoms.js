import { atom, selector } from 'recoil';
import { restaurants as data } from './restaurants.js';
import { selections, appReady } from './atoms';

export const stores = atom({
  key: 'stores',
  default: data
});

export const selectedStore = selector({
  key: 'selectedStore',
  get: ({ get }) => {
    const getStore = get(stores);
    const getSelection = get(selections);
    let index = getStore.findIndex((item) => {
      return item.slug === getSelection.restaurant;
    });
    if (get(appReady) && getSelection.restaurant) {
      console.log(index)
      return index !== -1 ? getStore[index] : "not found"
    }
  }
});
