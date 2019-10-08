import React, { Component } from 'react'
import { Form, Container, Segment, Button, Message } from 'semantic-ui-react'

class LoginPage extends Component {
  state = {username: 0, userpassword: false, loginError: false}

  handleChange = (e, {name, value }) => this.setState({[name]: value, loginError: false})

  submitSeva = (e) => {
    e.preventDefault()
    const {username, userpassword} = this.state
    if ( username === 'admin' && userpassword === 'admin') {
      this.props.history.push('/seva-billing')
    } else {
      this.setState({loginError: true})
    }
  }

  render () {
    const {loginError} = this.state
    return (
    <React.Fragment>
      <Container className='main-container'>
        <Segment>
        <h2>Login</h2>
        <Form>
          <Form.Field>
            <Form.Input name='username' onChange={this.handleChange} fluid label='Username' placeholder='Enter the username' />
          </Form.Field>
          <Form.Field>
            <Form.Input type='password' name='userpassword' onChange={this.handleChange} fluid label='Password' placeholder='Enter the password' />
          </Form.Field>

          <Button primary onClick={this.submitSeva} type='submit'>Submit</Button>

          {
            loginError &&
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
}

export default LoginPage
