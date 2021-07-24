import { atom, selector } from 'recoil';

export const appReady = atom({
  key: 'appReady',
  default: false
});

export const selections = atom({
  key: 'selections',
  default: { cuisine: "all", category: "", restaurant: "" }
});

export const selectedLocation = atom({
  key: 'selectedLocation',
  default: null
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

export const currentOrder = atom({
  key: 'currentOrder',
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

export const discountedProducts = selector({
  key: 'discountedProducts',
  get: ({ get }) => {
    let discount = get(currentShopProducts)
    if (discount) {
      discount = discount.filter(item => !!item.promotion_price)
    }
    return discount
  }
})

export const currentShopPoplularProducts = atom({
  key: 'currentShopPoplularProducts',
  default: null
});

export const popularProducts = selector({
  key: 'popularProducts',
  get: ({ get }) => {
    let popularProducts = get(currentShopPoplularProducts)
    let shopProducts = get(currentShopProducts)
    let newArr = []
    if (!popularProducts && shopProducts) return shopProducts.slice(0, 5)
    else if (shopProducts && popularProducts && popularProducts.length < 5) {
      newArr = [...popularProducts, ...shopProducts.slice(0, 5)]
      return newArr
    }
    return popularProducts
  }
})

export const currentCat = atom({
  key: 'currentCat',
  default: null
});

export const sliderCats = atom({
  key: 'sliderCats',
  default: []
});

export const searchValue = atom({
  key: 'searchValue',
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

export const currentPosition = atom({
  key: 'currentPosition',
  default: null
});

export const addresses = atom({
  key: 'addresses',
  default: null
});

export const useDefaultAddress = atom({
  key: 'useDefaultAddress',
  default: false
});

export const loginPending = atom({
  key: 'loginPending',
  default: false
});

export const mapLoaction = atom({
  key: 'mapLoaction',
  default: null
});

export const searchResults = atom({
  key: 'searchResults',
  default: null
});

export const scrollTop = atom({
  key: 'scrollTop',
  default: 0
});

export const articles = atom({
  key: 'articles',
  default: null
});

export const selectedArticle = atom({
  key: 'selectedArticle',
  default: null
});

export const selectedPage = atom({
  key: 'selectedPage',
  default: null
});

export const defaultAddress = selector({
  key: 'defaultAddress',
  get: ({ get }) => {
    return get(addresses) && get(addresses).find(item => item.default_status === 1)
  }
})



