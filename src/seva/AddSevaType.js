import React, {useState} from 'react'
import { Form, Container, Segment, Grid, Button, Message } from 'semantic-ui-react'
import AppHeader from './AppHeader'

import { collection, addDoc } from "firebase/firestore"
import { db, SEVA_TYPE_ENDPOINT } from '../firebaseConfigs';

const toSnakeCase = str => str && str
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  .map(x => x.toLowerCase())
  .join('-');

const AddSevaType = () => {
    const [sevaObj, setSevaObj] = useState({});
    const [loading, setLoading] = useState(false)
    const [sevaSubmitted, setSevaSubmitted] = useState(false)

    const createSevaType = async () => {
      const {sevaType} = sevaObj;
      const sevaTypeData = {
        sevaName: toSnakeCase(sevaType),
        sevaLabel: sevaType
      }
      setLoading(prev => !prev);
      setSevaSubmitted(prev => !prev);
    
      try {
        await addDoc(collection(db, SEVA_TYPE_ENDPOINT), sevaTypeData);
      } catch (err) {
        console.log(err);
      }
      setLoading(prev => !prev);
    }

    return (
      <React.Fragment>
        <AppHeader />
        <Container>
          <Segment>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <h2> Add New Seva Type </h2>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Form.Input name='sevaType' onChange={(e, {name, value}) => setSevaObj({[name]: value}) } fluid label='Seva Type' placeholder='Seva Type' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
              <Grid.Column>
                <Button disabled={sevaSubmitted} loading={loading} onClick={createSevaType}>Submit</Button>
              </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </React.Fragment>
    )

}

export default AddSevaType;
