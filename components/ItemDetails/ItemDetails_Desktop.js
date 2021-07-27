import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import ItemDetails_Attributes from './ItemDetails_Attributes';
import ItemDetails_Price from './ItemDetails_Price';
import ItemDetails_Header from './ItemDetails_Header.js';
import BottomAddBar from '../BottomAddBar';

const ItemDetails_Desktop = ({
  item,
  onChange,
  imageUrls,
  attributes,
  attributeTotal,
  quantity,
  setQty,
  addItem }) => {

  return (
    <>
      <Wrapper>
        <div>
          <Container>
            <Gallery>
              <ImageGallery
                items={imageUrls}
                thumbnailPosition="left"
                renderLeftNav={() => null}
                renderRightNav={() => null}
                renderPlayPauseButton={() => null}
              />
            </Gallery>
            <Content>
              <ItemDetails_Header item={item} />
              <ItemDetails_Price item={item} />
              <ItemDetails_Attributes item={item} onChange={onChange} />
              <BottomAddBar
                attributeTotal={attributeTotal}
                attributes={attributes}
                quantity={quantity}
                setQty={setQty}
                price={item.promotion_price === null ? item.price : item.promotion_price}
                addItem={addItem}
              />
            </Content>
          </Container>
        </div>
        <DescriptionContainer>
          <h2>Description</h2>
          <Description>{item.description}</Description>
        </DescriptionContainer>
      </Wrapper>
      {/* <BottomAddBar
        attributeTotal={attributeTotal}
        attributes={attributes}
        quantity={quantity}
        setQty={setQty}
        price={item.promotion_price === null ? item.price : item.promotion_price}
        addItem={addItem}
      /> */}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 100px;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 20px;
  padding-top: 130px;
  /* min-height: calc(100vh - 60px); */
  width: 100%;
  max-width: 1400px;
  gap: 40px;
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  max-width: 1100px;
`;
const Description = styled.h4`
  color: grey;
`;
const Gallery = styled.div`
  flex: 1;
  .image-gallery {
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .image-gallery-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  background-color: white;
  }
.image-gallery-image {
    height: 100%;
    min-height: 300px;
    max-height: 600px;
    width: 100%;
    min-width: 300px;
    max-width: 900px;
    object-fit: contain; 
  }
  .thumbnailPhoto {
    width: 92px;
    height: 92px;
    object-fit: contain;
    background-color: white;
  }
`;
const Content = styled.div`
    flex: 1;
`;
export default ItemDetails_Desktop;
