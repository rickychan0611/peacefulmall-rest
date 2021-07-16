import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import { Divider, Icon, Button } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../../data/userAtom';
import { useCookies } from 'react-cookie';
import { useIsDesktop } from '../../util/useScreenSize';
import ProfileForm from '../../components/ProfileForm';
import AddressBook from '../../components/AddressBook';
import useTranslation from 'next-translate/useTranslation';
import { addresses as addressAtom } from '../../data/atoms';

const InviteCode = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies] = useCookies(null);
  const [addresses, setAddresses] = useRecoilState(addressAtom);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const isDesktop = useIsDesktop();
  const { t } = useTranslation('profile');
  const [loading, setLoading] = useState(false);
  const [disableSave, setDisableSave] = useState(false);

  const getAddressesQuery = async () => {
    try {
      const result = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/user/address', {
        headers: { Authorization: cookies.userToken }
      });
      // const sorted = result.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      console.log("address", result.data.data);
      setAddresses(result.data.data);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const getCode = async () => {
    setLoading(true)
    setDisableSave(true)
    try {
      const getCodeQuery = await axios.post(process.env.NEXT_PUBLIC_HOST_URL + '/api/user/dist/generatecode', {
        headers: { Authorization: cookies.userToken }
      })
      console.log("getCodeQuery", getCodeQuery);
      const getUser = await axios.get(process.env.NEXT_PUBLIC_HOST_URL + '/api/user/info', {
        headers: { Authorization: cookies.userToken }
      });
      console.log('USER DATA', getUser);
      localStorage.setItem('user', JSON.stringify(getUser.data.data));
      setUser(getUser.data.data);
      setLoading(false)
      setDisableSave(false)
    }
    catch (err) {
      console.log(err)
      setLoading(false)
      setDisableSave(false)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('user')) router.push('/sign-in');
    else getAddressesQuery();
  }, []);

  return (
    <>
      <h3>Invite Your Friends and Earn Reward Points!</h3>
      <Divider />
      <Button
        content={
          loading ? (
            <Icon name="spinner" loading style={{ margin: "0", width: 30 }} />
          ) : (
            <>Generate your invite Code</>
          )
        }
        disabled={disableSave}
        color="green"
        onClick={() => getCode()}
      />
    </>
  );
};

export default InviteCode;
