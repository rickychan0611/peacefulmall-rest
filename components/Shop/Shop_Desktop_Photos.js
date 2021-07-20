import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import {
  currentShop as currentShopAtom,
  currentShopProducts as currentShopProductsAtom
} from '../../data/atoms';

import { Grid, Icon } from 'semantic-ui-react';
import Slider from '../Slider';
import PopularDishes from '../PopularDishes';
import ShopSideBar from '../ShopSideBar';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import Gallery from "react-photo-gallery";

const Shop_Desktop_Photos = () => {
  const router = useRouter();
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const [result, setResult] = useState();
  const url = '/shop/' + currentShop.name + '/' + currentShop.id
  const [photos, setPhotos] = useState([]);

  const query = async (topic, api, params) => {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/' + api, { params });
    setResult(prev => ({ ...prev, [topic]: res.data.data }))
    console.log("PHOTO PAGE", res)
  }

  useEffect(async () => {
    try {
      query("products", "shopproducts", { shop_id: router.query.shop_id, category_id: "all" });
    }
    catch (err) {
      console.log("query err:", err)
    }
  }, [])

  useEffect(() => {
    if (result) {
      console.log("!!!!!!!!!!!!!", result)
      let arr = result.products.map(item => {
        return (
          {
            src: process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + JSON.parse(item.images)[0],
            width: 3,
            height: 2
          }
        )
      })
      setPhotos(arr)
      console.log("ARRRRRR", arr)
    }
  }, [result])

  return (
    <div>
      <Grid>
        <Grid.Column width={4} style={{ paddingBottom: 100 }}>
          <ShopSideBar shop={currentShop} />
        </Grid.Column>

        <Grid.Column width={12} style={{ padding: '30px 20px 80px 20px' }}>
          <div>
            <Wrapper>
              {currentShop.logo ? (
                <Avatar src={process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + currentShop.logo} />
              ) : (
                <Avatar src="/avatar-placeholder.png" />
              )}
              <div style={{ width: 'calc(100% - 50px)' }}>
                <Title>{currentShop.name}</Title>
                <Description style={{ marginBottom: 60 }}>{currentShop.description}</Description>
              </div>
            </Wrapper>

            <Wrapper>
              <Title>
                <Icon name="photo" size="small" style={{ marginRight: 10 }} />
                Photo Gallery
              </Title>
            </Wrapper>
            {photos.length > 0 && 
            <Gallery photos={photos} direction={"row"} targetRowHeight={130}/>}

          </div>
        </Grid.Column>
      </Grid>
    </div >
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 30px;
`;
const Avatar = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: solid 2px white;
  height: 60px;
  width: 60px;
  object-fit: contain;
  box-shadow: 0px 0px 5px#a5a5a5;
  margin-right: 20px;
`;
const Title = styled.h2`
  color: "black";
  margin: 0 10px 0 0;
  display: flex;
  align-items: center;
  
`;

const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default Shop_Desktop_Photos;
