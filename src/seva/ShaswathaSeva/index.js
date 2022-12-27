import React, { useState } from 'react'
import { Grid, Container, Segment, Dropdown, Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import moment from 'moment'

import DownloadReportTable from '../DownloadReportTable'
import { handleReportDownload } from '../utils'
import { SHASWATHA_SEVA_ID, API_DATE_QUERY_FIELD } from '../constants'
import AppHeader from '../AppHeader'
import { collection, getDocs, query, where } from "firebase/firestore"
import { db, SEVA_ENDPOINT } from '../../firebaseConfigs';

const sevaOptions = [{
  value: 'shaswatha-seva',
  key: 'shaswatha-seva',
  text: 'Shaswatha-seva',
}]

const ShaswathaSeva = () => {
  const [filterParams, setFilterParams] = useState({from: '', to: '', sevaName: 'shaswatha-seva'});
  const [loading, setLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [fromTodateTimeIso, setFromToIso] = useState({fromDate: '', toDate: ''});

  const handleFromChange = (date) => {
    const from = moment(date).format('YYYY-MM-DD')
    setFilterParams({...filterParams, 'from': from});
    setFromToIso({...fromTodateTimeIso, 'fromDate': date})

  }

  const handleToChange = (date) => {
    const to = moment(date).format('YYYY-MM-DD')
    setFilterParams({...filterParams, 'to': to});
    setFromToIso({...fromTodateTimeIso, 'toDate': date})
  }

  const getFilteredSevas = async (e) => {
    const filterKeys = Object.entries(filterParams)

    let params = filterKeys.reduce((params, filter) => {
      if (filter[1]) {
        params[filter[0]] = filter[1]
      }
      return params
    }, {})
    console.log(params)
    setLoading(true);

    const queryField = API_DATE_QUERY_FIELD[SEVA_ENDPOINT];
    const filterQuery = query(
      collection(db, SEVA_ENDPOINT),
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
                <label className='form-label-custom'> Seva Name </label>
                <Dropdown disabled search selection name='sevaName' label='Seva Name' options={sevaOptions} defaultValue={'shaswatha-seva'} placeholder='Sevas' />
              </Grid.Column>
              <Grid.Column>
                <label className='form-label-custom'> From </label>
                <DatePicker
                  selected={fromTodateTimeIso.fromDate}
                  onChange={handleFromChange}
                />
              </Grid.Column>
              <Grid.Column>
                <label className='form-label-custom'> To </label>
                <DatePicker
                  selected={fromTodateTimeIso.toDate}
                  onChange={handleToChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Button primary onClick={getFilteredSevas} fluid> Filter</Button>
                <br />
                <Button secondary onClick={() => handleReportDownload(SHASWATHA_SEVA_ID)} fluid> Download Report</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <DownloadReportTable containerID={SHASWATHA_SEVA_ID} loading={loading} filteredList={filteredList} filterParams={filterParams} />
        </Segment>
      </Container>
    </React.Fragment>
  )
}

export default ShaswathaSeva
