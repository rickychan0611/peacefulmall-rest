import ItemDetails from '../../components/ItemDetails';
import { HOST_URL } from '../../env';
import axios from 'axios';

const item = ({ getProduct }) => {
    return (
        <div>
            <ItemDetails getProduct={getProduct} />
        </div>
    );
};

// export const getServerSideProps = async (context) => {
//     context.res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=60');
//     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!context.params.item_id", context.params.item_id)
//     const product_id = context.params.item_id;

//     const getProduct = await axios.get(HOST_URL + '/api/singleproduct?product_id=' + product_id);
//       console.log("@@@@@@@@@@@@@@@@@@@@@@2", getProduct.data.data)
//     return {
//         props: {
//             getProduct: "112"
//         }
//     }
// }

export default item;