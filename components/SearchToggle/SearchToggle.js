import { useRouter } from 'next/router';
import styled from 'styled-components';
import {} from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { openSideMenu as openSideMenuAtom } from '../../data/atoms.js';

const SearchToggle = ({ toggle, setToggle, shops, products }) => {
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);

  return (
    <>
      <Option
        toggle={toggle}
        onClick={() => {
          setToggle(!toggle);
        }}
        style={{ borderRadius: '10px 0 0 10px' }}>
        SHOPS ({shops.length})
      </Option>

      <Option
        toggle={!toggle}
        onClick={() => {
          setToggle(!toggle);
        }}
        style={{ borderRadius: '0 10px 10px 0' }}>
        ITEMS ({products.length})
      </Option>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 10px 15px 30px 15px;
  width: 100%;
`;
const Option = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 10px 15px 10px 15px;
  border: 1px solid #ee3160;
  /* border-radius: 10px; */
  background-color: ${(p) => (p.toggle ? 'white' : '#ee3160')};
  color: ${(p) => (p.toggle ? 'black' : 'white')};
  width: 50%;
  max-width: 250px;
`;

// const Option = styled.div`
// display: flex;
// flex-flow: row nowrap;
// justify-content: center;
// align-items: center;
// background-color: ${p => p.toggle ? "white" : "green"};
// width: 50%;
// `;

export default SearchToggle;
