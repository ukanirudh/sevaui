import React, { Component } from 'react'
import { Form, Container, Segment, Menu, Dropdown, Grid, Button, Message } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import SevaPrintFormat from './SevaPrintFormat'

/*Constants import*/
import gotraOptions from '../../static/data/gotra'
import nakshatrasOptions from '../../static/data/nakshatras'
import sevas from '../../static/data/sevaTypes'

const mapNameToStateProps = {
  'gotra': 'allGotras',
  'nakshatra': 'allNakshatras',
  'sevaName': 'allSevas'
}

class FormExampleSubcomponentControl extends Component {
  state = {cost: 0, sevaSubmitted: false, loading: false, allSevas: sevas, allGotras: gotraOptions, allNakshatras: nakshatrasOptions}

  handleAddition = (e, { name, value }) => {
    const stateElementToBeUpdated = mapNameToStateProps[name]
    this.setState((prevState) => ({
      [stateElementToBeUpdated]: [{ text: value, value }, ...prevState[mapNameToStateProps[name]]],
      [name]: value
    }))
  }

  handleChange = (e, {name, value }) => this.setState({[name]: value})

  handleSevaDateChange = (date) => this.setState({sevaDate: date})

  onSevaSelect = (e, data) => {
    const {name, value} = data
    const selectedSeva = this.state.allSevas.filter((seva) => seva.value === value)
    if (selectedSeva[0]) {
      this.setState({cost: selectedSeva[0].amount, [name]: value})
    }
  }

  newSeva = () => window.location.reload()

  submitSeva = (e) => {
    e.preventDefault()
    const {sevaDate, sevaSubmitted} = this.state
    const sevaDateFormatted = moment(sevaDate).format('YYYY-MM-DD')
    let sevaData = {...this.state}
    sevaData = Object.assign(sevaData, {sevaDate: sevaDateFormatted})
    console.log(sevaData)

    this.setState({loading: true})
    if (!sevaSubmitted) {
      fetch('http://localhost:8085/SevaBilling/rest/Service/seva', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(sevaData)
      }).then((response) => response.json()).then((response) => {
        const {data} = response
        this.setState({sevaSubmitted: true, loading: false, id: data})
      })
    }

    /*For testing purpose, uncomment this*/
    //this.setState({sevaSubmitted: true, loading: false})
  }

  renderPrintPage = () => {
    var content = document.getElementById("divcontents");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.outerHTML);
    pri.document.close();


    var css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(document.createTextNode('.print-container { position: relative; } .bill-no-main { position: absolute; top: 145px; left: 530px; } .bill-date-main { position: absolute; top: 145px; left: 900px; } .devotee-name-main { position: absolute; top: 190px; left: 560px; } .cost-main { position: absolute; top: 230px; left: 520px; } .gotra-main { position: absolute; top: 300px; left: 540px; } .nakshatra-main { position: absolute; top: 300px; left: 850px; } .seva-name-main { position: absolute; top: 345px; left: 580px } .seva-date-main { position: absolute; top: 345px; left: 900px; } .cost-main-2 { position: absolute; top: 405px; left: 540px; } .contact-num-main { position: absolute; top: 150px; left: 200px } /*Secondary print configuration*/ .bill-no-sec { position: absolute; top: 145px; left: 130px; } .bill-date-sec { position: absolute; top: 145px; left: 300px; } .devotee-name-sec { position: absolute; top: 190px; left: 160px; } .cost-sec { position: absolute; top: 230px; left: 120px; } .gotra-sec { position: absolute; top: 300px; left: 140px; } .nakshatra-sec { position: absolute; top: 300px; left: 350px } .seva-name-sec { position: absolute; top: 340px; left: 180px } .seva-date-sec { position: absolute; top: 370px; left: 180px; } .cost-sec-2 { position: absolute; top: 405px; left: 140px; }'))
    pri.document.getElementsByTagName("head")[0].appendChild(css)
    pri.focus();
    pri.print();
  }

  render () {
    const {cost, sevaName, sevaDate, sevaSubmitted, loading} = this.state
    return (
    <React.Fragment>
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item name='home'> <NavLink to='/seva-billing'>Add Seva</NavLink> </Menu.Item>
          <Menu.Item name='Seva Reorts'> <NavLink to='/seva-report'>Seva Reorts</NavLink> </Menu.Item>
          <Menu.Item name='Trigger SMS'> <NavLink to='/trigger-sms'>Trigger SMS</NavLink> </Menu.Item>
        </Menu>
      </Segment>

      <Container className='main-container'>
        <Segment>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input disabled={sevaSubmitted} name='devoteeName' onChange={this.handleChange} fluid label='Name of the Devotee' placeholder='Name of the Devotee' />
              </Grid.Column>
              <Grid.Column>
                <Form.Input disabled={sevaSubmitted} name='contactNum' onChange={this.handleChange} fluid label='Contact Number' placeholder='Contact Number' />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column>
                <label className='form-label-custom'> Seva Name </label>
                <Dropdown
                  disabled={sevaSubmitted}
                  fluid search selection name='sevaName'
                  onChange={this.onSevaSelect}
                  label='Seva Name'
                  allowAdditions
                  onAddItem={this.handleAddition}
                  options={this.state.allSevas} placeholder='Sevas' />
              </Grid.Column>
              <Grid.Column>
                <Form.Input name='cost' onChange={this.handleChange} fluid label='Amount' placeholder='Amount' value={cost} />
              </Grid.Column>
              <Grid.Column>
                <label className='form-label-custom'> Seva Date </label>
                <DatePicker
                  disabled={sevaSubmitted}
                  selected={sevaDate}
                  onChange={this.handleSevaDateChange}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column>
                <label className='form-label-custom'> Gotra </label>
                <Dropdown
                  disabled={sevaSubmitted}
                  search
                  selection
                  onChange={this.handleChange}
                  name='gotra'
                  fluid
                  label='Gotra'
                  options={this.state.allGotras}
                  placeholder='Gotra'
                  allowAdditions
                  onAddItem={this.handleAddition}
                />
              </Grid.Column>
              <Grid.Column>
                <label className='form-label-custom'> Nakshatras </label>
                <Dropdown
                  disabled={sevaSubmitted}
                  search
                  selection
                  onChange={this.handleChange}
                  name='nakshatra'
                  fluid
                  label='Nakshatras'
                  options={this.state.allNakshatras}
                  placeholder='Nakshatras'
                  allowAdditions
                  onAddItem={this.handleAddition}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {sevaSubmitted ? <Button primary onClick={this.newSeva}>Create New Seva</Button> : <Button loading={loading} primary onClick={this.submitSeva}>Submit</Button>}
                {sevaSubmitted && <Button onClick={this.renderPrintPage}> Print Seva Ticket </Button>}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {
            sevaSubmitted &&
              <Message positive>
                <Message.Header>Seva Created Successfully</Message.Header>
              </Message>
          }

          <div style={{display: 'none'}}>
            <iframe id="ifmcontentstoprint" className={`container print-container`}>
              <SevaPrintFormat printData={this.state} />
            </iframe>
          </div>

        </Segment>
      </Container>
    </React.Fragment>
    )
  }
}

export default FormExampleSubcomponentControl
