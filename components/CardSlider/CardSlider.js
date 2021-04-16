import _ from 'lodash';
import styled from 'styled-components';
import { Image, Divider } from 'semantic-ui-react';
import ScrollContainer from 'react-indiana-drag-scroll';

const data = [
  { name: 'Cantonese', img: 'canton-thumb.jpg' },
  { name: 'Bubble Tea', img: 'bubble-thumb.jpg' },
  { name: 'Chinese BBQ', img: 'bbq-thumb.jpg' },
  { name: 'Fast Food', img: 'fastFood-thumb.jpg' },
  { name: 'Fried Chicken', img: 'friedChicken-thumb.jpg' },
  { name: 'Hong Kong', img: 'hongkong-thumb.jpg' },
  { name: 'Japanese', img: 'japanese-thumb.jpg' },
  { name: 'Korean', img: 'korean-thumb.jpg' },
  { name: 'Spicy', img: 'spicy-thumb.jpg' },
  { name: 'Ramen', img: 'ramen-thumb.jpg' },
  { name: 'Taiwanese', img: 'taiwan-thumb.jpg' },
  { name: 'Mexcian', img: 'mexcian-thumb.jpg' }
];

const CatSlider = () => (
  <>
    <h2 style={{ color: 'black' }}>Cuisines</h2>
    <Divider />
    <Container horizontal nativeMobileScroll>
      {data.map((item, i) => {
        return (
          <CatCard key={i}>
            <Image size="small" src={`/${item.img}`} />
            <Text>{item.name.toUpperCase()}</Text>
          </CatCard>
        );
      })}
    </Container>
  </>
);

const Container = styled(ScrollContainer)`
  overflow: auto;
  white-space: nowrap;
`;
const CatCard = styled.div`
  display: inline-block;
  position: relative;
  margin: 10px;
`;
const Text = styled.div`
  color: white;
  background-color: rgba(0,0,0,.55);
  padding: 20px 0;
  text-shadow: 0px 0px 10px black;
  position: absolute;
  bottom: calc(50% - 30px);
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
`;

export default CatSlider;
