import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const AddressBook = (
  {
    loading,
    addresses,
    setOpenEdit,
    selectedAddress,
    setSelectedAddress,
    deleteAddressQuery,
    setDefaultQuery
  }
) => {
  return (
    <>
      <a style={{ marginBottom: 10, color: "green", cursor:"pointer" }}
        onClick={() => {
          setOpenEdit(true)
          setSelectedAddress({ type: "create", default_status: 1 })
        }}>
        <Icon name="plus circle" />
            Add a new address</a><br />
      <AddressContainer>
        {addresses &&
          addresses[0] &&
          addresses.map((address, i) => {
            return (
              <AddressCard default={address.default_status} key={i}>
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
                      !loading && setSelectedAddress({ type: "edit", address_id: address.id })
                      address.default_status !== 1 && setDefaultQuery(address.id)
                    }}
                  >
                    {loading && selectedAddress.address_id === address.id &&
                      selectedAddress.type === "edit" ? <Icon loading name='spinner' /> : "Default"}
                  </AddressButton>

                  <AddressButton
                    onClick={() => {
                      setSelectedAddress({ ...address, type: "edit", address_id: address.id });
                      setOpenEdit(true);
                    }}>
                    Edit
                        </AddressButton>

                  <AddressButton style={{
                    color: address.default_status === 1 && "lightGrey"
                  }}
                    onClick={() => {
                      !loading && setSelectedAddress({ ...address, type: "delete", address_id: address.id });
                      address.default_status !== 1 && deleteAddressQuery(address.id)
                    }}
                  >
                    {loading && selectedAddress.address_id === address.id &&
                      selectedAddress.type === "delete" ? <Icon loading name='spinner' /> : "Delete"}
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
  padding: ${p => p.default === 1 ? "14px" : "15px"};
  border-radius: 10px;
  border:  ${p => p.default === 1 ? "2px solid #ff614d" : "1px solid #d3d1d1"};
  max-width: 207px;
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
  background-color: ${p => p.default === 1 ? "#ff614d" : "#e4e3e3"};
  color: ${p => p.default === 1 ? "white" : "black"};
  font-weight: bold;
  flex: 1;
  min-width: 56px;
`;

export default AddressBook;
