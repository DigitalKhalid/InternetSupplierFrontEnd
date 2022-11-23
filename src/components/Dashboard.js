import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import { useSelector } from 'react-redux'

export const Dashboard = () => {
  const amount = useSelector(state => state.amount)

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('authtoken')) {
      navigate('/admin/login')
    }
    // eslint-disable-next-line
  }, [localStorage.getItem('authtoken')])

  return (
    <div>
      <button className='btn btn-primary' disabled={true}>Your balance is {amount}</button>
    </div>
  )
}
