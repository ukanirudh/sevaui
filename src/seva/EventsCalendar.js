import React, { Component } from 'react'
import { Form, Container, Segment, Menu } from 'semantic-ui-react'
import { Calendar, momentLocalizer, Views  }  from 'react-big-calendar'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

import eventsList from '../static/data/events'

const localizer = momentLocalizer(moment)
let allViews = Object.keys(Views).map(k => Views[k])

class EventsCalendar extends Component {

  render () {
    return (
      <React.Fragment>
        <Segment inverted>
          <Menu inverted secondary>
            <Menu.Item name='home'> <NavLink to='/seva-billing'>Add Seva</NavLink> </Menu.Item>
            <Menu.Item name='Events Calendar'> <NavLink to='/events-calendar'>Events Calendar</NavLink> </Menu.Item>
            <Menu.Item name='Seva Reorts'> <NavLink to='/seva-report'>Seva Reorts</NavLink> </Menu.Item>
            <Menu.Item name='Trigger SMS'> <NavLink to='/trigger-sms'>Trigger SMS</NavLink> </Menu.Item>
          </Menu>
        </Segment>

        <Container style={{height: '1000px'}}>
          <Calendar
            localizer={localizer}
            events={eventsList}
            views={allViews}
            step={60}
            defaultDate={new Date(2015, 3, 1)}
          />
        </Container>
      </React.Fragment>
    )
  }
}

export default EventsCalendar
