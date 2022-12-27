import React, { Component } from 'react'
import { Form, Container, Segment, Grid, Button, Message } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import AppHeader from '../AppHeader'

import { collection, addDoc } from "firebase/firestore"
import { db, EXPENSES_ENDPOINT } from '../../firebaseConfigs';

class Expenses extends Component {
  state = {amount: 0, sevaSubmitted: false, loading: false, description: '', paidTo: ''}

  handleSevaDateChange = (date) => this.setState({paymentDate: date})

  handleChange = (e, {name, value }) => this.setState({[name]: value})

  newSeva = () => window.location.reload()

  submitSeva = async (e) => {
    e.preventDefault()
    const {paymentDate, sevaSubmitted, description, paidTo, amount} = this.state;
    const paymentDateFormatted = moment(paymentDate).format('YYYY-MM-DD');
    const expenseData = Object.assign({}, {paymentDate: paymentDateFormatted, description, paidTo, amount: parseFloat(amount)});

    this.setState({loading: true})
    
    if (!sevaSubmitted) {
      try {
        const docRef = await addDoc(collection(db, EXPENSES_ENDPOINT), expenseData)
      } catch (err) {
        console.log(err);
      }
  
      this.setState({sevaSubmitted: true, loading: false})
      
    }
  }

  render () {
    const {amount, sevaName, paymentDate, sevaSubmitted, loading} = this.state
    return (
    <React.Fragment>
      <AppHeader />

      <Container className=''>
        <Segment>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input disabled={sevaSubmitted} name='paidTo' onChange={this.handleChange} fluid label='Paid to' placeholder='Paid to' />
              </Grid.Column>
              <Grid.Column>
                <Form.Input disabled={sevaSubmitted} name='description' onChange={this.handleChange} fluid label='Payment Description' placeholder='Payment Description' />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input
                  type='number'
                  name='amount'
                  disabled={sevaSubmitted}
                  onChange={this.handleChange} 
                  fluid label='Amount'
                  placeholder='Amount'
                  value={amount}
                />
              </Grid.Column>
              <Grid.Column>
                <label className='form-label-custom'> Payment Date </label>
                <DatePicker
                  disabled={sevaSubmitted}
                  selected={paymentDate}
                  onChange={this.handleSevaDateChange}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                {sevaSubmitted ? <Button primary onClick={this.newSeva}>Add another Expense</Button> : <Button loading={loading} primary onClick={this.submitSeva}>Submit</Button>}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {
            sevaSubmitted &&
              <Message positive>
                <Message.Header>Your Expense has been added</Message.Header>
              </Message>
          }

        </Segment>
      </Container>
    </React.Fragment>
    )
  }
}

export default Expenses
