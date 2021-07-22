import ItemDetails from '../../components/ItemDetails';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentItem as currentItemAtom } from '../../data/atoms';
import { currentShop as currentShopAtom } from '../../data/atoms';
import router from 'next/router';

const item = () => {
  const [currentItem, setCurrentItem] = useRecoilState(currentItemAtom);
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);

  useEffect(async () => {
    console.log("!!!!!item_id currentShop", currentItem)
    if (!currentShop || !currentItem) {
      const getProduct = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/singleproduct?product_id=' + router.query.item_id);
      console.log("currentItemSSSSSSSSSSSSS", getProduct.data.data)
      setCurrentItem(getProduct.data.data)
      setCurrentShop(getProduct.data.data.shop)
    }
  }, [])

  return (
    <>{currentItem &&  
      <div>
        <Head>
          <title>{currentItem.name} - {currentShop && currentShop.name} - Peaceful Mall Restaurants</title>
        </Head>
        <ItemDetails />
      </div>
    }</>
  );
};

// export const getServerSideProps = async (context) => {
//   context.res.setHeader('Cache-Control', 's-maxage=3600'); // last 1 hr
//   const product_id = context.params.item_id;

//   const getProduct = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/singleproduct?product_id=' + product_id);
//   return {
//     props: {
//       getProduct: getProduct.data.data
//     }
//   };
// };

export default item;
