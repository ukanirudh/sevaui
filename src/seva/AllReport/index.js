import React, { useState, useEffect } from 'react'
import { Grid, Container, Segment, Dropdown, Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker";

import moment from 'moment'
import { handleReportDownload } from '../utils'
import AppHeader from '../AppHeader'
import DownloadReportTable from '../DownloadReportTable'
import ExpenseReport from './ExpenseReport'
import { getSevaOption } from '../utils';
import { ReportTypes, ALL_REPORT_ID, Apis, API_DATE_QUERY_FIELD } from '../constants'

import { collection, getDocs, query, where } from "firebase/firestore"
import { db, SEVA_TYPE_ENDPOINT } from '../../firebaseConfigs';

const AllReport = () => {
  const [filterParams, setFilterParams] = useState({from: '', to: '', sevaName: ''});
  const [loading, setLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [fromtTodateTimeIso, setFromToIso] = useState({fromDate: '', toDate: ''});
  const [allSevaTypes, setAllSevaTypes] = useState([]);

  useEffect(() => {
    const getSevaType = async () => {
      const sevaTypeColRef = await getDocs(collection(db, SEVA_TYPE_ENDPOINT))
      let allSevasFetched = []
      sevaTypeColRef.forEach((doc) => {
        allSevasFetched.push(getSevaOption(doc.data()));
      });
      setAllSevaTypes(allSevasFetched);
    }
    getSevaType();
  }, []);

  const onSevaSelect = (e, {value}) => {
    setFilterParams({...filterParams, 'sevaName': value});
  }

  const onReportTypeSelect = (e, {value}) => {
    setSelectedReportType(value);
  }

  const handleFromChange = (date) => {
    const from = moment(date).format('YYYY-MM-DD')
    setFilterParams({...filterParams, 'from': from});
    setFromToIso({...fromtTodateTimeIso, 'fromDate': date})
  }

  const handleToChange = (date) => {
    const to = moment(date).format('YYYY-MM-DD')
    setFilterParams({...filterParams, 'to': to});
    setFromToIso({...fromtTodateTimeIso, 'toDate': date})
  }

  const getFilteredSevas = async (e) => {
    const filterKeys = Object.entries(filterParams)
    const currentAPI = Apis[selectedReportType]

    let params = filterKeys.reduce((params, filter) => {
      if (filter[1]) {
        params[filter[0]] = filter[1]
      }
      return params
    }, {})
    
    setLoading(true);
    const queryField = API_DATE_QUERY_FIELD[currentAPI];
    const filterQuery = query(
      collection(db, currentAPI),
      where(queryField, ">=", params.from),
      where(queryField, "<=", params.to)
    );

    try {
      const filteredListResults = [];
      const filteredApiResults = await getDocs(filterQuery)
      filteredApiResults.forEach((doc) => {
        filteredListResults.push({...doc.data(), id: doc.id });
      });
      setLoading(false);
      setFilteredList(filteredListResults);
    } catch(err) {
      setLoading(false);
    }
  }

  
  return (
    <React.Fragment>
      <AppHeader />
      <Container>
        <Segment>
          <Grid>
            <Grid.Row columns={4}>
              <Grid.Column>
                <label className='form-label-custom'> Report Type </label>
                <Dropdown
                  search
                  selection
                  name='report_type'
                  onChange={onReportTypeSelect} 
                  label='Report Type'
                  options={ReportTypes}
                  placeholder='Report Type'
                />
              </Grid.Column>
              {
              (selectedReportType === 'SevaReport') ?  ( <Grid.Column>
                    <label className='form-label-custom'> Seva Name </label>
                    <Dropdown
                      search
                      selection
                      name='sevaName'
                      onChange={onSevaSelect}
                      label='Seva Name'
                      options={allSevaTypes}
                      placeholder='Sevas'
                    />
                  </Grid.Column> ) : null

              }
            </Grid.Row>
            <Grid.Row columns={4} centered>
              <Grid.Column>
                <label className='form-label-custom'> From </label>
                <DatePicker
                  selected={fromtTodateTimeIso.fromDate}
                  onChange={handleFromChange}
                />
              </Grid.Column>
              <Grid.Column>
                <label className='form-label-custom'> To </label>
                <DatePicker
                  selected={fromtTodateTimeIso.toDate}
                  onChange={handleToChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Button primary onClick={getFilteredSevas} fluid> Filter</Button>
              </Grid.Column>
              <Grid.Column>
                <Button secondary onClick={() => handleReportDownload(ALL_REPORT_ID)} fluid> Download Report</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {
            (selectedReportType === 'SevaReport') ?
              <DownloadReportTable
                containerID={ALL_REPORT_ID}
                loading={loading}
                filteredList={filteredList}
                filterParams={filterParams}
              /> :
              <ExpenseReport
                containerID={ALL_REPORT_ID} 
                loading={loading}
                filteredList={filteredList}
                filterParams={filterParams}
              />
          }
        </Segment>
      </Container>
    </React.Fragment>
  )
  
}

export default AllReport
