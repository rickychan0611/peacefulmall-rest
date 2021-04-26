import { set } from 'lodash';
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import validator from 'validator';
import passwordValidator from 'password-validator';

const SigningForms = ({ signUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({})
  const [err, setErr] = useState({})

  var schema = new passwordValidator();
  schema
    .is().min(6)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces

  const handleChange = (e, name) => {
    setInputs(prev => ({ ...prev, [name]: e.target.value }))
  }

  const validation = () => {
    new Promise((resolve, reject) => {
      if (!inputs.firstName) {
        signUp &&  reject()
      }
      if (!inputs.lastName) {
        signUp && reject()
      }
      if (!inputs.email) {
        reject()
      }
      if (!inputs.password) {
        reject()
      }
      if (!inputs.confirmPassword) {
        signUp && reject()
      }
      if (!validator.isEmail(inputs.email)) {
        setErr(prev => ({ ...prev, email: "Email address is not valid" }))
        reject()
      }
      if (!schema.validate(inputs.password)) {
        signUp && setErr(prev => ({ ...prev, password: "Must be at least 6 characters with 1 uppercase letter and 2 digits" }))
        signUp && reject()
      }if (inputs.password !== inputs.confirmPassword){
        signUp && setErr(prev => ({ ...prev, confirmPassword: "Password are not matching." }))
        signUp && reject()
      }
      else resolve()
    }).then(() => {
      console.log("signing in...")
      setErr(prev => ({ ...prev, submit: "signing in..." }))
    }).catch(() => {
      console.log("Not signing in")
    })
  }

  const handleSubmit = () => {
    validation()
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' textAlign='center' style={{ color: "#4ab976" }}>
          {signUp ? "Sign up an account" : "Log in to your account"}
        </Header>
        <Form size='large'>
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
            <Form.Input
              required
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              action={{
                icon: showPassword ? 'eye' : 'eye slash',
                basic: true,
                onClick: () => setShowPassword(!showPassword)
              }}
              value={inputs.password}
              onChange={e => handleChange(e, "password")}
              error={err.password}
            />
            {signUp &&
              <Form.Input
                required
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type={showPassword ? 'text' : 'password'}
                action={{
                  icon: showPassword ? 'eye' : 'eye slash',
                  basic: true,
                  onClick: () => setShowPassword(!showPassword)
                }}
                value={inputs.confirmPassword}
                onChange={e => handleChange(e, "confirmPassword")}
                error={err.confirmPassword}
              />
            }
            <Button style={{ backgroundColor: "#4ab976", color: "white" }} fluid size='large'
              content={signUp ? "Sign Up" : "Log In"}
              onClick={() => {
                setErr({})
                handleSubmit()
              }}
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

export default SigningForms