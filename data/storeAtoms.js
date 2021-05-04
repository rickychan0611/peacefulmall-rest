import { atom, selector } from 'recoil';
import { restaurants as data } from './restaurants.js'
import { selections } from './atoms';

export const stores = atom({
  key: 'stores',
  default: data
});

export const selectedStore = selector({
  key: 'selectedStore',
  get: ({get}) => {
    const getStore = get(stores)
    const getSelection = get(selections)
    let filtered = getStore.filter((item) => {
      console.log(item.slug)
      return item.slug === getSelection.restaurant
    })
    console.log(filtered[0])
      return filtered[0]
  }
})