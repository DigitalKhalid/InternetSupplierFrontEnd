import './User.css'
import React from 'react'

export const User = () => {
  return (
    <div>
      <form class="row g-2">
        {/* <div> */}
        <div class="col-md-12 ">
          <p className='title required'><strong>User Information</strong></p>
          <input type="text" class="form-control" id="userid" placeholder=""></input>
          <p className='label'>User ID</p>
        </div>
        {/* </div> */}

        <div class="col-md-6">
          <p className='title required'><strong>Full Name</strong></p>
          <input type="text" class="form-control" id="firstname" placeholder=""></input>
          <p className='label'>First Name</p>
        </div>

        <div class="col-md-6">
          <p className='title'><strong></strong></p>
          <input type="text" class="form-control" id="lastname" placeholder=""></input>
          <p className='label'>Last Name</p>
        </div>

        <div class="col-md-6">
          <p className='title required'><strong>Email Address</strong></p>
          <input type="email" class="form-control" id="email" placeholder=""></input>
          <p className='label'></p>
        </div>
        
        <div class="col-md-6">
          <p className='title required'><strong>Contact No.</strong></p>
          <input type="text" class="form-control" id="email" placeholder=""></input>
          <p className='label'></p>
        </div>

        <div class="col-md-12">
          <p className='title required'><strong>Address</strong></p>
          <input type="text" class="form-control" id="email" placeholder=""></input>
          <p className='label'>Street Address</p>
        </div>

        <div class="col-md-6">
          {/* <p className='title'><strong></strong></p> */}
          <input type="text" class="form-control" id="email" placeholder=""></input>
          <p className='label'>Area</p>
        </div>

        <div class="col-md-6">
          {/* <p className='title'><strong></strong></p> */}
          <select class="form-select" aria-label="Default select example">
            <option selected></option>
            <option value="1">Rawalpindi</option>
            <option value="2">Islamabad</option>
          </select>
          <p className='label'>City</p>
        </div>

      </form>
    </div>
  )
}
