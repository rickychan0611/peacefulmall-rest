import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, List, Header, Modal } from 'semantic-ui-react';
import useTranslation from 'next-translate/useTranslation';
import {useIsDesktop} from '../../util/useScreenSize';

import { HOST_URL } from '../../env';

const ShopInfo = ({ shop }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('shop')
  const isDesktop = useIsDesktop();
  const profilePic = shop.images && HOST_URL + '/storage/' + JSON.parse(shop.images)[0]

  return (
    <>
      {shop && (
        <>
        <Modal open={open} closeIcon onClose={() => setOpen(false)}>
          <Modal.Header>
            {shop.name} - {shop.address_line}{' '}
          </Modal.Header>
          <Modal.Content scrolling style={{ maxHeight: '80vh', padding: 0 }}>
            <iframe
              width="100%"
              height="450"
              style={{ border: 10 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBugBL6F0x-jyq_4l-6OS1i8Du6yv9bH-s&q=${shop.latitude},${shop.longitude}`}></iframe>
          </Modal.Content>
        </Modal>
        {isDesktop && shop.images && <Img src={profilePic} />}
      <List style={{ padding: 10 }}>
        <List.Item onClick={() => setOpen(true)}>
          <List.Icon name="map marker alternate" style={{ margiTop: 30 }} />
          <List.Content>
            <List.Header as="a">
              {shop.address_line}, {shop.address_city}, {shop.address_province}
            </List.Header>
            <List.Description><a>{t`Click to View Map`}</a></List.Description>
          </List.Content>
        </List.Item>
        <br />
        <List.Item>
          <List.Icon name="clock" />
          <List.Content>
            <List.Header as="a">{t`Hours`}</List.Header>
            <List.Description>
              <table style={{ marginLeft: -4 }}>
                <tbody>
                  <tr>
                    <td>{t`Monday`}</td>
                    <td>11a.m.–9:.m.</td>
                  </tr>
                  <tr>
                    <td>{t`Tuesday`}</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                  <tr>
                    <td>{t`Wednesday`}</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                  <tr>
                    <td>{t`Thursday`}</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                  <tr>
                    <td>{t`Friday`}</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                  <tr>
                    <td>{t`Saturday`}</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                  <tr>
                    <td>{t`Sunday`}</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                </tbody>
              </table>
            </List.Description>
          </List.Content>
        </List.Item>
        <br />
        <List.Item>
          <List.Icon name="phone" />
          <List.Content>
            <List.Header as="a">{t`Phone`}</List.Header>
            <List.Description>(604) 879-9878</List.Description>
          </List.Content>
        </List.Item>
        <br />
        <List.Item>
          <List.Icon name="food" />
          <List.Content>
            <List.Header as="a">{t`CuisineStyle`}</List.Header>
            <List.Description>{shop.cuisine_type}</List.Description>
          </List.Content>
        </List.Item>
        <br />
        <List.Item>
          <List.Icon name="globe" />
          <List.Content>
            <List.Header as="a">{t`Website`}</List.Header>
            <List.Description>
              <a href={shop.website} target="_blank">
                {shop.website}
              </a>
            </List.Description>
          </List.Content>
        </List.Item>
        <br />
        <List.Item>
          <List.Icon name="checkmark" />
          <List.Content>
            <List.Description>⭐⭐⭐⭐⭐</List.Description>
          </List.Content>
        </List.Item>
      </List>
      </>)}
    </>
  );
};

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  height: 20vh;
`;

export default ShopInfo;
