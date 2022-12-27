import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import applyTheme from '../functions/Theme'
import { updateExpiredConnectionStatus } from '../functions/ScheduledConnectionOrders'

const AdminHeader = () => {
  const [theme, setTheme] = useState('light')
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('authtoken')) {
      navigate('/login')
    }
    updateExpiredConnectionStatus()
    //eslint-disable-next-line
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      applyTheme('dark')

    } else if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', 'light')
      applyTheme('light')
    }
  }

  const handleLogs = () => {
    updateExpiredConnectionStatus()
  }
  // window.onunload = function () {
  //   localStorage.clear();
  // }

  return (
    <div className='admin-header'>
      <div className="org">
        <strong>ClickPick</strong> Internet Services
      </div>
      <div className='admin-header-content'>
        <span className='admin-header-icon'><i className={`${localStorage.getItem('theme') === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}`} name='alerts' onClick={toggleTheme}></i></span>
        <span className='admin-header-icon'><i className='fa-regular fa-comments' name='alerts'></i></span>
        <span className='admin-header-icon'><i className='fa fa-list-check' name='logs' onClick={handleLogs}></i></span>
        <span className='admin-header-icon'><i className='fa fa-arrow-right-from-bracket' name='logout' onClick={handleLogout}></i></span>
      </div>
    </div>
  )
}

export default AdminHeader