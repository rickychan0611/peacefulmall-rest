import { useRouter } from 'next/router';
import useIsMobile from '../../util/useIsMobile';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { currentItem as itemAtom } from '../../data/atoms.js';
import { Divider, Icon } from 'semantic-ui-react';

const MenuItem = ({ item, smallCard }) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [, setCurrentItem] = useRecoilState(itemAtom);
  const IMG_URL = `/img/food (${Math.floor(Math.random() * (86 - 1) + 1)}).jpg`;

  const route = (item) => {
    console.log(item);
    setCurrentItem(item);

    router.push('/item/' + item.id);
  };

  const H_Card = () => {
    return (
      <>
        <HCardContainer
          onClick={() => {
            route(item);
          }}>
          <Divider />

          <Wrapper>
            <div>
              <H_Img src={IMG_URL} />
            </div>
            <div style={{ padding: '0px 10px' }}>
              <Name>{item.name}</Name>
              <Description>{item.description}</Description>
              <Wrapper>
                <Price>${item.price}</Price>
                <PlusSign>
                  <Icon name="plus circle" color="red" />
                </PlusSign>
              </Wrapper>
            </div>
          </Wrapper>
        </HCardContainer>
      </>
    );
  };

  const Small_Card = () => {
    return (
      <>
        <VCardContainer onClick={() => route(item)}>
          <div>
            <Img src={IMG_URL} />
            <Name style={{ padding: '0 5px' }}>{item.name}</Name>
          </div>
          <div style={{ padding: '0 5px' }}>
            <Wrapper>
              <Price>$14.00</Price>
              <PlusSign>
                <Icon name="plus circle" color="red" />
              </PlusSign>
            </Wrapper>
          </div>
        </VCardContainer>
      </>
    );
  };

  return <>{smallCard ? <Small_Card /> : <H_Card />}</>;
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;
const VCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: relative;
  margin: 5px 15px 15px 5px;
  width: 130px;
  height: 155px;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: solid 1px #e9e9e9;
  cursor: pointer;
`;
const Price = styled.h5`
  margin: 0;
  white-space: initial;
`;
const Name = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  overflow: hidden;
      text-overflow: ellipsis;
      white-space: initial;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
`;
const PlusSign = styled.div`
  margin: 0;
  white-space: initial;
`;
const HCardContainer = styled.div`
  cursor: pointer;
`;
const H_Img = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
`;
const Img = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
`;
const Description = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default MenuItem;
