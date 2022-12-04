import React, { Component, useState, useEffect } from 'react'
import { Form, Container, Segment, Dropdown, Grid, Button, Message } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import SevaPrintFormat from './SevaPrintFormat'
import AppHeader from '../AppHeader'

/*Constants import*/
import gotraOptions from '../../static/data/gotra'
import nakshatrasOptions from '../../static/data/nakshatras'

import {collection, orderBy, getDocs, addDoc } from "firebase/firestore"
import {db} from '../../firebaseConfigs';

const mapNameToStateProps = {
  'gotra': 'allGotras',
  'nakshatra': 'allNakshatras',
  'sevaName': 'allSevas'
}

const getSevaOption = ({sevaName, sevaLabel, amount}) => ({
  value: sevaName,
  key: sevaName,
  text: sevaLabel,
  amount
})

const CreateSeva = () => {
  const [sevaSubmitted, setSevaSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allSevas, setAllSevas] = useState([]);
  const [allGotras, setAllGotras] = useState(gotraOptions);
  const [allNakshatras, setAllNakshatras] = useState(nakshatrasOptions);
  const [formData, setFormData] = useState({amount: 0});
  const [ sevaID, setDevaID ] = useState(null);

  useEffect(() => {
    const getSevaType = async () => {
      const taskColRef = await getDocs(collection(db, 'sevaType'), orderBy('created', 'desc'))
      let allSevasFetched = []
      taskColRef.forEach((doc) => {
        allSevasFetched.push(getSevaOption(doc.data()));
      });
      setAllSevas(allSevasFetched);
    }
    getSevaType();
  }, [])


  // useEffect(() => {
  //   const getData = async () => {
  //     const taskColRef = await getDocs(collection(db, 'sevas'), orderBy('created', 'desc'))
  //     console.log("taskColRef", taskColRef);
  //     taskColRef.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //     });
  //   }

  //   getData();
  // }, [])

  const handleGotraAddtion = (e, { name, value }) => {
    setAllGotras([...allGotras, { text: value, value }])
    setFormData({...formData, [name]: value})
  }

  const handleNakshatraAddtion = (e, { name, value }) => {
    setAllNakshatras([...allNakshatras, { text: value, value }])
    setFormData({...formData, [name]: value})

  }

  const handleChange = (e, {name, value }) => setFormData({...formData, [name]: value})

  const handleSevaDateChange = (date) => setFormData({...formData, sevaDate: date})

  const onSevaSelect = (e, data) => {
    const {name, value} = data;
    setFormData({...formData, [name]: value})
    const selectedSeva = allSevas.filter((seva) => seva.value === value)
    if (selectedSeva[0]) {
      setFormData({...formData, amount: selectedSeva[0].amount})
    }
  }

  const newSeva = () => window.location.reload()

  const submitSeva = async (e) => {
    e.preventDefault()
    const {sevaDate} = formData;
    const sevaDateFormatted = moment(sevaDate).format('YYYY-MM-DD')
    let sevaData = {...formData}
    sevaData = Object.assign(sevaData, {sevaDate: sevaDateFormatted})
    console.log(sevaData)

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'sevas'), sevaData)
      setSevaSubmitted(true);
      setDevaID(docRef.id);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  const renderPrintPage = () => {
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


    return (
    <React.Fragment>
      <AppHeader />

      <Container className='main-container'>
        <Segment>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input disabled={sevaSubmitted} name='devoteeName' onChange={handleChange} fluid label='Name of the Devotee' placeholder='Name of the Devotee' />
              </Grid.Column>
              <Grid.Column>
                <Form.Input disabled={sevaSubmitted} name='contactNum' onChange={handleChange} fluid label='Contact Number' placeholder='Contact Number' />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column>
                <label className='form-label-custom'> Seva Name </label>
                <Dropdown
                  disabled={sevaSubmitted}
                  fluid search selection name='sevaName'
                  onChange={onSevaSelect}
                  label='Seva Name'
                  options={allSevas} placeholder='Sevas' />
              </Grid.Column>
              <Grid.Column>
                <Form.Input name='amount' onChange={handleChange} fluid label='Amount' placeholder='Amount' value={formData.amount} />
              </Grid.Column>
              <Grid.Column>
                <label className='form-label-custom'> Seva Date </label>
                <DatePicker
                  disabled={sevaSubmitted}
                  selected={formData.sevaDate}
                  onChange={handleSevaDateChange}
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
                  onChange={handleChange}
                  name='gotra'
                  fluid
                  label='Gotra'
                  options={allGotras}
                  placeholder='Gotra'
                  allowAdditions
                  onAddItem={handleGotraAddtion}
                />
              </Grid.Column>
              <Grid.Column>
                <label className='form-label-custom'> Nakshatras </label>
                <Dropdown
                  disabled={sevaSubmitted}
                  search
                  selection
                  onChange={handleChange}
                  name='nakshatra'
                  fluid
                  label='Nakshatras'
                  options={allNakshatras}
                  placeholder='Nakshatras'
                  allowAdditions
                  onAddItem={handleNakshatraAddtion}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {sevaSubmitted ? <Button primary onClick={newSeva}>Create New Seva</Button> : <Button loading={loading} primary onClick={submitSeva}>Submit</Button>}
                {sevaSubmitted && <Button onClick={renderPrintPage}> Print Seva Ticket </Button>}
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
              <SevaPrintFormat printData={{...formData, id: sevaID}} />
            </iframe>
          </div>

        </Segment>
      </Container>
    </React.Fragment>
    )

}

export default CreateSeva
