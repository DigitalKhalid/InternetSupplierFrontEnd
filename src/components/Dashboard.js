import '../assets/css/Dashboard.css'
import React, { useEffect } from 'react'
import { updateConnectionOrderRenewal } from '../functions/Orders'
import { updateExpiredConnectionStatus } from '../functions/Connections'
import PieChart from './PieChart'
import { useDispatch, useSelector } from 'react-redux'
import { getConnectionsDashboard, getPaymentsDashboard } from '../features/dashboard/dashboardSlice'
// import { bindActionCreators } from 'redux'
// import { actionCreators } from '../state/index'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const connections_archived = useSelector((state) => state.dashboard.connections.connections_archived)
  const connections_active = useSelector((state) => state.dashboard.connections.connections_active)
  const connections_inactive = useSelector((state) => state.dashboard.connections.connections_inactive)

  const payment_today = useSelector((state) => state.dashboard.payments.payment_today)
  const payment_this_month = useSelector((state) => state.dashboard.payments.payment_this_month)
  const payment_this_year = useSelector((state) => state.dashboard.payments.payment_this_year)

  useEffect(() => {
    updateConnectionOrderRenewal()
    updateExpiredConnectionStatus()
    dispatch(getConnectionsDashboard())
    dispatch(getPaymentsDashboard())
  }, [])

  return (
    <div className="dashboard-container">
      <div className='dashboard-group-title'>Cash Collection:</div>
      <div className='dashboard-items'>
        <div className="dashboard-item db-textbox" id=''>
          <div className="dashboard-item-content">
            Today: <strong> {payment_today>0? payment_today.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'):'0.00'}</strong>
          </div>
        </div>

        <div className="dashboard-item db-textbox" id=''>
          <div className="dashboard-item-content">
            This Month: <strong>{payment_this_month?payment_this_month.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'):'0.00'}</strong>
          </div>
        </div>

        <div className="dashboard-item db-textbox" id=''>
          <div className="dashboard-item-content">
            This Year: <strong>{payment_this_year>0?payment_this_year.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'):'0.00'}</strong>
          </div>
        </div>
      </div>

      <br />

      <div className='dashboard-group-title'>Connections:</div>
      <div className='dashboard-items'>
        <div className="dashboard-item db-piechart" id='connections-pie'>
          <div className="dashboard-item-content">
            {<PieChart value={connections_active} color='yellowgreen' width={'200px'} />}
            <br />
            <strong>Active</strong>
          </div>
        </div>

        <div className="dashboard-item db-piechart" id='connections-pie'>
          <div className="dashboard-item-content">
            {<PieChart value={connections_inactive} color='red' width={'200px'} />}
            <br />
            <strong>Inactive</strong>
          </div>
        </div>

        <div className="dashboard-item db-piechart" id='connections-pie'>
          <div className="dashboard-item-content">
            {<PieChart value={connections_archived} color='orange' width={'200px'} />}
            <br />
            <strong>Archieved</strong>
          </div>
        </div>
      </div>

      <br />

      {/* <div className='dashboard-group-title'>Cash Collection History (Last Six Months):</div>
      <div className='dashboard-items'>
        <div className="dashboard-item db-barchart" id='connections-pie'>
          <div className="dashboard-item-content">
            {<BarChart data={chartData} />}
          </div>
        </div>
      </div> */}

    </div>
  )
}
