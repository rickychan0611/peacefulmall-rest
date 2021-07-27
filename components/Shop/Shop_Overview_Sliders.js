import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import {
  currentShop as currentShopAtom,
  articles as articlesAtom,
  discountedProducts as discountedProductsAtom,
  popularProducts as popularProductsAtom,
} from '../../data/atoms';
import Slider from '../Slider';
import DishCards from '../DishCards';
import ReviewCards from '../ReviewCards';
import EditorCards from '../EditorCards';
import useTranslation from 'next-translate/useTranslation';

const Shop_Overview_Slider = () => {
  const { t } = useTranslation('home');
  const router = useRouter();
  const currentShop = useRecoilValue(currentShopAtom);
  const articles = useRecoilValue(articlesAtom);
  const discountedProducts = useRecoilValue(discountedProductsAtom)
  const popularProducts = useRecoilValue(popularProductsAtom);
  const url = '/shop/' + currentShop?.name + '/' + currentShop?.id

  return (
    <div>
      <Wrapper>
        <Title>
          <Icon name="food" size="small" style={{ marginRight: 10 }} />
          Popular Items
        </Title>
        <Button style={{ color: "white", backgroundColor: "#ee3160" }} onClick={() => router.push(url + '/menu')}> View Full Menu </Button>
      </Wrapper>
      <Slider>
        <DishCards products={popularProducts} />
      </Slider>

      {discountedProducts?.length > 0 && <>
        <Wrapper>
          <Title>
            <Icon name="food" size="small" style={{ marginRight: 10 }} />
            Promotions
          </Title>
          <Button style={{ color: "white", backgroundColor: "#ee3160" }} onClick={() => router.push(url + '/menu')}> View Full Menu </Button>
        </Wrapper>
        <Slider>
          <DishCards products={discountedProducts} />
        </Slider>
      </>}

      <Wrapper>
        <Title>
          <Icon name="star" size="small" style={{ marginRight: 10 }} />
          User Reviews
        </Title>
        {/* <Button onClick={() => router.push(url + '/reviews')}>View All Reviews</Button> */}
      </Wrapper>
      <Slider >
        {currentShop && currentShop.reviews && currentShop.reviews.length !== 0 ?
          <ReviewCards reviews={currentShop.reviews} /> : <h4>... No review yet 😋 </h4>}
      </Slider>

      <Wrapper>
        <Title>
          <Icon name="newspaper outline" size="small" style={{ marginRight: 10 }} />
          Featured Articles
        </Title>
        {/* <Button onClick={() => router.push(url + '/articles')}>View All Articles</Button> */}
      </Wrapper>
      <Slider >
        {articles && articles.length !== 0 ?
          <EditorCards /> : <h4>... No article yet 😋 </h4>}
      </Slider>

      <Wrapper>
        <Title>
          <Icon name="bars" size="small" style={{ marginRight: 10 }} />
          Order now!
        </Title>
        {/* <Button onClick={() => router.push(url + '/articles')}>View All Articles</Button> */}
      </Wrapper>
      <Button
        style={{ color: "white", backgroundColor: "#ee3160", marginBottom: 40 }}
        onClick={() => router.push(url + '/menu')}>
        View Full Menu
      </Button>


    </div >
  );
};

const Button = styled.div({
  margin: 5,
  padding: "6px 15px",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: 25,
  fontSize: 12,
  fontWeight: "bold",
  color: "black",
  border: "1px solid grey"
});
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Title = styled.h2`
color: "black";
margin: 0 20px 0 0;
display: flex;
align-items: center;
`;
export default Shop_Overview_Slider;
