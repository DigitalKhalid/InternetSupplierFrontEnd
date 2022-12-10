import React from 'react'

const AdminFooter = () => {
  return (
    <div className='admin-footer'>
      <div>
        <small>Copyright © {new Date().getFullYear()} | Powerd by </small>
      </div>
      <a href="https://bizzsole.com" target='_blank' rel="noreferrer"><strong>&nbsp;BizzSole</strong></a>
    </div>
  )
}

export default AdminFooter