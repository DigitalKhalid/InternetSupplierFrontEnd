import React from 'react'

const AdminFooter = () => {
  return (
    <div className='admin-footer'>
        <small>Copyright © {new Date().getFullYear()} | Powerd by </small><a href="https://bizzsole.com" target='_blank' rel="noreferrer"><strong>BizzSole</strong></a>
    </div>
  )
}

export default AdminFooter