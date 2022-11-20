import React from 'react'
import { Route, Routes } from "react-router-dom";
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
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/seva-billing" element={<SevaBilling />} />
      <Route path="/events-calendar" element={<EventsCalendar />} />
      <Route path="/trigger-sms" element={<TriggerSms />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/shashwatha-seva" element={<ShaswathaSeva />} />
      <Route path="/all-reports" element={<AllReport />} />
      <Route path="/add-seva-type" element={<AddSevaType />} />
    </Routes>
  )
}

export default HomePageRoutes;
