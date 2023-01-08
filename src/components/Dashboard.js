import '../assets/css/Dashboard.css'
import React, { useEffect } from 'react'
import { updateConnectionOrderRenewal } from '../functions/Orders'
import { updateExpiredConnectionStatus } from '../functions/Connections'
import PieChart from './PieChart'
// import { bindActionCreators } from 'redux'
// import { actionCreators } from '../state/index'

export const Dashboard = () => {

  useEffect(() => {
    updateConnectionOrderRenewal()
    updateExpiredConnectionStatus()
  }, [])

  return (
    <div className="dashboard-container">
      <div className='dashboard-group-title'>Cash Collection:</div>
      <div className='dashboard-items'>
        <div className="dashboard-item db-textbox" id=''>
          <div className="dashboard-item-content">
          Today: <strong> 100.00</strong>
          </div>
        </div>

        <div className="dashboard-item db-textbox" id=''>
          <div className="dashboard-item-content">
            This Month: <strong>2568.00</strong>
          </div>
        </div>

        <div className="dashboard-item db-textbox" id=''>
          <div className="dashboard-item-content">
            This Year: <strong>6958745.00</strong>
          </div>
        </div>
      </div>

      <br />
      
      <div className='dashboard-group-title'>Connections:</div>
      <div className='dashboard-items'>
        <div className="dashboard-item db-chart" id='connections-pie'>
          <div className="dashboard-item-content">
            {<PieChart percentage={60} color='green' width={'200px'} />}
            <br />
            <strong>Active</strong>
          </div>
        </div>

        <div className="dashboard-item db-chart" id='connections-pie'>
          <div className="dashboard-item-content">
            {<PieChart percentage={30} color='maroon' width={'200px'} />}
            <br />
            <strong>Inactive</strong>
          </div>
        </div>
        
        <div className="dashboard-item db-chart" id='connections-pie'>
          <div className="dashboard-item-content">
            {<PieChart percentage={10} color='orange' width={'200px'} />}
            <br />
            <strong>Archieved</strong>
          </div>
        </div>
      </div>
      
      <br />

    </div>
  )
}
