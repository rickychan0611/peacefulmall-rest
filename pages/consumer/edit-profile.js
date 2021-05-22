import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Divider, Form, Button, Icon, Transition, Modal, Header } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../../data/userAtom';
import { useEffect } from 'react';
import validation from '../../util/validation';
import { HOST_URL } from '../../env';
import { useCookies } from 'react-cookie';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies] = useCookies();
  const [editedUser, setEditedUser] = useState('');
  const [disableSave, setDisableSave] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({});
  const [addresses, setAddresses] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
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
    setSelectedAddress((prev) => ({ ...prev, [name]: e.target.value, type: "edit", address_id: selectedAddress.id }));
  };

  const handleAddressSubmit = async (e, name) => {
    console.log(selectedAddress);
    try {
    const result = await axios.post(HOST_URL + '/api/user/address/set', selectedAddress, {
      headers: { Authorization: cookies.userToken },
    });
    console.log(result)
  }catch (err) {
    console.log(err)
  }
  };

  useEffect(() => {
    !localStorage.getItem('user') && router.push('/sign-in');
  }, []);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  useEffect(async () => {
    try {
      const result = await axios.get(HOST_URL + '/api/user/address', {
        headers: { Authorization: cookies.userToken }
      });
      console.log(result.data);
      setAddresses(result.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

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
    <div style={{ height: '100vh' }}>
      {/* Edit address model */}
      <Modal
        closeIcon
        size="mini"
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onOpen={() => setOpenEdit(true)}>
        <Header content="Edit Address" />
        <Modal.Content>
          <Form onSubmit={handleSave}>
            <Form.Input
              fluid
              required
              label="Receiver's name"
              placeholder="Receiver's name"
              value={selectedAddress && selectedAddress.name}
              onChange={(e) => {
                handleEditAddressChange(e, 'name');
              }}
              error={err.first_name}
            />
            <Form.Input
              fluid
              required
              label="Phone Number"
              placeholder="Phone Number"
              value={selectedAddress && selectedAddress.name}
              onChange={(e) => {
                handleEditAddressChange(e, 'phone');
              }}
              error={err.first_name}
            />
            <Form.Input
              fluid
              required
              label="Address"
              placeholder="Address"
              value={selectedAddress && selectedAddress.detail_address}
              onChange={(e) => {
                handleEditAddressChange(e, 'detail_address');
              }}
              error={err.first_name}
            />
            <Form.Input
              fluid
              required
              label="City"
              placeholder="City"
              value={selectedAddress && selectedAddress.city}
              onChange={(e) => {
                handleEditAddressChange(e, 'city');
              }}
              error={err.first_name}
            />
            <Form.Input
              fluid
              required
              label="Country"
              placeholder="Country"
              value={selectedAddress && selectedAddress.country}
              onChange={(e) => {
                handleEditAddressChange(e, 'country');
              }}
              error={err.first_name}
            />
            <Form.Input
              fluid
              required
              label="Post Code"
              placeholder="Post Code"
              value={selectedAddress && selectedAddress.post_code}
              onChange={(e) => {
                handleEditAddressChange(e, 'post_code');
              }}
              error={err.first_name}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenEdit(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" onClick={() => handleAddressSubmit(false)}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>

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
                error={err.first_name}
              />

              <Form.Input
                fluid
                required
                label="Last name"
                placeholder="Last name"
                value={editedUser.last_name}
                onChange={(e) => handleChange(e, 'last_name')}
                error={err.last_name}
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
                error={err.email}
              />

              <Form.Input
                fluid
                required
                label="Phone Number"
                placeholder="Phone Number"
                value={editedUser.phone}
                onChange={(e) => handleChange(e, 'phone')}
                error={err.phone}
              />
            </Form.Group>

            <h3>Address Book</h3>
            <AddressContainer>
              {addresses &&
                addresses[0] &&
                addresses.map((address, i) => {
                  return (
                    <AddressCard>
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
                        <AddressButton>Default</AddressButton>
                        <AddressButton
                          onClick={() => {
                            setSelectedAddress(address);
                            setOpenEdit(true);
                          }}>
                          Edit
                        </AddressButton>
                        <AddressButton>Delete</AddressButton>
                      </Row>
                    </AddressCard>
                  );
                })}
            </AddressContainer>

            <ButtonWrapper>
              <Button
                content={
                  loading ? (
                    <Icon name="spinner" loading style={{ margin: 0, width: 30 }} />
                  ) : (
                    'Save'
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
        </CenteredFlex>
      )}
    </div>
  );
};

const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;
const AddressButton = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 5px 8px 5px 8px;
  border-radius: 5px;
  border: 1px solid #d3d1d1;
  cursor: pointer;
  font-size: 12px;
  background-color: #e4e3e3;
`;
const AddressCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  min-width: 200px;
  max-width: 20vw;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #d3d1d1;
  margin-right: 10px;
  margin-bottom: 10px;
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
