import { useState } from 'react';
import styled from 'styled-components';
import { Form, Modal, Header, Icon, Input } from 'semantic-ui-react';
import { useIsMobile } from '../../util/useScreenSize';
import SearchBanner_Desktop from './SearchBanner_Desktop';
import SearchBanner_Mobile from './SearchBanner_Mobile';
import CurrentAddress from '../CurrentAddress';
import { useRouter } from 'next/router';

const SearchBanner = () => {
  const isMobile = useIsMobile();
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState();
  const router = useRouter();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const search = (keyword) => {
    setValue(keyword);
    router.push('/search/shop/' + keyword)
    setOpenModal(false)
  }

  const handleSubmit = () => {
    search(value)
  }

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)} closeIcon>
        <Header>Search</Header>
        <CurrentAddress />
        <Modal.Content>
          
          <Form>
            <InputWrapper style={{ backgroundColor: '#c4c3c3', border: '1px solid #c4c3c3' }}>
              <InputWrapper style={{ backgroundColor: 'white', borderRadius: '5px 0px 0px 5px' }}>
                <input
                  style={{ margin: 0, width: '100%', border: 0 }}
                  placeholder="Search restaurants or food"
                  icon="search"
                  iconPosition="left"
                  value={value}
                  onChange={handleChange}
                />
                {value && (
                  <Icon
                    name="times"
                    style={{ margin: '0 10px', color: '#c4c3c3' }}
                    onClick={() => {
                      setValue('');
                    }}
                  />
                )}
              </InputWrapper>
              <Icon
                name="search"
                style={{ margin: '0 10px' }}
                onClick={() => {
                  setValue('');
                  onSubmit = { handleSubmit };
                }}
              />
            </InputWrapper>
          </Form>
          <h4>Top Searches</h4>

          <Item
            onClick={() => {
              search('和平')
            }}>
            <NameIcon>
              <Icon name="search" />
              <Name>和平</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>
          
          <Item
            onClick={() => {
              search('Pizza')
            }}>
            <NameIcon>
              <Icon name="search" />
              <Name>Pizza</Name>
            </NameIcon>
            <div>
              <Icon name="chevron right" />
            </div>
          </Item>

          <Item
            onClick={() => {
              search('Dim Sum');
            }}>
            <NameIcon>
              <Icon name="search" />
              <Name>Dim Sum</Name>
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
  border-radius: 5px;
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
