import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, List, Header, Modal } from 'semantic-ui-react';

import { HOST_URL } from '../../env';

const ShopInfo = ({ shop }) => {
  const [open, setOpen] = useState(false);

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

      <List style={{ padding: 10 }}>
        <List.Item onClick={() => setOpen(true)}>
          <List.Icon name="map marker alternate" style={{ margiTop: 30 }} />
          <List.Content>
            <List.Header as="a">
              {shop.address_line}, {shop.address_city}, {shop.address_province}
            </List.Header>
            <List.Description>Click to View Map</List.Description>
          </List.Content>
        </List.Item>
        <br />
        <List.Item>
          <List.Icon name="clock" />
          <List.Content>
            <List.Header as="a">Hours</List.Header>
            <List.Description>
              <table style={{ marginLeft: -4 }}>
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>11a.m.–9:.m.</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                  <tr>
                    <td>Saturday</td>
                    <td>11a.m.–9:30p.m.</td>
                  </tr>
                  <tr>
                    <td>Sunday</td>
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
            <List.Header as="a">Phone</List.Header>
            <List.Description>(604) 879-9878</List.Description>
          </List.Content>
        </List.Item>
        <br />
        <List.Item>
          <List.Icon name="food" />
          <List.Content>
            <List.Header as="a">Cuisines</List.Header>
            <List.Description>{shop.cuisine_type}</List.Description>
          </List.Content>
        </List.Item>
        <br />
        <List.Item>
          <List.Icon name="globe" />
          <List.Content>
            <List.Header as="a">Website</List.Header>
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


export default ShopInfo;