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

import ProfileForm from '../../components/ProfileForm';
import AddressBook from '../../components/AddressBook';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies] = useCookies(null);
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

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
  
useEffect(() => {
  if (!localStorage.getItem('user')) router.push('/sign-in')
  else getAddressesQuery()
}, []);

return (
  <div>

    {user && (
      <Container>
        <h1>Profile</h1>
        <Divider />
        <ProfileForm
          user={user}
          setVisible={setVisible}
          saveUserQuery={saveUserQuery}
          saving={saving}
          visible={visible}
        />

        <h3>Address Books</h3>
        <Divider />
        <AddressBook
          addresses={addresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          getAddressesQuery={getAddressesQuery}
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
