import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment, Icon, Input, Label } from 'semantic-ui-react'
// import validator from 'validator';
import validation from '../../util/validation';

import styled from 'styled-components';
import { useCookies } from 'react-cookie';

import { useRecoilState } from 'recoil';
import { user as userAtom, userdata } from '../../data/userAtom';
import { set } from 'lodash-es';

const SigningForms = ({ signUp }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({});
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleSignUp = async () => {
    console.log("Signing UP..")
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("await Signing UP..")
    setCookie("userToken", "123456789", { maxAge: 1000 * 60 * 24 })
    localStorage.setItem('user', JSON.stringify(userdata));
    setUser(userdata)
    setLoading(false);
    router.push('/')
  }

  const handleSignIn = async () => {
    console.log("Signing IN..")
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("await Signing IN..")
    setCookie("userToken", "123456789", { maxAge: 1000 * 60 * 24 })
    localStorage.setItem('user', JSON.stringify(userdata));
    setUser(userdata)
    setLoading(false);
    router.push('/')
  }

  const handleSubmit = () => {
    setErr({})

    validation(inputs)
    .then(() => {
      signUp ? handleSignUp() : handleSignIn()
    })
    .catch((err) => {
      setErr(prev => ({ ...prev, ...err}))
    })
  }

  const handleChange = (e, name) => {
    setInputs(prev => ({ ...prev, [name]: e.target.value }))
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' textAlign='center' style={{ color: "#4ab976" }}>
          {signUp ? "Sign up an account" : "Log in to your account"}
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            {signUp && <>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Fist Name'
                required
                value={inputs.firstName}
                onChange={e => handleChange(e, "firstName")}
              />
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Last Name'
                required
                value={inputs.lastName}
                onChange={e => handleChange(e, "lastName")}
              />
            </>}
            <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address'
              required
              value={inputs.email}
              onChange={e => handleChange(e, "email")}
              error={err.email}
            />
            {signUp &&
              <Form.Input fluid icon='phone' iconPosition='left' placeholder='Phone Number (10 digits only)'
                required
                value={inputs.phone}
                onChange={e => handleChange(e, "phone")}
                error={err.phone}
                maxLength="10"
              />}
            <PasswordWrapper>
              <Input
                required
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                label={{
                  content: <Icon name={showPassword ? 'eye' : 'eye slash'} />,
                  basic: true,
                  onClick: () => setShowPassword(!showPassword),
                }}
                labelPosition='right'
                value={inputs.password}
                onChange={e => handleChange(e, "password")}
              />
              {err.password &&
                <Label basic color='red' pointing style={{ borderRadius: 5 }}
                  content={err.password} />}
            </PasswordWrapper>

            {signUp &&
              <PasswordWrapper>
                <Input
                  required
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type={showPassword ? 'text' : 'password'}
                  label={{
                    content: <Icon name={showPassword ? 'eye' : 'eye slash'} />,
                    basic: true,
                    onClick: () => setShowPassword(!showPassword),
                  }}
                  labelPosition='right'
                  value={inputs.confirmPassword}
                  onChange={e => handleChange(e, "confirmPassword")}
                />
                {err.confirmPassword &&
                  <Label basic color='red' pointing style={{ borderRadius: 5 }}
                    content={err.confirmPassword} />}
              </PasswordWrapper>
            }
            <Button type='submit'
              // loading={loading}
              style={{ backgroundColor: "#4ab976", color: "white" }}
              fluid size='large'
              content={!loading ? signUp ? "Sign Up" : "Log In" : <Icon name="spinner" loading />}
            >
            </Button>
            <Message negative size='mini' hidden={!err.submit}>{err.submit}</Message>
          </Segment>
        </Form>
        {signUp ?
          <Message>Already Registered? <Link href='/sign-in'>Sign In</Link> </Message> :
          <Message>New to Peaceful Mall? <Link href='/sign-up'>Sign Up</Link> </Message>
        }
      </Grid.Column>
    </Grid>
  )
}

const PasswordWrapper = styled.div`
  margin-bottom: 15px; 
  .button {
    padding : 0 10px 0 10px;
  }
  .icon {
    margin: 0 !important;
  }
  .label {
    border-left : none;
    border-radius : 0 5px 5px 0;
  }
`;
export default SigningForms