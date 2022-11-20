import React, { useState } from 'react'
import { Form, Container, Segment, Button, Message } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginState, setLoginState] = useState({username: '', userpassword: '', loginError: false});
  const navigate = useNavigate();

  const handleChange = (e, {name, value }) => setLoginState({...loginState, [name]: value, loginError: false})

  const submitSeva = (e) => {
    

    e.preventDefault()
    const {username, userpassword} = loginState
    if ( username === 'admin' && userpassword === 'admin') {
      navigate('/seva-billing')
    } else {
      setLoginState({...loginState, loginError: true})
    }
  }

    return (
    <React.Fragment>
      <Container className='main-container'>
        <Segment>
        <h2>Login</h2>
        <Form>
          <Form.Field>
            <Form.Input name='username' onChange={handleChange} fluid label='Username' placeholder='Enter the username' />
          </Form.Field>
          <Form.Field>
            <Form.Input type='password' name='userpassword' onChange={handleChange} fluid label='Password' placeholder='Enter the password' />
          </Form.Field>

          <Button primary onClick={submitSeva} type='submit'>Submit</Button>

          {
            loginState.loginError &&
              <Message negative>
                <Message.Header>Login unsuccessful. Please contact Admin for more details</Message.Header>
              </Message>
          }

        </Form>
        </Segment>
      </Container>
    </React.Fragment>
    )
  
}

export default LoginPage
