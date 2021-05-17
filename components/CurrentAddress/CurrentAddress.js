import styled from 'styled-components';
import { useIsMobile } from '../../util/useScreenSize';
import { useIsDesktop } from '../../util/useScreenSize';

import { Icon } from 'semantic-ui-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPosition as currentPositionAtom } from '../../data/atoms';

const CurrentAddress = () => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionAtom);

  return (
    <>
      {currentPosition && (
        <>
          <CurrentAddressContainer isMobile={isMobile}>
            <div>
              <Icon name="map marker alternate" size="large" style={{ marginRight: 10 }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <Address isMobile={isMobile}>
                <span style={{ fontSize: 12 }}>Your current address: </span>
                {isMobile && <br/>}
                <span> {currentPosition.address} </span>
              </Address>
            </div>
            <div>
              <Icon name="chevron down" style={{ marginLeft: 10 }} />
            </div>
          </CurrentAddressContainer>
        </>
      )}
    </>
  );
};

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
export default CurrentAddress;
