import { Container, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';

const SearchBanner_Mobile = ({ setOpenModal, value }) => {
  const { t } = useTranslation('home');
  return (
    <>
      <BannerContainer>
        <InputContainer style={{ display: 'flex' }}>
          <InputWrapper>
            <InputBox placeholder={t('enterAddress')} onClick={() => setOpenModal(true)}>
              {value ? value : "Search restaurants or food"}
            </InputBox>
            <Label style={{ borderRadius: ' 0 5px 5px 0' }}>
              <Icon name="search" />
            </Label>
          </InputWrapper>
        </InputContainer>
      </BannerContainer>
    </>
  );
};

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

const InputBox = styled.div`  
max-width: 800px;
  outline: none;
  border-radius: 5px;
  border: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 16px;
  width: 80vw;
  height: 32px;
  padding: 0 0 0 6px;
  margin-left: 5px;
  cursor: text;
`;

export default SearchBanner_Mobile;
