import { useState } from 'react';
import { useRouter } from 'next/router'
import { Button, Icon, Message, Divider, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { useIsMobile, useIsDesktop } from '../util/useScreenSize';
import { useRecoilState } from 'recoil';
import { currentPosition as currentPositionAtom } from '../data/atoms';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-google-places-autocomplete';
import { MAP_API } from '../env';

const home = ({ hide }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionAtom);
  const [value, setValue] = useState(null);
  const [err, setErr] = useState(null);

  const handleSubmit = () => {
    setErr()
    if (!value) {
      setErr("Please enter an address")
    }
    else {
      geocodeByAddress(value.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setCurrentPosition({ lat, lng, address: value.label });
          router.push('/home')
          console.log('Successfully got latitude and longitude', { lat, lng });
        })
        .catch((error) => {
          setErr(error)
        })
    }
  };

  return (
    <>
      <Container isDesktop={isDesktop}>
        <Text isMobile={isMobile}>We Deliver the Best Food to You!</Text>
        <InputIconWrapper>
          <Label style={{ borderRadius: ' 25px 0 0 25px' }} onClick={() => handleSubmit()}>
            <Icon name="map marker alternate" />
          </Label>
          <div style={{ position: 'relative', width: '100%' }} >
            <GooglePlacesAutocomplete
              apiKey={MAP_API}
              minLengthAutocomplete={4}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ['ca']
                }
              }}
              selectProps={{
                placeholder: 'Enter your address',
                value,
                onChange: setValue,
                styles: {
                  input: (provided) => ({
                    ...provided,
                    border: 'none'
                  }),
                  control: (provided) => ({
                    ...provided,
                    borderColor: 'white',
                    boxShadow: 'none'
                  })
                }
              }}
            />
          </div>
        </InputIconWrapper>
        <Column>
        <SignButton
          style={{ backgroundColor: '#ff614d', color: 'white', borderRadius: 25, width: "80vw", maxWidth: 300 }}
          onClick={() => handleSubmit()}>
          GO!
        </SignButton>
        {err && <Message compact negative size="mini" style={{ width: "70vw", maxWidth: 390, textAlign: "center" }}>Error: {err}</Message>}
        </Column>
      </Container>
    </>
  );
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 90px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-image: ${p => p.isDesktop ? "url('/slash-desktop.jpeg')" : "url('/slash-mobile.jpg')"};
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding-bottom: 30px;
`;
const Text = styled.div`
  font-size: ${p => p.isMobile ? "3rem" : "4rem"};
  font-weight: bold;
  color: white;
  text-shadow: 0 0 15px black;
  text-align: center;
  padding: 0px 20px 0px 20px;
  line-height: normal;
  margin-bottom: 50px;
`;
const SignButton = styled(Button)`
  width: 200px;
  box-shadow: 0 0 15px white;
`;
const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 0 5px 0 0; */
  color: grey;
  padding: 0 0 0 6px;
  height: 42px;
  font-size: 18px;
  background-color: #ffffff;
`;

const InputIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  height: 42px;
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 40px;
  box-shadow: 0 0 15px black;
  width: 80vw;
  max-width: 500px;
`;

const InputBox = styled.input`
  outline: none;
  border-radius: 25px;
  border: 0;
  display: inline-block;
  font-size: 16px;
  width: 80vw;
  height: 42px;
  padding: 0 0 0 6px;
  margin-left: 5px;
`;

export default home;
