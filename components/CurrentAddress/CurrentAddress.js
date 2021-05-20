import { useState } from 'react';
import styled from 'styled-components';
import { useIsMobile } from '../../util/useScreenSize';
import { useIsDesktop } from '../../util/useScreenSize';
import useTranslation from 'next-translate/useTranslation';

import { Button, Divider, Icon } from 'semantic-ui-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPosition as currentPositionAtom } from '../../data/atoms';
import LocationInput from '../LocationInput';

const CurrentAddress = () => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionAtom);
  const { t } = useTranslation('home');
  const [openAddressMenu, setOpenAddressMenu] = useState(false);

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
                <span> {currentPosition.address} </span>
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
            <Divider />
            <H4>Add a new address</H4>
            <IuputWrapper>
              <LocationInput />
            </IuputWrapper>
            <Button>Add address</Button>
          </AddAddressMenu>
        </AddAddressContainer>
      )}
    </>
  );
};

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
