import React from 'react'
import moment from 'moment'

class ComponentToPrint2 extends React.Component {
  render() {
    const {printData} = this.props
    const {cost, sevaName, sevaDate, devoteeName, contactNum, nakshatra, gotra, sevaSubmitted} = printData
    return (
      <div id="divcontents" className={`container print-container ${!sevaSubmitted ? 'hide-class' : ''}`} style={{width: '1100px', height: '480px'}}>
        {/*<img src={require('../../static/images/ticket.jpeg')} alt='Snow' style={{width:'100%'}} />*/}

        <p className='bill-no-sec'>1</p>
        <p className='bill-date-sec'>{moment().format('YYYY-MM-DD')}</p>
        <p className='seva-date-sec'>{moment(sevaDate).format('YYYY-MM-DD')}</p>
        <p className='devotee-name-sec'>{devoteeName}</p>
        <p className='cost-sec'>{cost}</p>
        <p className='gotra-sec'>{gotra}</p>
        <p className='nakshatra-sec'>{nakshatra}</p>
        <p className='seva-name-sec'>{sevaName}</p>
        {/*<p className='contact-num-main'>{contactNum}</p>*/}
        <p className='cost-sec-2'>{cost}</p>

        <p className='bill-no-main'>1</p>
        <p className='bill-date-main'>{moment().format('YYYY-MM-DD')}</p>
        <p className='seva-date-main'>{moment(sevaDate).format('YYYY-MM-DD')}</p>
        <p className='devotee-name-main'>{devoteeName}</p>
        <p className='cost-main'>{cost}</p>
        <p className='gotra-main'>{gotra}</p>
        <p className='nakshatra-main'>{nakshatra}</p>
        <p className='seva-name-main'>{sevaName}</p>
        {/*<p className='contact-num-main'>{contactNum}</p>*/}
        <p className='cost-main-2'>{cost}</p>
      </div>
    )

  }
}

export default ComponentToPrint2;
