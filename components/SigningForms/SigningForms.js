import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Button, Form, Grid, Header, Message, Segment, Icon, Input, Label } from 'semantic-ui-react'
// import validator from 'validator';
import validation from '../../util/validation';

import styled from 'styled-components';
import { useCookies } from 'react-cookie';

import { useRecoilState } from 'recoil';
import { user as userAtom, userdata } from '../../data/userAtom';
import useTranslation from 'next-translate/useTranslation';

const SigningForms = ({ signUp }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({});
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [cookies, setCookie, removeCookie] = useCookies();
  const { t } = useTranslation('home');

  const handleSignUp = async () => {
    console.log("Signing UP..")
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000));
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
    await new Promise(resolve => setTimeout(resolve, 1000));
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
      console.log(err)
      setErr(prev => ({ ...prev, ...err}))
    })
  }

  const handleChange = (e, name) => {
    setInputs(prev => ({ ...prev, [name]: e.target.value }))
  }

  useEffect(() => {
    console.log(localStorage.getItem('user'))
    localStorage.getItem('user') && router.push('/') 
  },[])

  return (
    <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' textAlign='center' style={{ color: "#292929" }}>
          {signUp ? t("signUPAccount") : t("LogInAccount")}
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            {signUp && <>
              <Form.Input fluid icon='user' iconPosition='left' placeholder={t("FirstName")}
                required
                value={inputs.firstName}
                onChange={e => handleChange(e, "firstName")}
              />
              <Form.Input fluid icon='user' iconPosition='left' placeholder={t("LastName")}
                required
                value={inputs.lastName}
                onChange={e => handleChange(e, "lastName")}
              />
            </>}
            <Form.Input fluid icon='mail' iconPosition='left' placeholder={t("Email")}
              required
              value={inputs.email}
              onChange={e => handleChange(e, "email")}
              error={err.email}
            />
            {signUp &&
              <Form.Input fluid icon='phone' iconPosition='left' placeholder={t("Phone")}
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
                placeholder={t("Password")}
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
                  placeholder={t("ConfirmPassword")}
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
              style={{ backgroundColor: "#ff614d", color: "white" }}
              fluid size='large'
              content={!loading ? signUp ? t("signUPAccount") : t("LogInAccount") : <Icon name="spinner" loading />}
            >
            </Button>
            <Message negative size='mini' hidden={!err.submit}>{err.submit}</Message>
          </Segment>
        </Form>
        {signUp ?
          <Message>{t("AlreadyRegistered")}<Link href='/sign-in'>{t("LogInAccount")}</Link> </Message> :
          <Message>{t("NewtoPeacefulMall")}<Link href='/sign-up'>{t("signUPAccount")}</Link> </Message>
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