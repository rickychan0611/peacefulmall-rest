import { useState } from 'react';
import styled from 'styled-components';
import {Modal} from 'semantic-ui-react';
import ItemDetails from '../ItemDetails/';

const ItemModal = ({ open, setOpen }) => {

  return (
    <>
      <ModalContainer open={open} size="tiny" closeIcon onClose={() => setOpen(false)}>
        <Modal.Content scrolling style={{maxHeight: '80vh', padding: 0 }}>
          <ItemDetails setOpen={setOpen} />
        </Modal.Content>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled(Modal)`
  height: calc(100vh - 70px); 
`;

export default ItemModal;
