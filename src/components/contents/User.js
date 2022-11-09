import './User.css'
import React from 'react'

export const User = () => {
  return (
    <div className='container col-md-8'>
      <form className="row g-2">
        <div className="col-md-10">
          <p className='title required'><strong>User Information</strong></p>
          <input type="text" className="form-control" id="userid" placeholder=""></input>
          <p className='label'>User ID</p>
        </div>

        <div className="col-md-5">
          <p className='title required'><strong>Full Name</strong></p>
          <input type="text" className="form-control" id="firstname" placeholder=""></input>
          <p className='label'>First Name</p>
        </div>

        <div className="col-md-5">
          <p className='title'><strong></strong></p>
          <input type="text" className="form-control" id="lastname" placeholder=""></input>
          <p className='label'>Last Name</p>
        </div>

        <div className="col-md-5">
          <p className='title required'><strong>Email Address</strong></p>
          <input type="email" className="form-control" id="email" placeholder=""></input>
          <p className='label'></p>
        </div>

        <div className="col-md-5">
          <p className='title required'><strong>Contact No.</strong></p>
          <input type="text" className="form-control" id="email" placeholder=""></input>
          <p className='label'></p>
        </div>

        <div className="col-md-10">
          <p className='title required'><strong>Address</strong></p>
          <input type="text" className="form-control" id="email" placeholder=""></input>
          <p className='label'>Street Address</p>
        </div>

        <div className="col-md-5">
          {/* <p className='title'><strong></strong></p> */}
          <input type="text" className="form-control" id="email" placeholder=""></input>
          <p className='label'>Area</p>
        </div>

        <div className="col-md-5">
          {/* <p className='title'><strong></strong></p> */}
          <select className="form-select" aria-label="Default select example" defaultValue=''>
            <option value="1">Rawalpindi</option>
            <option value="2">Islamabad</option>
          </select>
          <p className='label'>City</p>
        </div>
        <div className="container">
          {/* <span> */}
            <div className='form-btn'>
              <button className='btn btn-primary'>
                Save
              </button>
            </div>
          {/* </span> */}
        </div>
      </form>
    </div>
  )
}
