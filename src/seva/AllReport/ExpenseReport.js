import React from 'react'
import { Header, Table, Dimmer, Loader, Segment } from 'semantic-ui-react'
import ReportHeader from './ReportHeader'

const SevaHeaders = () => {
  return (
    <Table.Header>
       <Table.Row>
         <Table.HeaderCell width={4}>Paid To</Table.HeaderCell>
         <Table.HeaderCell width={4}>Description</Table.HeaderCell>
         <Table.HeaderCell width={4}>Amount</Table.HeaderCell>
         <Table.HeaderCell width={4}>Payment Date</Table.HeaderCell>
       </Table.Row>
     </Table.Header>
  )
}

const FilteredSevaList = ({filteredList}) => {
  const newFilteredList = [...filteredList]
  let renderedSevaItems = null
  if (newFilteredList.length) {
    renderedSevaItems = newFilteredList.map((seva) => {
      const {paidTo, id, description, amount, paymentDate} = seva
      return (
        <Table.Row key={id}>
          <Table.Cell width={4}> {paidTo} </Table.Cell>
          <Table.Cell width={4}> {description} </Table.Cell>
          <Table.Cell width={4}> {amount} </Table.Cell>
          <Table.Cell width={4}> {paymentDate} </Table.Cell>
        </Table.Row>
      )
    })
  } else {
    renderedSevaItems = (
      <Table.Row> No expenses to display </Table.Row>
    )
  }
  return (
    <Table.Body>
      {renderedSevaItems}
    </Table.Body>
  )
}

const ExpenseReport = ({filteredList, loading, filterParams, containerID}) => {
  const {from = '', to = ''} = filterParams
  return (
    <div className='margin-t-1em' id={containerID}>
      <Segment>
        <ReportHeader from={from} to={to} headerText={'Expense Report'} />
        <Table celled padded>
          <SevaHeaders />
          <FilteredSevaList filteredList={filteredList} />
          {loading && <Table.Row>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Table.Row>}
        </Table>
      </Segment>
     </div>
  )
}

export default ExpenseReport;
