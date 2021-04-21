import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { selectedItem as itemAtom } from '../../data/atoms.js';
import { Grid, Divider, Modal, Button, Icon } from 'semantic-ui-react';
import ItemDetails from '../ItemDetails/ItemDetails.js';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';
import BottomAddBar from '../BottomAddBar/BottomAddBar.js';

const MenuItem = ({ item }) => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useRecoilState(itemAtom);
  const IMG_URL = `https://source.unsplash.com/featured/?dinning, steak${Math.floor(
    Math.random() * 10000
  )}`;
  const isDesktop = useDesktopMediaQuery();

  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(0);

  const route = (item) => {
    console.log(item);
    setSelectedItem({ ...item, img: IMG_URL });
    isDesktop ? setOpen(true) : router.push('/item/' + item);
  };

  return (
    <>
      <ItemModal open={open} size="tiny">
        <Modal.Content scrolling style={{ maxHeight: '80vh', padding: 0 }}>
          <ItemDetails setOpen={setOpen} />
        </Modal.Content>
      </ItemModal>

      <div
        onClick={() => {
          route(item);
        }}>
        <Grid>
          <Grid.Column width={3}>
            <Img src={IMG_URL} />
          </Grid.Column>
          <Grid.Column width={13} style={{ paddingLeft: 0 }}>
            <H4>{item.name}</H4>
            <Description>{item.description}</Description>
            <H4>${item.price}</H4>
          </Grid.Column>
        </Grid>
        <Divider />
      </div>
    </>
  );
};

const ItemModal = styled(Modal)`
  /* height: calc(100vh - 70px);  */
  /* overflow-y: scroll; */
`;
const H4 = styled.h4`
  margin: 0;
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
