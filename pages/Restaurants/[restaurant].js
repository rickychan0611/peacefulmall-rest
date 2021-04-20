import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { selections as selectionsAtom } from '../../data/atoms.js';

import styled from 'styled-components';
import { data } from '../../data/restaurants';
import SliderTitle from '../../components/SliderTitle';
import { Image, Icon, Grid, Container, List, Divider, Header } from 'semantic-ui-react';
import SearchBanner from '../../components/SearchBanner/SearchBanner.js';
import TopBar from '../../components/TopBar/TopBar.js';
import ReviewFeed from '../../components/ReviewFeed.js/ReviewFeed.js';
import Slider from '../../components/Slider/Slider.js';
import PopularDishes from '../../components/PopularDishes/PopularDishes.js';

const category = () => {
  const [selections, setSelections] = useRecoilState(selectionsAtom);
  const [dishes, setDishes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let temp = [];
    let temp2 = [];
    let temp3 = [];
    data.categorys.map((item) => {
      temp.push(item);
    });
    temp.map((item) => {
      temp2.push(item['menu-items']);
    });
    temp2.map((item) => {
      temp3.push(item);
    });
    temp3 = [].concat.apply([], temp3);

    let arr = [];
    for (var i = temp3.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tempArr = temp3[i];
      temp3[i] = temp3[j];
      temp3[j] = tempArr;
      arr.push(tempArr);
    }
    setDishes(arr);
  }, [selections]);

  return (
    <>
      <TopBar />
      <SearchBanner />
      <Container style={{ marginTop: 30 }}>
        <Grid column={2}>
          <Grid.Column width={5} style={{ height: 'calc(100vh - 100px)', overflowY: 'scroll' }}>
            <Img
              src={`https://source.unsplash.com/featured/?restaurant,${Math.floor(
                Math.random() * 10000
              )}`}
            />
            <List style={{ padding: 10 }}>
              <List.Item>
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

          {/* ****************** right bar ****************** */}
          <Grid.Column width={11} style={{ paddingLeft: 50 }}>
            <Title>{router.query.restaurant}</Title>
            <Description>
              globally inspired restaurant focused on using the freshest ingredients and making our
              food and drinks from scratch. We believe in using the best proteins and produce that
              is locally sourced and thinking consciously about how the product is produced, raised
              and grown.
            </Description>
            <Header as="h2">Popular Items</Header>
            <Slider>
              <PopularDishes hideViewAll />
            </Slider>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

// const Card = styled.div`
//   display: inline-block;
//   position: relative;
//   margin: 10px;
//   width: 100%;
//   /* max-width: 250px; */
//   min-width: 200px;
//   border: solid 1px black;
// `;
const Title = styled.h1`
  font-size: 2.5rem;
`;
const Img = styled.img`
  width: 100%;
  height: 200px;
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
export default category;
