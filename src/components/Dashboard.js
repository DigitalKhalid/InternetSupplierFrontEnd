import '../assets/css/Dashboard.css'
import React from 'react'
// import { bindActionCreators } from 'redux'
// import { actionCreators } from '../state/index'

export const Dashboard = () => {

  return (
    <div className='dashboard-items'>
      <div className="dashboard-item db-chart" id='connections-pie'>
        <div className="dashboard-item-content">
          Pie Chart for Active/ Inactive Connections Count
        </div>
      </div>

      <div className="dashboard-item db-textbox" id=''>
        <div className="dashboard-item-content">
          Pie Chart for Active/ Inactive Connections Count
        </div>
      </div>

      <div className="dashboard-item" id=''>
        <div className="dashboard-item-content">
          Pie Chart for Active/ Inactive Connections Count
        </div>
      </div>
    </div>
  )
}
