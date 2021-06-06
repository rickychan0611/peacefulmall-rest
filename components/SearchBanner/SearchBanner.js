import { useState } from 'react';
import styled from 'styled-components';
import { Form, Modal, Header, Icon, Input } from 'semantic-ui-react';
import { useIsMobile } from '../../util/useScreenSize';
import SearchBanner_Desktop from './SearchBanner_Desktop';
import SearchBanner_Mobile from './SearchBanner_Mobile';
import CurrentAddress from '../CurrentAddress';

const SearchBanner = () => {
  const isMobile = useIsMobile();
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)} closeIcon>
        <Header>Search</Header>
        <CurrentAddress />
        <Modal.Content>
          <Form>
            <InputWrapper>
              <Input
                style={{ margin: 0, width: '100%' }}
                placeholder="Search restaurants or food"
                icon="search"
                iconPosition="left"
                value={value}
                onChange={handleChange}/>
              <Icon
                name="times"
                style={{ margin: '0 10px' }}
                onClick={() => {
                  setValue('');
                }}
              />
            </InputWrapper>
          </Form>
          <h4>Top Searches</h4>

          <Item
            onClick={() => {
              setValue('Peaceful Restaurant');
            }}>
            <NameIcon>
              <Icon name="search" />
              <Name>Peaceful Restaurant</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="search" />
              <Name>Peaceful Restaurant</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="search" />
              <Name>Peaceful Restaurant</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="search" />
              <Name>Peaceful Restaurant</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="search" />
              <Name>Peaceful Restaurant</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>

          <h4>Cuisines</h4>

          <Item>
            <NameIcon>
              <Icon name="food" />
              <Name>Chinese</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="food" />
              <Name>Japanese</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="food" />
              <Name>Fast Food</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="food" />
              <Name>Chicken</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="food" />
              <Name>Burgers</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="food" />
              <Name>Chinese</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="food" />
              <Name>Japanese</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="food" />
              <Name>Fast Food</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="food" />
              <Name>Chicken</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          <Item>
            <NameIcon>
              <Icon name="food" />
              <Name>Burgers</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
        </Modal.Content>
      </Modal>

      {isMobile ? (
        <SearchBanner_Mobile setOpenModal={setOpenModal} />
      ) : (
        <SearchBanner_Desktop setOpenModal={setOpenModal} />
      )}
    </>
  );
};

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;
const Item = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #d0cece;
  padding: 15px 5px;
`;
const NameIcon = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;
const Name = styled.div`
  font-size: 14;
  font-weight: 600;
`;

export default SearchBanner;
