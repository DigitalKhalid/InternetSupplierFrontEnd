import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { actionCreators } from '../state/index'

export const Dashboard = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('authtoken')) {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {/* <ul> */}
        {/* {country.map((item) => {
          return (
            <li>{item.id} - {item.country}</li>
          )
        })} */}
      {/* </ul> */}

    </div>
  )
}
