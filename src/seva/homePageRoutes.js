import React from 'react'
import { Route, Switch } from "react-router-dom";
import SevaBilling from './SevaBilling'
import EventsCalendar from './EventsCalendar'
import LoginPage from './LoginPage'
import TriggerSms from './TriggerSms'
import Expenses from './Expenses'
import ShaswathaSeva from './ShaswathaSeva'
import AllReport from './AllReport'
import AddSevaType from './AddSevaType'

const HomePageRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/seva-billing" component={SevaBilling} />
      <Route path="/events-calendar" component={EventsCalendar} />
      <Route path="/trigger-sms" component={TriggerSms} />
      <Route path="/expenses" component={Expenses} />
      <Route path="/shashwatha-seva" component={ShaswathaSeva} />
      <Route path="/all-reports" component={AllReport} />
      <Route path="/add-seva-type" component={AddSevaType} />
    </Switch>
  )
}

export default HomePageRoutes;
