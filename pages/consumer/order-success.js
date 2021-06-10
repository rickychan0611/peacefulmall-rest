import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';
import useTranslation from 'next-translate/useTranslation';

const orderSuccess = () => {
  const { t } = useTranslation('orders');
  const router = useRouter();
  const [, setOrderItems] = useRecoilState(orderItemsAtom);

  useEffect(async () => {
    localStorage.removeItem('orderItems');
    setOrderItems([]);
  }, []);

  return (
    <Container>
      <Img src="/cook-girl.jpg" />
      <h1 style={{ color: '#4ab976', textAlign: 'center' }}>
        Order Successful <br />
      </h1>
      <CheckButton
        onClick={() => {
          router.push('/consumer/orders');
        }}>
        <a>Check your order</a>
      </CheckButton>
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
