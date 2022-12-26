import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import applyTheme from '../functions/Theme'
import OrderContext from '../context/order/OrderContext'
import ConnectionContext from '../context/connection/ConnectionContext'
import { useSelector } from 'react-redux'

const AdminHeader = () => {
  const [theme, setTheme] = useState('light')
  const navigate = useNavigate()
  const user = useSelector((state)=> state.login.user)
  const { orders, getAllOrders, addOrderForExpiredConnections } = useContext(OrderContext)
  const { expiredConnections } = useContext(ConnectionContext)

  useEffect(() => {
    if (!localStorage.getItem('authtoken')) {
      navigate('/login')
    }
    // getAllOrders()
    // addOrderForExpiredConnections(expiredConnections)
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
        <span className='admin-header-icon'><i className='fa fa-list-check' name='logs'></i></span>
        <span className='admin-header-icon'><i className='fa fa-arrow-right-from-bracket' name='logout' onClick={handleLogout}></i></span>
      </div>
    </div>
  )
}

export default AdminHeader