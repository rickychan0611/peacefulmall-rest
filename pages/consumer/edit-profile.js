import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Divider, Icon } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../../data/userAtom';
import { useEffect } from 'react';
import validation from '../../util/validation';
import { HOST_URL } from '../../env';
import { useCookies } from 'react-cookie';

import AddressEditModal from '../../components/AddressEditModal';
import ProfileForm from '../../components/ProfileForm';
import AddressBook from '../../components/AddressBook';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies] = useCookies(null);
  const [editedUser, setEditedUser] = useState(null);
  const [disableSave, setDisableSave] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const saveUserQuery = () => {
    setLoading(true);
    setErr(null);
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

  const getAddressesQuery = async () => {
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

  const saveAddressQuery = async () => {
    console.log(selectedAddress);
    setLoading(true)
    try {
      if (selectedAddress.type === "create") { cancelCurrentDefaultQuery() }
      const result = await axios.post(HOST_URL + '/api/user/address/set', selectedAddress, {
        headers: { Authorization: cookies.userToken },
      });
      console.log(result);
      await getAddressesQuery();
      setLoading(false)
      setOpenEdit(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  };

  const deleteAddressQuery = async (id) => {
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
      await getAddressesQuery();
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const cancelCurrentDefaultQuery = async () => {
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

  const setDefaultQuery = async (id) => {
    console.log(selectedAddress);
    setLoading(true)

    try {
      cancelCurrentDefaultQuery()
      await axios.post(HOST_URL + '/api/user/address/set',
        {
          type: "edit",
          address_id: id,
          default_status: 1
        }, {
        headers: { Authorization: cookies.userToken },
      });

      await getAddressesQuery();
      setLoading(false)

    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('user')) router.push('/sign-in')
    else getAddressesQuery()
  }, []);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  useEffect(() => {
    ///// disable save changes button
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
        saveAddressQuery={saveAddressQuery}
        err={err}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />

      {user && editedUser && (
        <Container>
          <h1>Profile</h1>
          <Divider />
          <ProfileForm
            editedUser={editedUser}
            setEditedUser={setEditedUser}
            setVisible={setVisible}
            saveUserQuery={saveUserQuery}
            err={err}
            saving={saving}
            disableSave={disableSave}
            visible={visible}
          />

          <h3>Address Books</h3>
          <Divider />
          <AddressBook
            setOpenEdit={setOpenEdit}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            addresses={addresses}
            loading={loading}
            setDefaultQuery={setDefaultQuery}
            deleteAddressQuery={deleteAddressQuery}
          />

        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 900px;
  border: solid 1px #d4d3d3;
`;

export default Profile;
