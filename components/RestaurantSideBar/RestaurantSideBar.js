import { useState } from 'react';
import styled from 'styled-components';
import { Grid, List, Header, Modal } from 'semantic-ui-react';
import ReviewFeed from '../ReviewFeed/ReviewFeed.js';

const RestaurantSideBar = ({store}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal open={open} closeIcon onClose={() => setOpen(false)}>
        <Modal.Header>{store.name} - {store.address} </Modal.Header>
        <Modal.Content scrolling style={{ maxHeight: '80vh', padding: 0 }}>
          <iframe
            width="100%"
            height="450"
            style={{ border: 10 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBugBL6F0x-jyq_4l-6OS1i8Du6yv9bH-s&q=
            ${store.address}&iwloc=near`}>   
          </iframe>
        </Modal.Content>
      </Modal>

        <Img
          src={store.photo}
        />
        <List style={{ padding: 10 }}>

          <List.Item onClick={() => setOpen(true)}>
            <List.Icon name="map marker alternate" style={{ margiTop: 30 }} />
            <List.Content>
              <List.Header as="a">{store.address}</List.Header>
              <List.Description>View Map</List.Description>
            </List.Content>
          </List.Item>
          <br />
          <List.Item>
            <List.Icon name="clock" />
            <List.Content>
              <List.Header as="a">Hours</List.Header>
              <List.Description>
                <table>
                  <tbody>
                    <tr>
                      <td>Monday</td>
                      <td>11a.m.–9:30p.m.</td>
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
              <List.Description>{store.cuisine_type}</List.Description>
            </List.Content>
          </List.Item>
          <br />
          <List.Item>
            <List.Icon name="globe" />
            <List.Content>
              <List.Header as="a">Website</List.Header>
              <List.Description>http://www.peacefulrestaurant.com/</List.Description>
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
        <Header>Reviews</Header>
        <hr />
        <ReviewFeed />
        <hr />
        <Header>Featured Articles</Header>
        <hr />
        <Img
          src={`https://source.unsplash.com/featured/?dinning, steak${Math.floor(
            Math.random() * 10000
          )}`}
        />
        Top 10 Restaurant <br />
        <br />
        <Img
          src={`https://source.unsplash.com/featured/?dinning, steak${Math.floor(
            Math.random() * 10000
          )}`}
        />
        Vancouver attractions <br />
        <br />
    </>
  );
};

const Img = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export default RestaurantSideBar;
