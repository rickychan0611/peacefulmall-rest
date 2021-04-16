import { Button, Dropdown, Menu, Container, Image, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

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

const TopBar = () => (
  <>
    <Menu secondary style={{ borderRadius: 0, margin: 0 }}>
      <Menu.Item header>
        <Image size="mini" src="/logo-p.png" /> 
        <h4 style={{color: "#4ab976", margin: 0}}>Peaceful Mall
        <span style={{color: "#ff614d"}}> | Restaurants</span>
        </h4>
      </Menu.Item>
      <Menu.Item header> 
      <Icon size='large' name='map marker alternate' style={{color: "#ff614d"}}/>
      <Dropdown inline
        header='Choose a location'
        options={options}
        defaultValue={options[0].value}/>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button compact inverted style={{backgroundColor: "#ff614d", marginRight: 10}}>Sign up</Button>
        <Button compact  style={{backgroundColor: "white"}}>Sign in</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </>
);

export default TopBar;
