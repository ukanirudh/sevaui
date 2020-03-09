import React, { Component } from 'react'
import { Grid, Container, Segment, Dropdown, Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import moment from 'moment'

import DownloadReportTable from '../DownloadReportTable'
import { handleReportDownload } from '../utils'
import { SHASWATHA_SEVA_ID } from '../constants'
import AppHeader from '../AppHeader'

// import { testdata } from '../static/data/TestData'
const sevaOptions = [{
  value: 'shaswatha-seva',
  key: 'shaswatha-seva',
  text: 'Shaswatha-seva',
}]

class ShaswathaSeva extends Component {
  state = {
    loading: false,
    fromDate: '',
    toDate: '',
    filterParams: {from: '', to: '', sevaName: 'shaswatha-seva'},
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

  render () {
    const {fromDate, toDate, bookingDate, sevaList, loading, filterParams} = this.state
    return (
      <React.Fragment>
        <AppHeader />
        <Container>
          <Segment>
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <label className='form-label-custom'> Seva Name </label>
                  <Dropdown disabled search selection name='sevaName' label='Seva Name' options={sevaOptions} defaultValue={'shaswatha-seva'} placeholder='Sevas' />
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
                  <Button onClick={() => handleReportDownload(SHASWATHA_SEVA_ID)} fluid> Download Report</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <DownloadReportTable containerID={SHASWATHA_SEVA_ID} loading={loading} filteredList={sevaList} filterParams={filterParams} />
          </Segment>
        </Container>
      </React.Fragment>
    )
  }
}

export default ShaswathaSeva
