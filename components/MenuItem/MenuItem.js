import { useState } from 'react';
import { useRouter } from 'next/router';
import useIsMobile from '../../util/useIsMobile'
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { selectedItem as itemAtom } from '../../data/atoms.js';
import { Grid, Divider, Icon } from 'semantic-ui-react';
import ItemModal from '../ItemModal/';

const MenuItem = ({ item, isVCard }) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useRecoilState(itemAtom);
  const IMG_URL = `/img/food (${Math.floor(Math.random() * (86 - 1) + 1)}).jpg`;

  const [qty, setQty] = useState(0);
  const [open, setOpen] = useState(false);

  const route = (item) => {
    console.log(item);
    setSelectedItem({ ...item, img: IMG_URL });

    setOpen(true)
    // !isMobile ? setOpen(true) : router.push('/item/' + item);
  };

  const H_Card = () => {
    return (
      <>
        <ItemModal open={open} setOpen={setOpen}/>

        <HCardContainer
          onClick={() => {
            route(item);
          }}>
          <Divider />

          <Wrapper>
            <div>
              <H_Img src={IMG_URL} />
            </div>
            <div style={{ padding: "0px 10px" }}>
              <H4>{item.name}</H4>
              <Description>{item.description}</Description>
              <Wrapper>
                <H4>${item.price}</H4>
                <PlusSign><Icon name="plus circle" color="red" /></PlusSign>
              </Wrapper>
            </div>
          </Wrapper>

        </HCardContainer>
      </>
    );
  };

  const V_Card = () => {
    return (
      <>
        <ItemModal open={open} setOpen={setOpen}/>

        <VCardContainer onClick={() => route(item)}>
          <div>
            <Img src={IMG_URL} />
          <H4 style={{ padding: "0 5px" }}>{item.name}</H4>
          </div>
          <div style={{ padding: "0 5px" }}>
            <Wrapper>
              <H4>$14.00</H4>
              <PlusSign><Icon name="plus circle" color="red" /></PlusSign>
            </Wrapper>
          </div>
        </VCardContainer>
      </>
    );
  };

  return <>{isVCard ? <V_Card /> : <H_Card />}</>;
};
const Wrapper = styled.div`
  display : flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  `;
const VCardContainer = styled.div`
  display : flex;
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
const H4 = styled.h4`
  margin: 0;
  white-space: initial;
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
