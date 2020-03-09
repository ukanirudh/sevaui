import React, { Component } from 'react'
import { Container, Segment, Grid, Button, Message } from 'semantic-ui-react'
import AppHeader from './AppHeader'

class TriggerSms extends Component {
  state = {loading: false, smsTriggered: false}

  submitSeva = (e) => {
    e.preventDefault()
    this.setState({loading: true})

    if (!this.state.smsTriggered) {
      fetch('http://localhost:8085/SevaBilling/rest/Service/sms', {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.setState({loading: false, smsTriggered: true})
      })
    }
  }


  render () {
    const {smsTriggered, loading} = this.state
    return (
    <React.Fragment>
      <AppHeader />
      <Container className='main-container'>
        <Segment>
          <Grid centered>
            <Grid.Row centered columns={4}>
              <Grid.Column>
               <Button primary loading={loading} disabled={smsTriggered} onClick={this.submitSeva}>Trigger the Sms now for events happening after 2Days</Button>
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
