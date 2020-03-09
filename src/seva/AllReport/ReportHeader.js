import React from 'react'
import moment from 'moment'

const ReportHeader = ({from, to, headerText}) => {
  return (
    <div className='seva-report-segment-header'>
      <p className='details-text'>{`${from && moment(from).format('DD-MM-YYYY')} -- ${to && moment(to).format('DD-MM-YYYY')}`}</p>
      <h2> {headerText} </h2>
      <p className='details-text'>{`Report Date: ${moment().format('Do MMMM YYYY')}`}</p>
    </div>
  );
}

export default ReportHeader;
