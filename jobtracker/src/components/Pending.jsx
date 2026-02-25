import React from 'react'
import DashboardLayout from './DashboardLayout'
import RemindersFormList from './RemindersFormList'

function Pending() {
  return (
    <div>
        <div className="container bg-light ">
          <h4 className="fw-bold text-center mt-5 mb-5 text-secondary">Pending Reminders</h4>
          <RemindersFormList/>
        </div>
    </div>
  )
}

export default Pending
