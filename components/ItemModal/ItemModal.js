import { useState } from 'react';
import styled from 'styled-components';
import {Modal} from 'semantic-ui-react';
import ItemDetails from '../ItemDetails/';

const ItemModal = ({ open, setOpen, fromRestaurantPage }) => {

  return (
    <>
      <ModalContainer open={open} size="tiny" closeIcon onClose={() => setOpen(false)}>
        <Modal.Content scrolling style={{maxHeight: '80vh', padding: 0 }}>
          <ItemDetails setOpen={setOpen} fromRestaurantPage={fromRestaurantPage}/>
        </Modal.Content>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled(Modal)`
  margin-top: 100px;
  height: calc(100vh - 110px); 
`;

export default ItemModal;
