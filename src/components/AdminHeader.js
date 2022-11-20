import React, { useContext } from 'react'
import LoginContext from '../context/login/LoginContext'
import { Link, useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  const {setAuthToken} = useContext(LoginContext)
  const navigate = useNavigate()

  const handleLogout = ()=>{
    setAuthToken(null)
    localStorage.clear()
    navigate('/admin/login')
  }

  return (
    <div className='admin-header'>
      <div className="org">
        <strong>ClickPick</strong> Internet Services
      </div>
      <div className='admin-header-content'>
        <span className='admin-header-icon'><i className='fa-regular fa-comments' name='notifications'></i></span>
        <span className='admin-header-icon'><i className='fa fa-list-check' name='logs'></i></span>
        <span className='admin-header-icon'><i className='fa fa-arrow-right-from-bracket' name='logout' onClick={handleLogout}></i></span>
      </div>
    </div>
  )
}

export default AdminHeader