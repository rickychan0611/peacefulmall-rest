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
      console.log(getOrders.data);
      setOrders(getOrders.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
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
              open={open}
            >
              <Modal.Content>
                <OrderReceipt order={selectedOrder} />
              </Modal.Content>
            </Modal>
            <Wrapper>
              <h2>{t`YourOrders`}</h2>
              <h4>{t`PastOrders`}</h4>
              {orders &&
                orders.map((order, i) => {
                  return (
                    <div key={i}>
                      <Divider />
                      <Row onClick={() => {
                        setOpen(true);
                        setSelectedOrder(order);
                      }}>
                        <div key={order.id}
                          style={{ width: "100%" }}
                          onClick={() => {
                            setOpen(true);
                            setSelectedOrder(order);
                          }}>
                          <P>
                            {moment(order.created_at).format('MMM DD - hh:mm a')} <br />
                            {t(statusDecoder(order.status))} • Total: $
                            {parseInt(order.pay_amount).toFixed(2)}
                          </P>
                          <Name>{order.shop.name}</Name>
                          <P>
                            {order.order_items.length} items:{' '}
                            {order.order_items.map((item, i) => {
                              return (
                                <span key={i} style={{ fontSize: 12 }}>{(i === 0 ? '' : ', ') + item.product_name}</span>
                              );
                            })}
                          </P>
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
                    </div>
                  );
                })}
            </Wrapper>
          </>
        )}
      </Container>
    </>
  );
};

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
const Name = styled.h4`
  margin: 0;
`;
const P = styled.p`
  margin: 0;
`;

export default orders;
