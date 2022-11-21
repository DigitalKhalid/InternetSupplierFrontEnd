import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/admin/login')
  }

  return (
    <div className='admin-header'>
      <div className="org">
        <strong>ClickPick</strong> Internet Services
      </div>
      <div className='admin-header-content'>
        <span className='admin-header-icon'><i className='fa-regular fa-comments' name='alerts'></i></span>
        <span className='admin-header-icon'><i className='fa fa-list-check' name='logs'></i></span>
        <span className='admin-header-icon'><i className='fa fa-arrow-right-from-bracket' name='logout' onClick={handleLogout}></i></span>
      </div>
    </div>
  )
}

export default AdminHeader