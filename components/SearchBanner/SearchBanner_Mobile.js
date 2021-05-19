import { useState } from 'react';
import { Button, Container, Icon, Image, Divider, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { useIsMobile } from '../../util/useScreenSize';
import { useRecoilState } from 'recoil';
import { currentPosition as currentPositionAtom } from '../../data/atoms';
import useTranslation from 'next-translate/useTranslation';

const SearchBanner_Mobile = ({ hide }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation('home');
  const [openLocationSearch, setOpenLocationSearch] = useState(false);
  const [openMyLocation, setOpenMyLocation] = useState(false);
  const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionAtom);
  return (
    <>
      <BannerContainer className={hide}>
        <InputContainer style={{ display: 'flex' }}>
          <InputWrapper style={{}}>
            <StyledInput
              placeholder={t("enterAddress")}
              onClick={() => setOpenLocationSearch(true)}
              onBlur={() => setOpenMyLocation(false)}
            />
            <Label style={{ borderRadius: ' 0 5px 5px 0' }}>
              <Icon name="search" />
            </Label>
          </InputWrapper>
        </InputContainer>
      </BannerContainer>

      {openLocationSearch && <BannerContainer className={hide}>

        <InputContainer style={{ display: 'flex' }}>
          <Icon name="close" style={{marginRight: 10, color: "white"}}
          onClick={()=>setOpenLocationSearch(false)}/>
          <InputWrapper >

            <div style={{ position: 'relative' }}>
              <StyledInput
              style={{width: "calc(80vw - 28px"}}
                placeholder={t("inputEg")}
                onClick={() => setOpenMyLocation(true)}
              />
              {openMyLocation && (
                <LocationDropDown>
                  <div style={{ color: '#5959df' }} 
                  onClick={() => {position()}}>
                    <Icon name="location arrow" />
                    My current Location
                  </div>
                  {JSON.stringify(currentPosition)}
                </LocationDropDown>
              )}
            </div>
            <Label style={{ borderRadius: ' 0 5px 5px 0' }}>
              <Icon name="map marker alternate" />
            </Label>
          </InputWrapper>
        </InputContainer>
      </BannerContainer>}
    </>
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
  height: 44px;
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
  height: 32px;
  font-size: 18px;
  background-color: #ebdbdb;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 32px;
  border-radius: 5px;
  /* padding: 10px; */
`;

const StyledInput = styled.input`
  outline: none;
  border-radius: 5px;
  border: 0;
  display: inline-block;
  font-size: 16px;
  width: 80vw;
  height: 32px;
  padding: 0 0 0 6px;
  margin-left: 5px;
`;

export default SearchBanner_Mobile;
