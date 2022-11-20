import React from 'react'
import { TradingApp } from './App'
import {   BrowserRouter } from "react-router-dom";

const trading = () => {
  return (
    <BrowserRouter>
      <TradingApp />
    </BrowserRouter>
  )
}

export default trading;
