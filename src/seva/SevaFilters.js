import React, { Component } from 'react'
import { Grid, Container, Segment, Menu, Dropdown, Button, Header, Table } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import DatePicker from "react-datepicker";
//import FilteredSevas from './FilteredTable'
import moment from 'moment'
import sevas from '../static/data/sevaTypes'

import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import DownloadReportTable from './DownloadReportTable'
// import { testdata } from '../static/data/TestData'

class SevaFilters extends Component {
  state = {
    loading: false,
    fromDate: '',
    toDate: '',
    filterParams: {from: '', to: '', sevaName: ''},
    bookingDate: new Date(),
    sevaList: []
  }

  constructor(props) {
    super(props);
  }

  handleFromChange = (date) => {
    const {filterParams} = this.state
    const from = moment(date).format('YYYY-MM-DD')
    const updatedFilterParams = Object.assign(filterParams, {from})
    this.setState({fromDate: date, filterParams: updatedFilterParams})
  }

  handleToChange = (date) => {
    const {filterParams} = this.state
    const to = moment(date).format('YYYY-MM-DD')
    const updatedFilterParams = Object.assign(filterParams, {to})
    this.setState({toDate: date, filterParams: updatedFilterParams})
  }

  handleBookingDateChange = (date) => this.setState({bookingDate: date})

  onSevaSelect = (e, {value}) => {
    const {sevaName, filterParams} = this.state
    this.setState({sevaName: value, filterParams: Object.assign(filterParams, {sevaName: value})})
  }

  getFilteredSevas = (e) => {
    const {filterParams} = this.state
    const filterKeys = Object.entries(filterParams)

    let params = filterKeys.reduce((params, filter) => {
      if (filter[1]) {
        params[filter[0]] = filter[1]
      }
      return params
    }, {})
    console.log(params)

    var url = new URL('http://localhost:8085/SevaBilling/rest/Service/seva')
    url.search = new URLSearchParams(params)
    console.log(url)
    this.setState({loading: true})
    fetch(url, {
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
    .then((response) => {
      console.log(response)
      this.setState({sevaList: response, loading: false})
    })
  }

  handleReportDownload = () => {
    window.html2canvas = html2canvas;
    const pdf = new jsPDF("l", "pt", "a3");
    pdf.html(document.getElementById('FilteredSevas'), {
       callback: function (doc) {
         doc.save();
       }
    });
  }

  render () {
    const {fromDate, toDate, bookingDate, sevaList, loading, filterParams} = this.state
    return (
      <React.Fragment>
        <Segment inverted>
          <Menu inverted secondary>
            <Menu.Item name='home'> <NavLink to="/seva-billing">Add Seva</NavLink> </Menu.Item>
            <Menu.Item name='Events Calendar'> <NavLink to="/events-calendar">Events Calendar</NavLink> </Menu.Item>
            <Menu.Item name='Seva Reorts'> <NavLink to="/seva-report">Seva Reorts</NavLink> </Menu.Item>
            <Menu.Item name='Trigger SMS'> <NavLink to='/trigger-sms'>Trigger SMS</NavLink> </Menu.Item>
          </Menu>
        </Segment>

        <Container>
          <Segment>
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <label className='form-label-custom'> Seva Name </label>
                  <Dropdown search selection name='sevaName' onChange={this.onSevaSelect}  label='Seva Name' options={sevas} placeholder='Sevas' />
                </Grid.Column>
                <Grid.Column>
                  <label className='form-label-custom'> From </label>
                  <DatePicker
                    selected={fromDate}
                    onChange={this.handleFromChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <label className='form-label-custom'> To </label>
                  <DatePicker
                    selected={toDate}
                    onChange={this.handleToChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Button name='cost' onClick={this.getFilteredSevas} fluid placeholder='Amount'> Filter</Button>
                  <Button onClick={this.handleReportDownload} fluid> Download Report</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/*<FilteredSevas loading={loading} sevaList={sevaList} />*/}
            <DownloadReportTable loading={loading} sevaList={sevaList} filterParams={filterParams} />
          </Segment>
        </Container>
      </React.Fragment>
    )
  }
}

export default SevaFilters
