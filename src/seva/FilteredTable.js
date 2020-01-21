import React from 'react'
import { Header, Table, Dimmer, Loader } from 'semantic-ui-react'

const SevaHeaders = () => {
  return (
    <Table.Header>
       <Table.Row>
         <Table.HeaderCell singleLine>Reciept No</Table.HeaderCell>
         <Table.HeaderCell>Seva Date</Table.HeaderCell>
         <Table.HeaderCell>Payment Date</Table.HeaderCell>
         <Table.HeaderCell>Devotee Name</Table.HeaderCell>
         {/*<Table.HeaderCell>Phone Number</Table.HeaderCell>*/}
         <Table.HeaderCell>Seva Type</Table.HeaderCell>
       </Table.Row>
     </Table.Header>
  )
}

const FilteredSevaList = ({sevaList}) => {
  const newSevaList = [...sevaList]
  let renderedSevaItems = null
  if (newSevaList.length) {
    renderedSevaItems = newSevaList.map((seva) => {
      const {devoteeName, id, contactNum, sevaName, sevaDate, paymentDate} = seva
      return (
        <Table.Row>
          <Table.Cell> {id} </Table.Cell>
          <Table.Cell> {sevaDate} </Table.Cell>
          <Table.Cell> {paymentDate} </Table.Cell>
          <Table.Cell> {devoteeName} </Table.Cell>
          {/*<Table.Cell> {contactNum} </Table.Cell>*/}
          <Table.Cell> {sevaName} </Table.Cell>
        </Table.Row>
      )
    })
  } else {
    renderedSevaItems = (
      <Table.Row> No sevas to display </Table.Row>
    )
  }
  return (
    <Table.Body>
      {renderedSevaItems}
    </Table.Body>
  )
}

const FilteredSevas = ({sevaList, loading}) => {
  return (
     <Table celled padded>
      <SevaHeaders />
      <FilteredSevaList sevaList={sevaList} />
      {loading && <Table.Row>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Table.Row>}
     </Table>
  )
}

export default FilteredSevas;
