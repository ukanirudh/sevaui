import React, {useState} from 'react'
import { Form, Container, Segment, Dropdown, Grid, Button, Message } from 'semantic-ui-react'

const toSnakeCase = str => str && str
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  .map(x => x.toLowerCase())
  .join('-');

const createSevaType = (sevaObj) => {
  const sevaTypeData = {
    sevaName: toSnakeCase(sevaObj.sevaType),
    sevaLabel: sevaObj.sevaType
  }
  fetch('http://localhost:8085/SevaBilling/rest/Service/sevatype', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(sevaTypeData)
  }).then((response) => response.json()).then((response) => {
    const {data} = response
    // this.setState({sevaSubmitted: true, loading: false, id: data})
  })
}

const AddSevaType = () => {
    const [sevaObj, setSevaObj] = useState({});

    return (
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
              <Button padded onClick={(e, sevaObj) => createSevaType(sevaObj)}>Submit</Button>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    )

}

export default AddSevaType;
