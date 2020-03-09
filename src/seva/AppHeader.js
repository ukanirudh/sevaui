import React from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const AppHeader = () => {
  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item name='home'> <NavLink to="/seva-billing">Create Seva</NavLink> </Menu.Item>
        <Menu.Item name='Add Expense'> <NavLink to="/expenses">Add Expense</NavLink> </Menu.Item>
        <Menu.Item name='Add Seva Type'> <NavLink to='/add-seva-type'>Add Seva Type</NavLink> </Menu.Item>
        <Menu.Item name='Reports'> <NavLink to="/all-reports">Reports</NavLink> </Menu.Item>
        <Menu.Item name='Shaswatha Seva'> <NavLink to='/shashwatha-seva'>Shaswatha Seva</NavLink> </Menu.Item>
        <Menu.Item name='Trigger SMS'> <NavLink to='/trigger-sms'>Trigger SMS</NavLink> </Menu.Item>
      </Menu>
    </Segment>
  )
}

export default AppHeader;
