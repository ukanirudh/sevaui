import React from 'react'
import { Header, Table, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { groupBy } from 'lodash'
import ReportHeader from './AllReport/ReportHeader'

const SevaHeaders = () => {
  return (
    <Table.Header>
       <Table.Row>
         <Table.HeaderCell singleLine width={2}>Reciept No</Table.HeaderCell>
         <Table.HeaderCell width={3}>Seva Date</Table.HeaderCell>
         <Table.HeaderCell width={3}>Payment Date</Table.HeaderCell>
         <Table.HeaderCell width={3}>Devotee Name</Table.HeaderCell>
         <Table.HeaderCell width={2}>Gotra</Table.HeaderCell>
         <Table.HeaderCell width={2}>Nakshatra</Table.HeaderCell>
         <Table.HeaderCell width={1}>Cost</Table.HeaderCell>
       </Table.Row>
     </Table.Header>
  )
}

const SevaReportFooter = ({totalCost}) => {
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell width={2}></Table.HeaderCell>
        <Table.HeaderCell width={3}></Table.HeaderCell>
        <Table.HeaderCell width={3}></Table.HeaderCell>
        <Table.HeaderCell width={3}></Table.HeaderCell>
        <Table.HeaderCell width={2}></Table.HeaderCell>
        <Table.HeaderCell width={2}></Table.HeaderCell>
        <Table.HeaderCell width={1}><b>{totalCost}</b></Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )
}

const SevaListReportFormat = ({sevaList}) => {
  let renderedSevaItems = null
  let totalCost = 0
  if (sevaList.length) {
    renderedSevaItems = sevaList.map((seva) => {
      const {devoteeName, id, contactNum, sevaName, sevaDate, paymentDate, cost, gotra, nakshatra} = seva
      totalCost = totalCost + cost;
      return (
        <Table.Row>
          <Table.Cell width={2}>{id}</Table.Cell>
          <Table.Cell width={3}>{sevaDate}</Table.Cell>
          <Table.Cell width={3}>{paymentDate}</Table.Cell>
          <Table.Cell width={3}>{devoteeName}</Table.Cell>
          <Table.Cell width={2}>{gotra}</Table.Cell>
          <Table.Cell width={2}>{nakshatra}</Table.Cell>
          <Table.Cell width={1}>{cost}</Table.Cell>
        </Table.Row>
      )
    })
  }
  return (
    <Table padded fixed>
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

const FilteredSevas = ({filteredList, loading, filterParams, containerID}) => {
  const {from = '', to = ''} = filterParams
  const groupedData = groupBy(filteredList, 'sevaName')
  const entriesSevaData = filteredList.length ? Object.entries(groupedData) : []
  let renderedSevaReport = null
  if (entriesSevaData.length) {
    renderedSevaReport = entriesSevaData.map((entrySeva) => {
      const [sevaName, sevaDetails] = entrySeva
      return <SevaGroupReportFormat sevaName={sevaName} sevaDetails={sevaDetails} />
    })
  }
  return (
    <div id={containerID}>
      <Segment>
        <ReportHeader from={from} to={to} headerText={'Seva Report'} />
        <Table celled padded>
          <SevaHeaders />
          {!entriesSevaData.length && <Table.Row> No sevas to display </Table.Row>}
        </Table>
        {renderedSevaReport}
        {loading && <Table.Row>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Table.Row>
        }
      </Segment>
    </div>
  )
}

export default FilteredSevas;
