import { Button, Container, Icon, Image, Divider } from 'semantic-ui-react';
import styled from 'styled-components';

const SearchBanner = ({ hide }) => {

  return (
    <BannerContainer className={hide}>
      {/* <BannerImage src="/rest-banner.jpg" /> */}
      <InputContainer style={{ display: 'flex' }}>
        {!isMobile && <Icon size="large" name="map marker alternate" style={{ color: 'white' }} />}
        <InputWrapper style={{ borderRadius: '5px 0 0 5px', borderRight: '1px solid #b8b8b8' }}>
          <Label style={{ margin: 0 }}>Near</Label>
          <StyledInput placeholder="Vanoucver, B,C" />
        </InputWrapper>
        <InputWrapper>
          <Label style={{ margin: 0 }}>Find</Label>
          <StyledInput placeholder="Restaurant, Style, place..." />
        </InputWrapper>
        <Button
          icon="search"
          style={{
            backgroundColor: 'white',
            color: 'red',
            width: 40,
            height: 43,
            borderRadius: '0 5px 5px 0'
          }}
        />
      </InputContainer>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: rgb(150, 178, 235);
  background: radial-gradient(circle, rgba(150, 178, 235, 1) 21%, rgba(215, 10, 52, 1) 100%);
`;

const BannerImage = styled(Image)`
  width: 100vw;
  height: auto;
  position: absolute;
  top: 0;
`;

const InputContainer = styled(Container)`
  position: absolute;
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.h4`
  margin: 0;
  color: grey;
  padding: 0 10px 0 10px;
  font-size: 18px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px;
`;

const StyledInput = styled.input`
  outline: none;
  border-radius: 0;
  border: 0;
  display: inline-block;
  font-size: 16px;
  width: 20vw;
`;

export default SearchBanner;
