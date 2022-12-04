import React, { Component } from 'react'
import { Grid, Container, Segment, Dropdown, Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker";

import moment from 'moment'
import sevas from '../../static/data/sevaTypes'
import { handleReportDownload } from '../utils'
import AppHeader from '../AppHeader'
import DownloadReportTable from '../DownloadReportTable'
import ExpenseReport from './ExpenseReport'
import { ReportTypes, ALL_REPORT_ID, Apis } from '../constants'

import {collection, orderBy, getDocs, query, where } from "firebase/firestore"
import {db} from '../../firebaseConfigs';

class AllReport extends Component {
  state = {
    loading: false,
    fromDate: '',
    toDate: '',
    selectedReportType: '',
    filterParams: {from: '', to: '', sevaName: ''},
    bookingDate: new Date(),
    filteredList: []
  }

  componentDidMount() {
    // const getData = async () => {
    //   const q = query(collection(db, "sevas"), where("sevaDate", "<=", "2022-12-21"));

    //   // const taskColRef = await getDocs(collection(db, 'sevas'))
    //   const taskColRef = await getDocs(q)
    //   console.log("taskColRef", taskColRef);
    //   taskColRef.forEach((doc) => {
    //     console.log(doc.id)
    //     console.log(doc.data())
    //   });
    // }

    // getData();
  }

  constructor(props) {
    super(props);
  }

  onSevaSelect = (e, {value}) => {
    const {sevaName, filterParams} = this.state
    this.setState({sevaName: value, filterParams: Object.assign(filterParams, {sevaName: value})})
  }

  onReportTypeSelect = (e, {value}) => {
    this.setState({selectedReportType: value})
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

  getFilteredSevas = (e) => {
    const {filterParams, selectedReportType} = this.state
    const filterKeys = Object.entries(filterParams)
    const currentAPI = Apis[selectedReportType]

    let params = filterKeys.reduce((params, filter) => {
      if (filter[1]) {
        params[filter[0]] = filter[1]
      }
      return params
    }, {})
    console.log(params, currentAPI)

    var url = new URL(`http://localhost:8085/SevaBilling/rest/Service/${currentAPI}`)
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
      this.setState({filteredList: response, loading: false})
    })
  }

  render () {
    const {fromDate, toDate, bookingDate, filteredList, loading, filterParams, selectedReportType} = this.state
    return (
      <React.Fragment>
        <AppHeader />
        <Container>
          <Segment>
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <label className='form-label-custom'> Report Type </label>
                  <Dropdown search selection name='report_type' onChange={this.onReportTypeSelect}  label='Report Type' options={ReportTypes} placeholder='Report Type' />
                </Grid.Column>
                {
                (selectedReportType === 'SevaReport') ?  ( <Grid.Column>
                      <label className='form-label-custom'> Seva Name </label>
                      <Dropdown search selection name='sevaName' onChange={this.onSevaSelect}  label='Seva Name' options={sevas} placeholder='Sevas' />
                    </Grid.Column> ) : null

                }
              </Grid.Row>
              <Grid.Row columns={4}>
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
                </Grid.Column>
                <Grid.Column>
                  <Button onClick={() => handleReportDownload('allReport')} fluid> Download Report</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {
              (selectedReportType === 'SevaReport') ?
                <DownloadReportTable containerID={'allReport'} loading={loading} filteredList={filteredList} filterParams={filterParams} /> :
                <ExpenseReport containerID={'allReport'} loading={loading} filteredList={filteredList} filterParams={filterParams} />
            }
          </Segment>
        </Container>
      </React.Fragment>
    )
  }
}

export default AllReport
