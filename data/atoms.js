import { atom, selector } from 'recoil';

export const selections = atom({
  key: 'selections',
  default: {cuisine: "all", category: "", restaurant: ""}
});

// export const selectedCat = atom({
//   key: 'selectedCat',
//   default: ''
// });

// export const selectedCat = atom({
//   key: 'selectedCat',
//   default: ''
// });

// export const selectedCatData = atom({
//   key: 'selectedCatData',
//   default: ""
// });
