import { useState } from 'react';
import { Dropdown, Icon, Input, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { openCheckOutList as openCheckOutListAtom } from '../../data/atoms.js';
import CheckOutList from '../CheckOutList/'

const CheckOutListPusher = ({ children }) => {
  const [openCheckOutList, setOpenCheckOutList] = useRecoilState(openCheckOutListAtom);
  return (
    <>
      <Sidebar.Pushable style={{ transform: 'none'}}>
        <CheckOutList />
        <Sidebar.Pusher>
          {children}
          </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

export default CheckOutListPusher;
