import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { HOST_URL } from '../../env';
import styled from 'styled-components';
import { Divider, Button } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { openSideMenu as openSideMenuAtom } from '../../data/atoms.js';
import { CookiesProvider, useCookies } from 'react-cookie';
import Loader from '../../components/Loader';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';

const orderSuccess = () => {
  const { t } = useTranslation('orders');
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [orders, setOrders] = useState();
  
  useEffect(async () => {
    try {
      const getOrders = await axios.get(HOST_URL + '/api/user/orders', {
        headers: { Authorization: cookies.userToken }
      });
      console.log(getOrders.data.data);
      setOrders(getOrders.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <Img src="/cook-girl.jpg" />
      <h1 style={{ color: '#4ab976', textAlign: "center" }}>
        Order Successful <br />
      </h1>
      <CheckButton onClick={()=>{router.push('/consumer/orders')}}><a>Check your order</a></CheckButton>
    </Container>
  );
};

const CheckButton = styled.h4`
  display: flex;
  justify-items: center;
  text-align: center;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 8px 20px;
  cursor: pointer;
  border: 1px solid #8ca9c5;
  border-radius: 25px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: calc(100vh - 60px); */
  flex-direction: column;
  flex-wrap: nowrap;
`;
const Img = styled.img`
  height: 400px;
  width: 100%;
  object-fit: contain;
`;

export default orderSuccess;
