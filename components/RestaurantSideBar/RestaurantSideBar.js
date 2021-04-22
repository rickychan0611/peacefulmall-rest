import { useState } from 'react';
import styled from 'styled-components';
import { Grid, List, Header, Modal } from 'semantic-ui-react';
import ReviewFeed from '../../components/ReviewFeed.js/ReviewFeed.js';

const RestaurantSideBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal open={open} closeIcon onClose={() => setOpen(false)}>
        <Modal.Header>Peaceful Restaurant - 532 W Broadway #110, Vancouver, BC V5Z 1E9 </Modal.Header>
        <Modal.Content scrolling style={{ maxHeight: '80vh', padding: 0 }}>
          <iframe
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowfullscreen
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBHJSZlrLMWPcINP1GWunczBAt5bs-ZpzY&q=
            Peaceful Restaurant 532 W Broadway`}>   
          </iframe>
        </Modal.Content>
      </Modal>

      <Grid.Column width={5} style={{ height: 'calc(100vh - 120px)', overflowY: 'scroll' }}>
        <Img
          src={`http://vieamaggi.com/wp-content/uploads/2018/02/5564B6D3-9EB0-4705-ADE1-9098E1F5F248.jpeg`}
        />
        <List style={{ padding: 10 }}>
          <List.Item onClick={() => setOpen(true)}>
            <List.Icon name="map marker alternate" style={{ margiTop: 30 }} />
            <List.Content>
              <List.Header as="a">532 W Broadway #110, Vancouver, BC V5Z 1E9</List.Header>
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
              <List.Description>Chinese, Asian</List.Description>
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
      </Grid.Column>
    </>
  );
};

const Img = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export default RestaurantSideBar;
