import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentItem as currentItemAtom } from '../../data/atoms.js';
import { orderItems as orderItemsAtom } from '../../data/orderAtoms.js';
import ItemDetails_Mobile from './ItemDetails_Mobile.js';
import ItemDetails_Desktop from './ItemDetails_Desktop.js';
import { useIsDesktop } from '../../util/useScreenSize';

const ItemDetails_Context = ({
  checkOutListItem,
  updateItem,
  attributes,
  setAttributes,
  attributeTotal,
  quantity,
  setQty,
  addItem,
}) => {
  const [currentItem, setCurrentItem] = useRecoilState(currentItemAtom);
  const [item, setItem] = useState();
  const [orderItems, setOrderItems] = useRecoilState(orderItemsAtom);
  const [imageUrls, setImageUrls] = useState([]);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    console.log('Load currentItem', currentItem);
    console.log('Load checkOutListItem', checkOutListItem);
    checkOutListItem ? setItem(checkOutListItem) : setItem(currentItem);
    let tempArr = currentItem ? JSON.parse(currentItem.images) : []

    //restructure object data for image gallery
    for (let i in tempArr) {
      tempArr[i] = {
        original: process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + tempArr[i],
        thumbnail: process.env.NEXT_PUBLIC_HOST_URL + '/storage/' + tempArr[i],
        originalClass: "mainPhoto",
        thumbnailClass: "thumbnailPhoto",
      }
    }
    tempArr?.length > 0 && setImageUrls(tempArr);

  }, [checkOutListItem, currentItem]);

  const onChange = (task, option) => {
    let tempItem = JSON.parse(JSON.stringify(updateItem ? checkOutListItem : currentItem));
    const attIndex = tempItem.attributes.findIndex((item) => item.id === option.attribute_id);
    const optIndex = tempItem.attributes[attIndex].options.findIndex(
      (item) => item.id === option.id
    );
    let tempOpts = tempItem.attributes[attIndex].options[optIndex];

    if (task === 'radio') {
      tempItem.attributes[attIndex].options = tempItem.attributes[attIndex].options.map((item) => ({
        ...item,
        quantity: 0
      }));
      tempItem.attributes[attIndex].options[optIndex].quantity = 1;
    } else if (!tempOpts.quantity && task == 'plus') {
      tempOpts.quantity = 1;
    } else if (tempOpts.quantity) {
      tempOpts.quantity = tempOpts.quantity + (task === 'plus' ? 1 : -1);
    }

    console.log('orderItems', orderItems);
    updateItem
      ? setOrderItems((prev) => prev.map((item) => (item.uid === tempItem.uid ? tempItem : item)))
      : setCurrentItem(tempItem);
  };

  return (
    <>
      {item && <>
        {!isDesktop ?
          <ItemDetails_Mobile
            item={item}
            onChange={onChange}
            imageUrls={imageUrls}
            attributes={attributes}
            setAttributes={setAttributes}
            attributeTotal={attributeTotal}
            quantity={quantity}
            setQty={setQty}
            addItem={addItem}
          />
          :
          <ItemDetails_Desktop
            item={item}
            onChange={onChange}
            imageUrls={imageUrls}
            attributes={attributes}
            setAttributes={setAttributes}
            attributeTotal={attributeTotal}
            quantity={quantity}
            setQty={setQty}
            addItem={addItem} 
            />
        }
      </>
      }
    </>
  );
};

export default ItemDetails_Context;
