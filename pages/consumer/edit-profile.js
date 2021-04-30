import { useState } from 'react';
import styled from 'styled-components';
import { Divider, Form, Button, Icon, Transition } from 'semantic-ui-react';
import { useDesktopMediaQuery } from '../../components/Responsive/Responsive';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../../data/userAtom';
import { useEffect } from 'react';

const Profile = () => {
  const isDesktop = useDesktopMediaQuery();
  const [user, setUser] = useRecoilState(userAtom);

  const [changeUser, setChangeUser] = useState("")
  const [disableSave, setDisableSave] = useState(true)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e, name) => {
    setVisible(false)
    setChangeUser(prev => ({ ...prev, [name]: e.target.value }))
  }

  const handleSave = async() => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000));
    // if successful
    setUser(changeUser)
    setVisible(true)
    setDisableSave(true)
    setLoading(false)
  }

  useEffect(() => {
    setChangeUser(user)
  }, [user])

  useEffect(() => {
    changeUser && changeUser.firstName === user.firstName &&
      changeUser.lastName === user.lastName &&
      changeUser.phone === user.phone &&
      changeUser.email === user.email ?
      setDisableSave(true) : setDisableSave(false)
  }, [changeUser])

  return (
    <>{user && changeUser && <CenteredFlex>
      <h1>Profile</h1>
      <Divider />
      <Form>

        <Form.Group widths='equal'>
          <Form.Input fluid
            label='First name'
            placeholder='First name'
            value={changeUser.firstName}
            onChange={(e) => handleChange(e, "firstName")} />

          <Form.Input fluid
            label='Last name'
            placeholder='Last name'
            value={changeUser.lastName}
            onChange={(e) => handleChange(e, "lastName")} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input fluid
            label='Email'
            placeholder='Email'
            value={changeUser.email}
            onChange={(e) => handleChange(e, "email")} />

          <Form.Input fluid
            label='Phone Number'
            placeholder='Phone Number'
            value={changeUser.phone}
            onChange={(e) => handleChange(e, "phone")} />
        </Form.Group>

        <ButtonWrapper>
          <Button 
          content={loading ? <Icon name="spinner" loading style={{margin: 0, width: 30}}/> : "Save"} 
          disabled={disableSave} color="red"
            onClick={() => handleSave()}
          />
          <Transition animation='swing right' duration={{hide: 0, show: 1000}} visible={visible}>
            <div><Icon name="check" color="green" /> saved!</div>
            </Transition>
        </ButtonWrapper>
      </Form>
    </CenteredFlex>
    }</>
  );
};

const CenteredFlex = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 900px;
  border: solid 1px #d4d3d3;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export default Profile;
