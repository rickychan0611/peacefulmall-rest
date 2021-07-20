import { useEffect, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { data } from '../../data/restaurants-old';
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import ReactStars from 'react-rating-stars-component';
import { Feed } from 'semantic-ui-react';
import moment from 'moment';

const ReviewCards = ({ shop }) => {
  const [dishes, setDishes] = useState([]);
  const { t } = useTranslation('home')

  return (
    <>
      {
        shop && shop.reviews && shop.reviews.map((item, i) => {
          return (
            <Link href={'/shop/' + shop.name + '/' + shop.id + '/reviews#' + item.id} key={i}>
              <Card key={i} >
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Link href={"/item/" + item.product_id}>
                        <Description><a>{item.product_name}</a></Description>
                      </Link>
                      <Row>
                        <ReactStars
                          count={5}
                          size={22}
                          activeColor="#ffd700"
                          isHalf={true}
                          value={item.rating}
                        />
                        <span style={{ paddingTop: 5 }}>{item.rating}</span>
                      </Row>
                      <Name>{item.content}</Name>
                      <Feed.Summary>
                        <Feed.User>{item.user_nickname}</Feed.User>
                        <Feed.Date>
                          {moment(item.updated_at).format('MMM DD, YYYY | h : mma')}
                        </Feed.Date>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card>
            </Link>
          );
        })}
    </>
  );
};

const Row = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;
const Card = styled.div`
  display: inline-block;
  position: relative;
  margin-right: 15px;
  width: 220px;
  cursor: pointer;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
`;
const Img = styled.img`
  width: 250px;
  height: 150px;
  object-fit: cover;
`;
const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 10px 0 10px 0;
  /* height: 100px; */
`;
const Review = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: red;
  margin-top: 5px;
`;

export default ReviewCards;
