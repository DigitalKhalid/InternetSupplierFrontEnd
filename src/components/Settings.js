import '../assets/css/Settings.css'
import React, { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSettings, updateSettings } from '../features/settings/settingSlice'
import AlertContext from '../context/alert/AlertContext'

const Settings = () => {
  const settings = useSelector((state) => state.setting.settings)
  const error = useSelector((state) => state.setting.error)
  const dispatch = useDispatch()
  const [setting, setSetting] = useState('')
  const { toggleAlert } = useContext(AlertContext)

  useEffect(() => {
    dispatch(getSettings())
    // eslint-disable-next-line
  }, [])

  const updateRecord = () => {
    dispatch(updateSettings(setting))
    if (error) {
      toggleAlert('error', error)
    } else {
      toggleAlert('success', 'Settings Updated.')
      document.getElementById('btn-save').hidden = true
    }
  }

  const handleOnChange = (event) => {
    if (document.getElementById('btn-save').hidden === true) {
      document.getElementById('btn-save').hidden = false
    }

    setSetting({ ...settings, [event.target.name]: event.target.value })
  }

  const handleOnCheck = (event) => {
    if (document.getElementById('btn-save').hidden === true) {
      document.getElementById('btn-save').hidden = false
    }

    setSetting({ ...settings, [event.target.name]: event.target.checked })
  }

  if (settings) {
    return (
      <div className='container'>
        <form className='settings'>
          <div className="settings-group">
            <i className='fa fa-basket-shopping'></i> Orders
          </div>
          <div className="settings-row">
            <p className='settings-label'><strong>Order ID Prefix</strong></p>
            <input type="text" className="form-control settings-field" id="order_id_prefix" name='order_id_prefix' placeholder="" defaultValue={settings.order_id_prefix} onChange={handleOnChange}></input>
          </div>
          <p className='settings-description'>Prefix will be added to all new order IDs by default.</p>
          
          <div className="settings-row">
            <p className='settings-label'><strong>Generate Order Before (Days)</strong></p>
            <input type="text" className="form-control settings-field" id="renew_order_before" name='renew_order_before' placeholder="" defaultValue={settings.renew_order_before} onChange={handleOnChange}></input>
          </div>
          <p className='settings-description'>No of Days before expiry date to generate new order for connection subscription renewal.</p>


          <div className="settings-group">
            <i className='fa fa-wifi'></i> Connections
          </div>
          <div className="settings-row">
            <p className='settings-label'><strong>Connection ID Prefix</strong></p>
            <input type="text" className="form-control settings-field" id="connection_id_prefix" name='connection_id_prefix' placeholder="" defaultValue={settings.connection_id_prefix} onChange={handleOnChange}></input>
          </div>
          <p className='settings-description'>Prefix will be added to all new connection IDs by default</p>

          <div className="settings-row">
            <p className='settings-label'><strong>Temporary Validity Extention (Days)</strong></p>
            <input type="text" className="form-control settings-field" id="temp_validity_extension" name='temp_validity_extension' placeholder="" defaultValue={settings.temp_validity_extension} onChange={handleOnChange}></input>
          </div>
          <p className='settings-description'>No. of Days will be added to the connection subscription expiry date when manually activate the inactive connection.</p>

          <div className="settings-group">
            <i className='fa fa-file-invoice'></i> Bills/ Invoices
          </div>
          <div className="settings-row">
            <p className='settings-label'><strong>Auto Print Bill</strong></p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="bill_auto_print" name='bill_auto_print' defaultChecked={settings.bill_auto_print} onClick={handleOnCheck}></input>
            </div>
          </div>
          <p className='settings-description'>Auto print a bill when receive a payment against an order.</p>

        </form>
        <button className="btn btn-primary save-btn" id='btn-save' hidden={true} onClick={updateRecord}>Save</button>
      </div>
    )
  }
}

export default Settings