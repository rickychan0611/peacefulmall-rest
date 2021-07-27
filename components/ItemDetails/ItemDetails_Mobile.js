import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import ItemDetails_Attributes from './ItemDetails_Attributes';
import ItemDetails_Price from './ItemDetails_Price';
import ItemDetails_Header from './ItemDetails_Header.js';
import BottomAddBar from '../BottomAddBar';

const ItemDetails_Mobile = ({ 
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
        <Container>
          <ItemDetails_Header item={item} />
          <Gallery>
            <ImageGallery
              items={imageUrls}
              renderLeftNav={() => null}
              renderRightNav={() => null}
              renderPlayPauseButton={() => null}
            />
          </Gallery>
          <ItemDetails_Price item={item} />
          <Description>{item.description}</Description>
          <ItemDetails_Attributes item={item} onChange={onChange} />
        </Container>
      </Wrapper>
      <BottomAddBar
        attributeTotal={attributeTotal}
        attributes={attributes}
        quantity={quantity}
        setQty={setQty}
        price={item.promotion_price === null ? item.price : item.promotion_price}
        addItem={addItem}
      />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Container = styled.div`
  padding: 20px;
  padding-top: 70px;
  padding-bottom: 150px;
  min-height: calc(100vh - 60px);
  width: 100%;
  max-width: 500px;
`;
const Description = styled.h4`
  color: grey;
`;
const Gallery = styled.div`  
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

export default ItemDetails_Mobile;
