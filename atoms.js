import {atom} from 'recoil';

export const repos = atom({
    key: "repos",
    default: [],
  })
  
  export const view = atom({
    key: "view",
    default: 1,
  })