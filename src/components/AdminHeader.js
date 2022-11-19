import React from 'react'

const AdminHeader = () => {
  return (
    <div className='admin-header'>
      <div className="org">
        <strong>ClickPick</strong> Internet Services
      </div>
      <div className='admin-header-content'>
        <span className='admin-header-icon'><i className='fa-regular fa-comments'></i></span>
        <span className='admin-header-icon'><i className='fa fa-list-check'></i></span>
        <span className='admin-header-icon'><i className='fa fa-arrow-right-from-bracket'></i></span>
      </div>
    </div>
  )
}

export default AdminHeader