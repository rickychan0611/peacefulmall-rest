import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useIsMobile } from '../../util/useScreenSize';
import { useIsDesktop } from '../../util/useScreenSize';
import useTranslation from 'next-translate/useTranslation';
import { getAddressesQuery } from '../../pages/consumer/edit-profile';
import { Button, Divider, Icon, Radio } from 'semantic-ui-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentPosition as currentPositionAtom,
  addresses as addressAtom,
  useDefaultAddress as useDefaultAddressAtom
} from '../../data/atoms';
import LocationInput from '../LocationInput';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByLatLng
} from 'react-google-places-autocomplete';
import { HOST_URL } from '../../env';
import { useCookies } from 'react-cookie';
import { user as userAtom } from '../../data/userAtom';

const CurrentAddress = () => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionAtom);
  const { t } = useTranslation('home');
  const [openAddressMenu, setOpenAddressMenu] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(null);
  const [openNew, setOpenNew] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies] = useCookies(null);
  const [addresses, setAddresses] = useRecoilState(addressAtom);
  const [useDefaultAddress, setUseDefaultAddress] = useRecoilState(useDefaultAddressAtom);

  const addAddressQuery = async () => {
    console.log(value);
    setLoading(true);
    try {
      const results = await geocodeByAddress(value.label);
      const addadd = await axios.post(
        HOST_URL + '/api/user/address/set',
        {
          type: 'create',
          name: user.first_name + ' ' + user.last_name,
          detail_address:
            results[0].address_components[0].long_name +
            ' ' +
            results[0].address_components[1].long_name,
          city: results[0].address_components[2].long_name,
          province: results[0].address_components[4].long_name,
          country: results[0].address_components[5].long_name,
          post_code: results[0].address_components[6].long_name
        },
        { headers: { Authorization: cookies.userToken } }
      );
      console.log(addadd);
      const newAddresses = await axios.get(HOST_URL + '/api/user/address', {
        headers: { Authorization: cookies.userToken }
      });
      setAddresses(newAddresses.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    // geocodeByAddress(value.label)
    //     .then((results) => {
    //       console.log("address::" , results[0])
    //       console.log("address::" , results[0].address_components[0].long_name)
    //       getLatLng(results[0])})
    //     .then(({ lat, lng }) => {
    //       setCurrentPosition({ lat, lng, address: value.label });
    //       // router.push('/home')
    //       localStorage.setItem('currentPosition', JSON.stringify({ lat, lng, address: value.label }))
    //       console.log('Successfully got latitude and longitude', { lat, lng });
    //     })
    //     .catch((error) => {
    //       console.log("resstuot" , error)

    //       // router.push('/home')
    //       // setErr(error)
    //     })
  };

  return (
    <>
      {currentPosition && (
        <>
          <CurrentAddressContainer
            isMobile={isMobile}
            onClick={() => setOpenAddressMenu(!openAddressMenu)}>
            <div>
              <Icon name="map marker alternate" size="large" style={{ marginRight: 10 }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <Address isMobile={isMobile}>
                <span style={{ fontSize: 12 }}>{t('currentAddress')}</span>
                {isMobile && <br />}
                <span>
                  {' '}
                  {useDefaultAddress
                    ? useDefaultAddress.detail_address + ', ' + useDefaultAddress.city
                    : currentPosition.address}{' '}
                </span>
              </Address>
            </div>
            <div>
              <Icon
                name={openAddressMenu ? 'chevron up' : 'chevron down'}
                style={{ marginLeft: 10 }}
              />
            </div>
          </CurrentAddressContainer>
        </>
      )}

      {openAddressMenu && (
        <AddAddressContainer>
          <AddAddressMenu>
            <ChooseAddressContainer>
              {addresses &&
                addresses[0] &&
                addresses.map((address, i) => {
                  console.log(address);
                  return (
                    <div onClick={() => {
                      setUseDefaultAddress(address)
                      setOpenAddressMenu(false)
                      }}>
                      <H4 style={{ padding: 5 }}>
                        <Radio checked={address === useDefaultAddress} style={{marginRight: 7}}/>{address.detail_address},{' '}
                        {address.city}
                      </H4>
                      <Divider />
                    </div>
                  );
                })}
            </ChooseAddressContainer>
            <H4 style={{ marginBottom: 6 }} onClick={() => setOpenNew(!openNew)}>
              <a>+ Add a new address</a>
            </H4>
            {openNew && (
              <div>
                <IuputWrapper>
                  <LocationInput value={value} setValue={setValue} />
                </IuputWrapper>
                <Button
                  onClick={() => {
                    addAddressQuery();
                  }}>
                  Add address
                </Button>
              </div>
            )}
          </AddAddressMenu>
        </AddAddressContainer>
      )}
    </>
  );
};

const ChooseAddressContainer = styled.div`
  text-align: left;
  padding-top: 5px;
`;
const IuputWrapper = styled.div`
  border: 1px solid #d4d4d4;
  margin-bottom: 10px;
`;
const AddAddressContainer = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 5px;
`;
const AddAddressMenu = styled.div`
  background-color: white;
  justify-content: center;
  width: 94%;
  max-width: 500px;
  border: 1px solid #adadad;
  border-radius: 0px 0px 15px 15px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
`;
const CurrentAddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: ${(p) => (p.isMobile ? 'space-between' : 'center')};
  align-items: center;
  text-align: center;
  padding: 5px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 48px;
  padding: 0 10px 0 10px;
  border-bottom: 1px solid #b9b8b8;
  padding-bottom: 5px;
  padding-top: 3px;
  background-color: white;
  position: relative;
  cursor: pointer;
`;
const Address = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const H4 = styled.h4`
  margin: 0 0 10px 0;
`;
export default CurrentAddress;
