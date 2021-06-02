import { useEffect, useState } from 'react';
import axios from 'axios';
import { HOST_URL } from '../../env';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Divider, Button, Modal } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { openSideMenu as openSideMenuAtom } from '../../data/atoms.js';
import { CookiesProvider, useCookies } from 'react-cookie';
import Loader from '../../components/Loader';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import statusDecoder from '../../util/statusDecoder';
import OrderReceipt from '../../components/OrderReceipt';

const orders = () => {
  const { t } = useTranslation('orders');
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [orders, setOrders] = useState();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  useEffect(async () => {
    try {
      const getOrders = await axios.get(HOST_URL + '/api/user/orders', {
        headers: { Authorization: cookies.userToken }
      });
      getOrders.data !== 'no order found' && setOrders(getOrders.data);
      setLoading(false);
      console.log('getOrders.data', getOrders.data);
    } catch (err) {
      setOrders();
      console.log('error: ', err);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Container>
        {loading ? (
          <Loader loading={loading} />
        ) : (
          <>
            <Modal
              closeIcon
              size={'tiny'}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}>
              <Modal.Content>
                <OrderReceipt order={selectedOrder} />
              </Modal.Content>
            </Modal>
            <Wrapper>
              <h2>{t`YourOrders`}</h2>
              <h4>{orders ? t`PastOrders` : `No order found 😓`}</h4>
              {orders &&
                orders[0] &&
                orders.map((order, i) => {
                  return (
                    <Card key={i}>
                      <Row
                        onClick={() => {
                          setOpen(true);
                          setSelectedOrder(order);
                        }}>
                        <div
                          key={order.id}
                          style={{ width: '100%' }}
                          onClick={() => {
                            setOpen(true);
                            setSelectedOrder(order);
                          }}>
                          <Row>
                            <P>
                              {moment(order.created_at).format('MMM DD - hh:mm a')}
                              {' • '}
                              {t(statusDecoder(order.status))} <br />
                            </P>
                            <P>Total: $ {parseInt(order.pay_amount).toFixed(2)}</P>
                          </Row>
                          <Name>
                            {/* {order.order_items.length} items:{' '} */}
                            {order.order_items.map((item, i) => {
                              return (
                                <span key={i}>{(i === 0 ? '' : ', ') + item.product_name}</span>
                              );
                            })}
                          </Name>
                          <P>From: {order.shop.name}</P>
                        </div>
                        {/* <div style={{ marginLeft: 10 }}>
                          <Button
                            size="small"
                            onClick={() => {
                              setOpen(true);
                              setSelectedOrder(order);
                            }}>{t`ViewReceipt`}</Button>
                        </div> */}
                      </Row>
                    </Card>
                  );
                })}
            </Wrapper>
          </>
        )}
      </Container>
    </>
  );
};

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 10px #acaaaa;
  border: 1px solid #cccaca;
  margin-bottom: 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 40px; */
  width: 100%;
  /* height: calc(100vh - 60px); */
  padding: 15px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
`;
const Name = styled.div`
  margin: 5px 0 5px 0;
  font-size: 16px;
  font-weight: 600;
  font-family: "'Noto Serif SC', serif";
`;
const P = styled.p`
  font-size: 12px;
  margin: 0;
`;

export default orders;
