import '../assets/css/Spinner.css'
import React from 'react'
// import spin from '../assets/images/Wifi-200px.svg'
// import spinner from '../assets/images/Radio-1s-200px.svg'
import spinner from '../assets/images/Ellipsis-1s-100px.svg'

const Spinner = () => {
  return (
    <>    
      <div className='spinner'>
        <img src={spinner} alt="" />
      </div>
    </>
  )
}

export default Spinner