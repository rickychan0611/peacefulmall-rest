import { Feed, Rating, Image, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { currentShop as currentShopAtom } from '../../data/atoms';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import _ from 'lodash';
import ReactStars from 'react-rating-stars-component';


const ReviewFeed = () => {
  const [currentShop, setCurrentShop] = useRecoilState(currentShopAtom);
  const { t } = useTranslation('home');

  return (
    <>
      <Title>{t`Reviews`}</Title>
      <Rating icon="heart" defaultRating={3} maxRating={4} />
      {currentShop && currentShop.reviews && currentShop.reviews[0] &&
        currentShop.reviews.map((item, i) => {
          return (
            <Feed key={i}>
              <Feed.Event>
                <Feed.Label>
                  <Image
                    src={item.images ? HOST_URL + '/storage/' + item.images : '/avatar.jpg'}
                    avatar
                    size="mini"
                  />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>{item.user_nickname}</Feed.User>
                    <Feed.Date>
                      {moment(item.updated_at).format('MMM DD, YYYY | h : mma')}
                    </Feed.Date>
                  </Feed.Summary>

                  <Row>
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      size={22}
                      activeColor="#ffd700"
                      isHalf={true}
                      value={item.rating}
                    />

                    <span style={{ paddingTop: 5 }}>{" " + item.rating}</span>
                  </Row>
                  <Feed.Extra text>{item.content}</Feed.Extra>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          );
        })}
    </>

    // <>
    //   <Title>{t && t`Reviews`}</Title>
    //   <Feed>
    //     <Feed.Event>
    //       <Feed.Label>
    //         {/* <img src={`https://i.pravatar.cc/100/${Math.floor(Math.random() * 10000)}`} /> */}
    //         <Image
    //           src={
    //             currentShop && currentShop.logo
    //               ? HOST_URL + '/storage/' + currentShop.logo
    //               : '/avatar-placeholder.png'
    //           }
    //           avatar
    //           size="mini"
    //         />
    //       </Feed.Label>
    //       <Feed.Content>
    //         <Feed.Summary>
    //           <Feed.User>Elliot Fu</Feed.User> added you as a friend
    //           <Feed.Date>1 Hour Ago</Feed.Date>
    //         </Feed.Summary>
    //         <Feed.Meta>
    //           <Feed.Like>
    //             <Icon name="like" />4 Likes
    //           </Feed.Like>
    //         </Feed.Meta>
    //       </Feed.Content>
    //     </Feed.Event>

    //     <Feed.Event>
    //       <Feed.Label image={`https://i.pravatar.cc/100/${Math.floor(Math.random() * 10000)}`} />
    //       <Feed.Content>
    //         <Feed.Summary>
    //           <a>Helen Troy</a> added <a>2 new illustrations</a>
    //           <Feed.Date>4 days ago</Feed.Date>
    //         </Feed.Summary>
    //         <Feed.Extra images>
    //           <a>
    //             <Img
    //               src={`https://source.unsplash.com/featured/?dinning, steak${Math.floor(
    //                 Math.random() * 10000
    //               )}`}
    //             />
    //           </a>
    //           <a>
    //             <Img
    //               src={`https://source.unsplash.com/featured/?dinning, steak${Math.floor(
    //                 Math.random() * 10000
    //               )}`}
    //             />
    //           </a>
    //         </Feed.Extra>
    //         <Feed.Meta>
    //           <Feed.Like>
    //             <Icon name="like" />1 Like
    //           </Feed.Like>
    //         </Feed.Meta>
    //       </Feed.Content>
    //     </Feed.Event>

    //     <Feed.Event>
    //       <Feed.Label image={`https://i.pravatar.cc/100/${Math.floor(Math.random() * 10000)}`} />
    //       <Feed.Content>
    //         <Feed.Summary date="2 Days Ago" user="Jenny Hess" content="add you as a friend" />
    //         <Feed.Meta>
    //           <Feed.Like>
    //             <Icon name="like" />8 Likes
    //           </Feed.Like>
    //         </Feed.Meta>
    //       </Feed.Content>
    //     </Feed.Event>

    //     <Feed.Event>
    //       <Feed.Label image={`https://i.pravatar.cc/100/${Math.floor(Math.random() * 10000)}`} />
    //       <Feed.Content>
    //         <Feed.Summary>
    //           <a>Joe Henderson</a> posted on his page
    //           <Feed.Date>3 days ago</Feed.Date>
    //         </Feed.Summary>
    //         <Feed.Extra text>
    //           Ours is a life of constant reruns. We're always circling back to where we'd we
    //           started, then starting all over again. Even if we don't run extra laps that day, we
    //           surely will come back for more of the same another day soon.
    //         </Feed.Extra>
    //         <Feed.Meta>
    //           <Feed.Like>
    //             <Icon name="like" />5 Likes
    //           </Feed.Like>
    //         </Feed.Meta>
    //       </Feed.Content>
    //     </Feed.Event>

    //     <Feed.Event>
    //       <Feed.Label image={`https://i.pravatar.cc/100/${Math.floor(Math.random() * 10000)}`} />
    //       <Feed.Content>
    //         <Feed.Summary>
    //           <a>Justen Kitsune</a> added <a>2 new photos</a> of you
    //           <Feed.Date>4 days ago</Feed.Date>
    //         </Feed.Summary>
    //         <Feed.Extra images>
    //           <a>
    //             <Img
    //               src={`https://source.unsplash.com/featured/?dinning, steak${Math.floor(
    //                 Math.random() * 10000
    //               )}`}
    //             />
    //           </a>
    //           <a>
    //             <Img
    //               src={`https://source.unsplash.com/featured/?dinning, steak${Math.floor(
    //                 Math.random() * 10000
    //               )}`}
    //             />
    //           </a>
    //         </Feed.Extra>
    //         <Feed.Meta>
    //           <Feed.Like>
    //             <Icon name="like" />
    //             41 Likes
    //           </Feed.Like>
    //         </Feed.Meta>
    //       </Feed.Content>
    //     </Feed.Event>
    //   </Feed>
    // </>
  );
};

const Img = styled.img`
  min-width: 50px;
  height: 50px;
  object-fit: cover;
`;
const Row = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;
const Title = styled.h2`
  color: black;
  margin: 0 10px 10px 0;
  display: flex;
  align-items: center;
`;
export default ReviewFeed;
