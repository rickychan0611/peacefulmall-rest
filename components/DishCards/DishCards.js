import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentItem as currentItemAtom,
} from '../../data/atoms.js';
import { Button, Label } from 'semantic-ui-react';

import PlaceHolder_Card from '../PlaceHolder_Card/';

const DishCards = ({ products }) => {
  const router = useRouter();
  const [, setCurrentItem] = useRecoilState(currentItemAtom);
  const [, setCurrentShop] = useRecoilState(currentShopAtom);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('home');

  return (
    <>
      {loading || !products ? (
        <PlaceHolder_Card size={302} />
      ) : (
        <>
          {products &&
            products[0] &&
            products.map((item, i) => {
              return (
                <Card
                  key={i}
                  onClick={() => {
                    // when click, save item in selectedItem Atom and selectedStore Atom.
                    // then open item's page by using item's id
                    setCurrentItem({ ...item, fromHomePage: true });
                    setCurrentShop(item.shop);
                    router.push('/item/' + item.id);
                  }}>
                  <Column>
                    <div>
                      {item.promotion_price && <Label
                        as="a"
                        color="red"
                        ribbon
                        style={{ position: 'absolute', left: -13, margin: 0 }}>
                        {/* {item.promotion_price / item.price * 100}% OFF */}
                        {(100 - (item.promotion_price / item.price) * 100).toFixed(0)}% OFF
                      </Label>}

                      {item.images && item.images[0] ? (
                        <Img src={process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(item.images)[0]} />
                      ) : (
                        <Img src="/no-image.png" />
                      )}

                      <Name className="clamp2">{item.name}</Name>
                      <Description className="clamp2">{item.description}</Description>
                      {!item.promotion_price ? (
                        <Price>
                          <span style={{ marginRigth: 5, color: 'black' }}>${item.price}</span>
                        </Price>
                      ) : (
                        <Price>
                          <span
                            style={{ textDecoration: 'line-through', marginRigth: 5, color: 'black' }}>
                            ${item.price}
                          </span>{' '}
                          ${item.promotion_price}
                        </Price>
                      )}
                      <Description>by: {item.shop.name}</Description>
                    </div>
                    <Button basic size="tiny" style={{ marginTop: 5, padding: 10, color: 'red' }}>
                      {t('OrderNow')}
                    </Button>
                  </Column>
                </Card>
              );
            })
          }
        </>
      )}
    </>
  );
};


const Card = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 10px;
  width: 100%;
  min-width: 200px;
  cursor: pointer;
`;
const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;  
  height: 100%;
`;
const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;
const Name = styled.div`
  padding: 7px 0px;
  font-size: 1.2rem;
  font-weight: bold;
`;
const Description = styled.div`
  font-size: 1rem;
`;
const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: red;
  margin-top: 5px;
`;

export default DishCards;
