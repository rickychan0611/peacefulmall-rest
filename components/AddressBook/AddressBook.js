import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import AddressEditModal from '../AddressEditModal';
import { HOST_URL } from '../../env';
import { useCookies } from 'react-cookie';
import { useIsMobile } from '../../util/useScreenSize';
import useTranslation from 'next-translate/useTranslation';

const AddressBook = ({ addresses, selectedAddress, setSelectedAddress, getAddressesQuery }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(null);
  const [cookies] = useCookies(null);
  const isMobile = useIsMobile();
  const { t } = useTranslation('profile');

  const query = async (body) => {
    setLoading(true);
    try {
      await axios.post(HOST_URL + '/api/user/address/set', body, {
        headers: { Authorization: cookies.userToken }
      });
      await getAddressesQuery();
      setLoading(false);
      setOpen(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const saveAddressQuery = async () => {
    //// both create and edit address use this query.
    //// if type is "create", remove current default address.
    selectedAddress.type === 'create' && removeCurrentDefaultQuery();
    query(selectedAddress);
  };

  const deleteAddressQuery = async (id) => {
    query({ type: 'delete', address_id: id });
  };

  const removeCurrentDefaultQuery = async () => {
    const index = addresses && addresses.findIndex((item) => item.default_status === 1);
    query({ type: 'edit', address_id: addresses[index].id, default_status: 0 });
  };

  const setDefaultQuery = async (id) => {
    removeCurrentDefaultQuery();
    query({ type: 'edit', address_id: id, default_status: 1 });
  };

  return (
    <>
      <AddressEditModal
        open={open}
        setOpen={setOpen}
        loading={loading}
        saveAddressQuery={saveAddressQuery}
        err={err}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />

      <a
        style={{ marginBottom: 10, color: 'green', cursor: 'pointer' }}
        onClick={() => {
          setOpen(true);
          setSelectedAddress({ type: 'create', default_status: 1 });
        }}>
        <Icon name="plus circle" />
        {t`AddAddress`}
      </a>
      <br />
      <AddressContainer>
        {addresses &&
          addresses[0] &&
          addresses.map((address, i) => {
            return (
              <AddressCard default={address.default_status} key={i} isMobile={isMobile}>
                <h4>
                  {address.name}
                  <br />
                  {address.phone}
                </h4>
                <p>
                  {address.detail_address}
                  <br />
                  {address.city}
                  <br />
                  {address.province} <br />
                  {address.post_code}
                  <br />
                  {address.country}
                </p>
                <Row>
                  <AddressButton
                    default={address.default_status}
                    onClick={() => {
                      !loading && setSelectedAddress({ type: 'edit', address_id: address.id });
                      address.default_status !== 1 && setDefaultQuery(address.id);
                    }}>
                    {loading &&
                    selectedAddress.address_id === address.id &&
                    selectedAddress.type === 'edit' ? (
                      <Icon loading name="spinner" />
                    ) : (
                      t`Default`
                    )}
                  </AddressButton>

                  <AddressButton
                    onClick={() => {
                      setSelectedAddress({ ...address, type: 'edit', address_id: address.id });
                      setOpen(true);
                    }}>
                    {t`Edit`}
                  </AddressButton>

                  <AddressButton
                    style={{
                      color: address.default_status === 1 && 'lightGrey'
                    }}
                    onClick={() => {
                      !loading &&
                        setSelectedAddress({ ...address, type: 'delete', address_id: address.id });
                      address.default_status !== 1 && deleteAddressQuery(address.id);
                    }}>
                    {loading &&
                    selectedAddress.address_id === address.id &&
                    selectedAddress.type === 'delete' ? (
                      <Icon loading name="spinner" />
                    ) : (
                      t`Delete`
                    )}
                  </AddressButton>
                </Row>
              </AddressCard>
            );
          })}
      </AddressContainer>
    </>
  );
};

const Row = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 5px;
`;
const AddressContainer = styled.div`
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 10px;
`;
const AddressCard = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: ${(p) => (p.default === 1 ? '14px' : '15px')};
  border-radius: 10px;
  border: ${(p) => (p.default === 1 ? '2px solid #ff614d' : '1px solid #d3d1d1')};
  max-width: ${(p) => (p.isMobile ? 'none' : '207px')};
`;
const AddressButton = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 5px 8px 5px 8px;
  border-radius: 5px;
  border: 1px solid #d3d1d1;
  cursor: pointer;
  font-size: 12px;
  background-color: ${(p) => (p.default === 1 ? '#ff614d' : '#e4e3e3')};
  color: ${(p) => (p.default === 1 ? 'white' : 'black')};
  font-weight: bold;
  flex: 1;
  min-width: 56px;
`;

export default AddressBook;
