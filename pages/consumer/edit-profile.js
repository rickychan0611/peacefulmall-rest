import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import { Divider, Icon } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../../data/userAtom';
import { HOST_URL } from '../../env';
import { useCookies } from 'react-cookie';
import { useIsDesktop } from '../../util/useScreenSize';
import ProfileForm from '../../components/ProfileForm';
import AddressBook from '../../components/AddressBook';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies] = useCookies(null);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const isDesktop = useIsDesktop();

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
  <div style={{minHeight: "calc(100vh - 80px)"}}>

    {user && (
      <Container isDesktop={isDesktop}>
        <h1>Profile</h1>
        <Divider />
        <ProfileForm />

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
  border: ${p => p.isDesktop && "solid 1px #d4d3d3"};
`;

export default Profile;
