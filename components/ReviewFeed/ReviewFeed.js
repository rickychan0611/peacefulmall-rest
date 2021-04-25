import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import styled from 'styled-components';

const ReviewFeed = () => (
  <>
   <Title>Reviews</Title>
  <Feed>
    <Feed.Event>
      <Feed.Label>
        <img src={`https://i.pravatar.cc/100/${Math.floor(Math.random() * 10000)}`} />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>Elliot Fu</Feed.User> added you as a friend
          <Feed.Date>1 Hour Ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />4 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image={`https://i.pravatar.cc/100/${Math.floor(Math.random() * 10000)}`} />
      <Feed.Content>
        <Feed.Summary>
          <a>Helen Troy</a> added <a>2 new illustrations</a>
          <Feed.Date>4 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <a>
            <Img src={`https://source.unsplash.com/featured/?dinning, steak${Math.floor(Math.random() * 10000)}`} />
          </a>
          <a>
            <Img src={`https://source.unsplash.com/featured/?dinning, steak${Math.floor(Math.random() * 10000)}`} />
          </a>
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />1 Like
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image={`https://i.pravatar.cc/100/${Math.floor(Math.random() * 10000)}`} />
      <Feed.Content>
        <Feed.Summary
          date='2 Days Ago'
          user='Jenny Hess'
          content='add you as a friend'
        />
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />8 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image={`https://i.pravatar.cc/100/${Math.floor(Math.random() * 10000)}`} />
      <Feed.Content>
        <Feed.Summary>
          <a>Joe Henderson</a> posted on his page
          <Feed.Date>3 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>
          Ours is a life of constant reruns. We're always circling back to where
          we'd we started, then starting all over again. Even if we don't run
          extra laps that day, we surely will come back for more of the same
          another day soon.
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />5 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image={`https://i.pravatar.cc/100/${Math.floor(Math.random() * 10000)}`} />
      <Feed.Content>
        <Feed.Summary>
          <a>Justen Kitsune</a> added <a>2 new photos</a> of you
          <Feed.Date>4 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <a>
            <Img src={`https://source.unsplash.com/featured/?dinning, steak${Math.floor(Math.random() * 10000)}`} />
          </a>
          <a>
            <Img src={`https://source.unsplash.com/featured/?dinning, steak${Math.floor(Math.random() * 10000)}`} />
          </a>
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />
            41 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  </Feed>
  </>
)

const Img = styled.img`
  min-width: 50px;
  height: 50px;
  object-fit: cover;
`;
const Title = styled.h2`
  color: black;
  margin: 0 10px 10px 0;
  display: flex;
  align-items: center;
`;
export default ReviewFeed