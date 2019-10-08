import React, { Component } from 'react'
import { Container, Segment, Menu, Grid, Button, Message } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class TriggerSms extends Component {
  state = {loading: false, smsTriggered: false}

  submitSeva = (e) => {
    e.preventDefault()
    this.setState({loading: true})

    if (!sevaSubmitted) {
      fetch('http://localhost:8085/SevaBilling/rest/Service/sms', {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        this.setState({loading: false, smsTriggered: true})
      })
    }
  }


  render () {
    console.log('latest package-21sept')
    const {smsTriggered, loading} = this.state
    return (
    <React.Fragment>
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item name='home'> <NavLink to='/seva-billing'>Add Seva</NavLink> </Menu.Item>
          <Menu.Item name='Events Calendar'> <NavLink to='/events-calendar'>Events Calendar</NavLink> </Menu.Item>
          <Menu.Item name='Seva Reorts'> <NavLink to='/seva-report'>Seva Reorts</NavLink> </Menu.Item>
          <Menu.Item name='Trigger SMS'> <NavLink to='/trigger-sms'>Trigger SMS</NavLink> </Menu.Item>
        </Menu>
      </Segment>

      <Container className='main-container'>
        <Segment>
          <Grid centered>
            <Grid.Row centered columns={4}>
              <Grid.Column>
               <Button primary loading={loading} disabled={smsTriggered} onClick={this.submitSeva}>Submit</Button>
               {
                 smsTriggered &&
                   <Message positive>
                     <Message.Header>Seva Created Successfully</Message.Header>
                   </Message>
               }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </React.Fragment>
    )
  }
}

export default TriggerSms
