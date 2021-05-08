import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Divider, Form, Button, Icon, Transition } from 'semantic-ui-react';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../../data/userAtom';
import { useEffect } from 'react';
import validation from '../../util/validation';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);

  const [editedUser, setEditedUser] = useState("")
  const [disableSave, setDisableSave] = useState(true)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState({});


  const handleChange = (e, name) => {
    setVisible(false)
    setEditedUser(prev => ({ ...prev, [name]: e.target.value }))
  }

  const handleSave = () => {
    setLoading(true)
    setErr({})
    validation(editedUser)
    .then(async(res) => {
      console.log(res)
      await new Promise(resolve => setTimeout(resolve, 1000));
      // if successful
      setUser(editedUser)
      setVisible(true)
      setDisableSave(true)
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
      setErr(prev => ({ ...prev, ...err}))
    })
  }

  useEffect(() => {
    !localStorage.getItem('user') && router.push('/sign-in') 
  },[])

  useEffect(() => {
    setEditedUser(user)
  }, [user])

  useEffect(() => {
    editedUser && editedUser.firstName === user.firstName &&
      editedUser.lastName === user.lastName &&
      editedUser.phone === user.phone &&
      editedUser.email === user.email ?
      setDisableSave(true) : setDisableSave(false)
  }, [editedUser])

  return (
    <>{user && editedUser && <CenteredFlex>
      <h1>Profile</h1>
      <Divider />
      <Form onSubmit={handleSave}>
        <Form.Group widths='equal'>
          <Form.Input fluid required
            label='First name'
            placeholder='First name'
            value={editedUser.firstName}
            onChange={(e) => handleChange(e, "firstName")} 
            error={err.firstName}
            />

          <Form.Input fluid required
            label='Last name'
            placeholder='Last name'
            value={editedUser.lastName}
            onChange={(e) => handleChange(e, "lastName")} 
            error={err.lastName}
            />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input fluid required
            label='Email'
            placeholder='Email'
            value={editedUser.email}
            onChange={(e) => handleChange(e, "email")} 
            error={err.email}
            />

          <Form.Input fluid required
            label='Phone Number'
            placeholder='Phone Number'
            value={editedUser.phone}
            onChange={(e) => handleChange(e, "phone")} 
            error={err.phone}
            />
        </Form.Group>

        <ButtonWrapper>
          <Button 
          content={loading ? <Icon name="spinner" loading style={{margin: 0, width: 30}}/> : "Save"} 
          disabled={disableSave} color="red"
            // onClick={() => handleSave()}
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
