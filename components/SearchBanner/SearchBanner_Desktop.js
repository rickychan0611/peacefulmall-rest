import { useState } from 'react';
import { Button, Container, Icon, Image, Divider, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { useIsMobile } from '../../util/useScreenSize';

const SearchBanner_Desktop = ({ hide }) => {
  const isMobile = useIsMobile();
  const [ openMyLocation, setOpenMyLocation ] = useState(false)

  return (
    <BannerContainer className={hide}>
      {/* <BannerImage src="/rest-banner.jpg" /> */}
      <InputContainer style={{ display: 'flex' }}>
        <InputWrapper style={{ borderRadius: '5px 0 0 5px', borderRight: '1px solid #999696' }}>
          <Label style={{ borderRadius: '5px 0 0 5px' }}>
            <Icon name="map marker alternate" />
          </Label>
          <div style={{position: 'relative'}}>
            <StyledInput placeholder="Enter a location: address, city..." 
            onClick={()=>setOpenMyLocation(true)}
            onBlur={()=>setOpenMyLocation(false)}
            />
            {openMyLocation && <LocationDropDown>
              <div style={{color: "#5959df"}}><Icon name="location arrow" />My current Location</div>
            </LocationDropDown>}
          </div>
        </InputWrapper>

        <InputWrapper style={{ borderRadius: ' 0 5px 5px 0' }}>
          <StyledInput
            style={{ borderRadius: ' 0 5px 5px 0', marginRight: 5 }}
            placeholder="eg: restaurant, style, place..."
          />
          <Label style={{ borderRadius: ' 0 5px 5px 0' }}>
            <Icon name="search" />
          </Label>
        </InputWrapper>
      </InputContainer>
    </BannerContainer>
  );
};

const LocationDropDown = styled.div`
  position: absolute;
  z-index: 100000;
  background-color: white;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: grey;
  box-shadow: 0 0 10px grey;
`;
const BannerContainer = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: rgb(150, 178, 235);
  background: radial-gradient(circle, rgba(150, 178, 235, 1) 21%, rgba(215, 10, 52, 1) 100%);
`;

const InputContainer = styled(Container)`
  position: absolute;
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 0 5px 0 0; */
  color: grey;
  padding: 0 0 0 6px;
  height: 38px;
  font-size: 18px;
  background-color: #ebdbdb;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 38px;

  /* padding: 10px; */
`;

const StyledInput = styled.input`
  outline: none;
  border-radius: 0;
  border: 0;
  display: inline-block;
  font-size: 16px;
  width: 33vw;
  height: 38px;
  padding: 0 0 0 6px;
`;

export default SearchBanner_Desktop;
