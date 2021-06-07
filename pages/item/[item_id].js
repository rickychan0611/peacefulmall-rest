import ItemDetails from '../../components/ItemDetails';
import { HOST_URL } from '../../env';
import axios from 'axios';
import Head from 'next/head';

const item = ({ getProduct }) => {
  return (
    <div>
       <Head>
        <title>{getProduct.name} - {getProduct.shop.name} - Peaceful Mall Restaurants</title>
      </Head>
      <ItemDetails getProduct={getProduct} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  context.res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=60'); // last 15mins
  const product_id = context.params.item_id;

  const getProduct = await axios.get(HOST_URL + '/api/singleproduct?product_id=' + product_id);
  return {
    props: {
      getProduct: getProduct.data.data
    }
  };
};

export default item;
