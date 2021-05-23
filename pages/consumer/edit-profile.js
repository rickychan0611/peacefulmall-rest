import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Divider, Form, Button, Icon, Transition, Modal, Header, Loader } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../../data/userAtom';
import { useEffect } from 'react';
import validation from '../../util/validation';
import { HOST_URL } from '../../env';
import { useCookies } from 'react-cookie';
import { get } from 'http';

import AddressEditModal from '../../components/AddressEditModal';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies] = useCookies(null);
  const [editedUser, setEditedUser] = useState('');
  const [disableSave, setDisableSave] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const handleChange = (e, name) => {
    setVisible(false);
    setEditedUser((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSave = () => {
    setLoading(true);
    setErr({});
    validation(editedUser)
      .then(async (res) => {
        console.log(res);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // if successful
        setUser(editedUser);
        setVisible(true);
        setDisableSave(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErr((prev) => ({ ...prev, ...err }));
      });
  };

  const handleEditAddressChange = (e, name) => {
    setSelectedAddress((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const getAddresses = async () => {
    try {
      const result = await axios.get(HOST_URL + '/api/user/address', {
        headers: { Authorization: cookies.userToken }
      });
      const sorted = result.data.sort((a, b) => (new Date(b.created_at) - new Date(a.created_at)))
      console.log(sorted);
      setAddresses(sorted);
      return
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddressSubmit = async () => {
    console.log(selectedAddress);
    setLoading(true)
    try {
      if (selectedAddress.type === "create") { cancelCurrentDefault() }
      const result = await axios.post(HOST_URL + '/api/user/address/set', selectedAddress, {
        headers: { Authorization: cookies.userToken },
      });
      console.log(result);
      await getAddresses();
      setLoading(false)
      setOpenEdit(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  };

  const deleteAddress = async (id) => {
    setLoading(true)

    try {
      const result = await axios.post(HOST_URL + '/api/user/address/set',
        {
          type: "delete",
          address_id: id,
        }, {
        headers: { Authorization: cookies.userToken },
      });
      console.log(result);
      await getAddresses();
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const cancelCurrentDefault = async () => {
    const index = addresses && addresses.findIndex(item => item.default_status === 1)
    await axios.post(HOST_URL + '/api/user/address/set',
      {
        type: "edit",
        address_id: addresses[index].id,
        default_status: 0
      }, {
      headers: { Authorization: cookies.userToken },
    });
  }

  const setDefault = async (id) => {
    console.log(selectedAddress);
    setLoading(true)

    try {
      ////// switch current default_status to 0
      cancelCurrentDefault()

      ////// switch selected address default_status to 1
      const result = await axios.post(HOST_URL + '/api/user/address/set',
        {
          type: "edit",
          address_id: id,
          default_status: 1
        }, {
        headers: { Authorization: cookies.userToken },
      });

      console.log(result);
      await getAddresses();
      setLoading(false)

    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('user')) router.push('/sign-in')
    else getAddresses()
  }, []);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  useEffect(() => {
    editedUser &&
      editedUser.first_name === user.first_name &&
      editedUser.last_name === user.last_name &&
      editedUser.phone === user.phone &&
      editedUser.email === user.email
      ? setDisableSave(true)
      : setDisableSave(false);
  }, [editedUser]);

  return (
    <div>

      <AddressEditModal
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        loading={loading}
        handleAddressSubmit={handleAddressSubmit}
        handleEditAddressChange={handleEditAddressChange}
        handleSave={handleSave}
        err={err}
        selectedAddress={selectedAddress}
      />

      {user && editedUser && (
        <CenteredFlex>
          <h1>Profile</h1>
          <Divider />
          <Form onSubmit={handleSave}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                required
                label="First name"
                placeholder="First name"
                value={editedUser.first_name}
                onChange={(e) => handleChange(e, 'first_name')}
                error={err && err.first_name}
              />

              <Form.Input
                fluid
                required
                label="Last name"
                placeholder="Last name"
                value={editedUser.last_name}
                onChange={(e) => handleChange(e, 'last_name')}
                error={err && err.last_name}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input
                fluid
                required
                label="Email"
                placeholder="Email"
                value={editedUser.email}
                onChange={(e) => handleChange(e, 'email')}
                error={err && err.email}
              />

              <Form.Input
                fluid
                required
                label="Phone Number"
                placeholder="Phone Number"
                value={editedUser.phone}
                onChange={(e) => handleChange(e, 'phone')}
                error={err && err.phone}
              />
            </Form.Group>
            <ButtonWrapper>
              <Button
                content={
                  saving ? (
                    <Icon name="spinner" loading style={{ margin: 0, width: 30 }} />
                  ) : (
                    'Save Changes'
                  )
                }
                disabled={disableSave}
                color="red"
              // onClick={() => handleSave()}
              />
              <Transition
                animation="swing right"
                duration={{ hide: 0, show: 1000 }}
                visible={visible}>
                <div>
                  <Icon name="check" color="green" /> saved!
                </div>
              </Transition>
            </ButtonWrapper>
          </Form>

          <h3>Address Book</h3>
          <Divider />
          <a style={{ marginBottom: 10, color: "green" }}
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
                          address.default_status !== 1 && setDefault(address.id)
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
                          address.default_status !== 1 && deleteAddress(address.id)
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

        </CenteredFlex>
      )}
    </div>
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
  border:  ${p => p.default === 1 ? "2px solid #f8cd98" : "1px solid #d3d1d1"};
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
  background-color: ${p => p.default === 1 ? "#f5b743" : "#e4e3e3"};
  color: ${p => p.default === 1 ? "white" : "black"};
  font-weight: bold;
  flex: 1;
  min-width: 56px;
`;
const CenteredFlex = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 900px;
  border: solid 1px #d4d3d3;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export default Profile;
