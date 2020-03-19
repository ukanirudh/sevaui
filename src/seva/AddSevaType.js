import React, {useState, useCallback} from 'react'
import { Form, Container, Segment, Dropdown, Grid, Button, Message } from 'semantic-ui-react'
import AppHeader from './AppHeader'

const toSnakeCase = str => str && str
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  .map(x => x.toLowerCase())
  .join('-');

const createSevaType = ({sevaType}, {toggleLoading, toggleSevaSubmitted}) => {
  const sevaTypeData = {
    sevaName: toSnakeCase(sevaType),
    sevaLabel: sevaType
  }
  toggleLoading()
  toggleSevaSubmitted()
  fetch('http://localhost:8085/SevaBilling/rest/Service/sevatype', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(sevaTypeData)
  }).then((response) => response.json()).then((response) => {
    toggleLoading()
  }).catch(() => {
    toggleLoading()
  })
}

const AddSevaType = () => {
    const [sevaObj, setSevaObj] = useState({});
    const [loading, setLoading] = useState(false)
    const [sevaSubmitted, setSevaSubmitted] = useState(false)

    const toggleSevaSubmitted = useCallback(() => setSevaSubmitted(!sevaSubmitted), [sevaSubmitted]);
    const toggleLoading = useCallback(() => setLoading(!loading), [loading]);
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
                <Button disabled={sevaSubmitted} loading={loading} padded onClick={(e) => createSevaType(sevaObj, {toggleLoading, toggleSevaSubmitted})}>Submit</Button>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </React.Fragment>
    )

}

export default AddSevaType;
