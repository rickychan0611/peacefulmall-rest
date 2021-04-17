import { atom, selector } from 'recoil';

// export const data = atom({
//   key: 'data',
//   default: data
// });

export const selectedCuisine = atom({
  key: 'selectedCuisine',
  default: 'All'
});

// export const all_dishes = selector({
//   key: 'all_dishes',
//   get: ({get}) => {
//     let items = get(data)
//     return items.categorys.map((item) => item.menu-items)
//   }
// });
