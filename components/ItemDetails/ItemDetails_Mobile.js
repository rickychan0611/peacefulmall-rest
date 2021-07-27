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
              thumbnailClass="thumb"
            />
          </Gallery>
          <div>
            <ItemDetails_Price item={item} />
            <ItemDetails_Attributes item={item} onChange={onChange} />
            <br/>
            <hr/>
            <h3>Description</h3>
            <Description>{item.description}</Description>
          </div>
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
const Container = styled.div`flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 20px;
  padding-top: 70px;
  padding-bottom: 150px;
  width: 100%;
  max-width: 500px;
`;
const Description = styled.h4`
  color: grey;
`;
const Gallery = styled.div`  
  .image-gallery-slide img {
    height: 330px;
  }
  .image-gallery-thumbnail-image {
    width: 75px;
    height: 75px;
    object-fit: contain;
  }
`;

export default ItemDetails_Mobile;
