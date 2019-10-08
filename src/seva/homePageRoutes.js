import React from 'react'
import { Route, Switch } from "react-router-dom";
import SevaBilling from './SevaBilling'
import EventsCalendar from './EventsCalendar'
import SevaFilters from './SevaFilters'
import LoginPage from './LoginPage'
import TriggerSms from './TriggerSms'

const HomePageRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/seva-billing" component={SevaBilling} />
      <Route path="/events-calendar" component={EventsCalendar} />
      <Route path="/seva-report" component={SevaFilters} />
      <Route path="/trigger-sms" component={TriggerSms} />
    </Switch>
  )
}

export default HomePageRoutes;
