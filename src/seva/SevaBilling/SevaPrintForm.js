import React from 'react'
import moment from 'moment'

class ComponentToPrint extends React.Component {
  render() {
    const {printData} = this.props
    const {cost, sevaName, sevaDate, devoteeName, contactNum, nakshatra, gotra, sevaSubmitted} = printData
    return (
      <Container className='main-container' className={!sevaSubmitted ? 'hide-class' : ''}>
        <Segment>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input name='devoteeName' value={devoteeName} fluid label='Name of the Devotee' placeholder='Name of the Devotee' />
              </Grid.Column>
              <Grid.Column>
                <Form.Input name='contactNum' value={contactNum} fluid label='Contact Number' placeholder='Contact Number' />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column>
                <Form.Input fluid search selection name='sevaName' value={sevaName}  label='Seva Name' placeholder='Sevas' />
              </Grid.Column>
              <Grid.Column>
                <Form.Input name='cost' value={cost} fluid label='Amount' placeholder='Amount' />
              </Grid.Column>
              <Grid.Column>
                <Form.Input name='sevaDate' value={moment(sevaDate).format('YYYY-MM-DD')} fluid label='Seva Date' placeholder='Seva Date' />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column>
                <Form.Input search selection name='gotra' fluid search label='Gotra' value={gotra} placeholder='Gotra' />
              </Grid.Column>
              <Grid.Column>
                <Form.Input search selection value={nakshatra} name='nakshatra' fluid search label='Nakshatras' placeholder='Nakshatras' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default ComponentToPrint;