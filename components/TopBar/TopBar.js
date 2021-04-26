import { useRouter } from 'next/router';
import { Button, Dropdown, Menu, Container, Image, Icon } from 'semantic-ui-react';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';
import { useRecoilState } from 'recoil';
import { openSideMenu as openSideMenuAtom } from '../../data/atoms.js';

const options = [
  {
    key: 'Vancouver',
    text: 'Vancouver',
    value: 'Vancouver',
    content: 'Vancouver'
  },
  {
    key: 'Richmond',
    text: 'Richmond',
    value: 'Richmond',
    content: 'Richmond'
  },
  {
    key: 'Burnaby',
    text: 'Burnaby',
    value: 'Burnaby',
    content: 'Burnaby'
  },
  {
    key: 'Surrey',
    text: 'Surrey',
    value: 'Surrey',
    content: 'Surrey'
  },
  {
    key: 'Coquitlam',
    text: 'Coquitlam',
    value: 'Coquitlam',
    content: 'Coquitlam'
  }
];

const TopBar = () => {
  const router = useRouter();
  const isDesktop = useDesktopMediaQuery();
  const [openSideMenu, setOpenSideMenu] = useRecoilState(openSideMenuAtom);

  return (
    <div>
      <Menu
        style={{
          borderRadius: 0,
          margin: "-3px 0 0 0",
          position: 'fixed',
          zIndex: 100000,
          backgroundColor: 'white',
          width: "100vw",
          height: 60
        }}>
        <Menu.Item header as="a" onClick={() => router.push('/')}>
          <Image size="mini" src="/logo-p.png" />
          <h4 style={{ color: '#4ab976', margin: 0 }}>
            Peaceful Mall
            {isDesktop && <span style={{ color: '#ff614d' }}> | Restaurants</span>}
          </h4>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item header>
            <Icon size="large" name="map marker alternate" style={{ color: '#ff614d' }} />
            <Dropdown
              inline
              header="Choose a location"
              options={options}
              defaultValue={options[0].value}
            />
          </Menu.Item>

          <Menu.Item>
            {isDesktop ? (
              <>
                <Button compact inverted style={{ backgroundColor: '#ff614d', marginRight: 10, color: "white" }}
                onClick={()=>router.push('/sign-up')}
                >
                  Sign up
                </Button>
                <Button compact style={{ backgroundColor: 'white' }}
                onClick={()=>router.push('/sign-in')}>
                  Sign in
                </Button>
              </>
            ) : (
              <>
                <Icon
                  name="bars"
                  size="large"
                  style={{ color: '#707070' }}
                  onClick={() => {
                    setOpenSideMenu(!openSideMenu);
                  }}
                />
              </>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default TopBar;
