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
                    console.log("!!!currentItem", item)
                    setCurrentItem({ ...item, fromHomePage: true });
                    // setCurrentShop(item.shop);
                    router.push('/item/' + item.id);
                  }}>
                  <div style={{ position: "relative" }}>
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
                    <Column>
                      <div>
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
                        {item.shop && item.shop.name && <Description>by: {item.shop.name}</Description>}
                      </div>
                      <div>
                        <Button basic size="tiny" style={{ width: "100%", marginTop: 5, padding: 10, color: 'red' }}>
                          {t('OrderNow')}
                        </Button>
                      </div>
                    </Column>
                  </div>
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
  width: 100%;
  min-width: 220px;
  max-width: 250px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
`;
const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;  
  /* height: 100%; */
  min-height: 180px;
  padding: 8px 10px 15px 10px;
`;
const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;
const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: red;
  margin-top: 5px;
`;

export default DishCards;
