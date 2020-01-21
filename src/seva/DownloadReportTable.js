import React from 'react'
import { Header, Table, Dimmer, Loader } from 'semantic-ui-react'
import { groupBy } from 'lodash'

const SevaHeaders = () => {
  return (
    <Table.Header>
       <Table.Row>
         <Table.HeaderCell singleLine>Reciept No</Table.HeaderCell>
         <Table.HeaderCell>Seva Date</Table.HeaderCell>
         <Table.HeaderCell>Payment Date</Table.HeaderCell>
         <Table.HeaderCell>Devotee Name</Table.HeaderCell>
         <Table.HeaderCell>Seva Type</Table.HeaderCell>
         <Table.HeaderCell>Cost</Table.HeaderCell>
       </Table.Row>
     </Table.Header>
  )
}

const SevaReportFooter = ({totalCost}) => {
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>{totalCost}</Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )
}

const SevaListReportFormat = ({sevaList}) => {
  let renderedSevaItems = null
  let totalCost = 0
  if (sevaList.length) {
    renderedSevaItems = sevaList.map((seva) => {
      const {devoteeName, id, contactNum, sevaName, sevaDate, paymentDate, cost} = seva
      totalCost = totalCost + cost;
      return (
        <Table.Row>
          <Table.Cell>{id}</Table.Cell>
          <Table.Cell>{sevaDate}</Table.Cell>
          <Table.Cell>{paymentDate}</Table.Cell>
          <Table.Cell>{devoteeName}</Table.Cell>
          <Table.Cell>{sevaName}</Table.Cell>
          <Table.Cell>{cost}</Table.Cell>
        </Table.Row>
      )
    })
  }
  return (
    <Table padded>
      <Table.Body>
        {renderedSevaItems}
      </Table.Body>
      <SevaReportFooter totalCost={totalCost} />
    </Table>
  )
}

const SevaGroupReportFormat = ({sevaName, sevaDetails}) => {
  return (
    <div>
      <h2>{sevaName}</h2>
      <SevaListReportFormat sevaList={sevaDetails} />
    </div>
  )
}

const FilteredSevas = ({sevaList, loading}) => {
  const groupedData = groupBy(sevaList, 'sevaName')
  const entriesSevaData = sevaList.length ? Object.entries(groupedData) : []
  let renderedSevaReport = null
  if (entriesSevaData.length) {
    renderedSevaReport = entriesSevaData.map((entrySeva) => {
      const [sevaName, sevaDetails] = entrySeva
      return <SevaGroupReportFormat sevaName={sevaName} sevaDetails={sevaDetails} />
    })
  }
  return (
    <div id='FilteredSevas'>
       <Table celled padded>
        <SevaHeaders />
        {!entriesSevaData.length && <Table.Row> No sevas to display </Table.Row>}
       </Table>
       {renderedSevaReport}
       {loading && <Table.Row>
         <Dimmer active inverted>
           <Loader inverted>Loading</Loader>
         </Dimmer>
       </Table.Row>}
     </div>
  )
}

export default FilteredSevas;
