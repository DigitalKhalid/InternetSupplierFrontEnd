import './NewCustomer.css'
import React, { useState, useContext } from 'react'
import CustomerContext from '../../context/customer/CustomerContext'

export const NewCustomer = () => {
  const context = useContext(CustomerContext)
  const { addCustomer } = context

  const [customer, setCustomer] = useState({
    first_name:'',
    last_name:'',
    contact:'',
    biography:'',
    street_address:'',
    area:'',
    city:'',
    image:'',
  })

  const saveCustomer = (event) => {
    event.preventDefault(); //to prevent page reloading on function call
    addCustomer(customer);
  }

  const handleOnChange = (event) => {
    setCustomer({...customer, [event.target.name]:event.target.value})
  }

  return (
    <div className='container col-md-8'>
      <form className="row g-2">
        {/* <div className="col-md-10">
          <p className='title required'><strong>Customer Information</strong></p>
          <input type="text" className="form-control" id="customerid" name='customerid' placeholder="" onChange={handleOnChange} ></input>
          <p className='label'>Customer ID</p>
        </div> */}

        <div className="col-md-5">
          <p className='title required'><strong>Full Name</strong></p>
          <input type="text" className="form-control" id="first_name" name='first_name' placeholder="" onChange={handleOnChange} ></input>
          <p className='label'>First Name</p>
        </div>

        <div className="col-md-5">
          <p className='title'><strong></strong></p>
          <input type="text" className="form-control" id="last_name" name='last_name' placeholder="" onChange={handleOnChange} ></input>
          <p className='label'>Last Name</p>
        </div>

        <div className="col-md-5">
          <p className='title required'><strong>Email Address</strong></p>
          <input type="email" className="form-control" id="email" name='email' placeholder="" onChange={handleOnChange} ></input>
          <p className='label'></p>
        </div>

        <div className="col-md-5">
          <p className='title required'><strong>Contact No.</strong></p>
          <input type="text" className="form-control" id="contact" name='contact' placeholder="" onChange={handleOnChange} ></input>
          <p className='label'></p>
        </div>

        <div className="col-md-10">
          <p className='title required'><strong>Address</strong></p>
          <input type="text" className="form-control" id="address" name='address' placeholder="" onChange={handleOnChange} ></input>
          <p className='label'>Street Address</p>
        </div>

        <div className="col-md-5">
          {/* <p className='title'><strong></strong></p> */}
          <input type="text" className="form-control" id="area" name='area' placeholder="" onChange={handleOnChange} ></input>
          <p className='label'>Area</p>
        </div>

        <div className="col-md-5">
          {/* <p className='title'><strong></strong></p> */}
          <select className="form-select" id='city' name='city' aria-label="Default select example" defaultValue='0' onChange={handleOnChange}>
            <option value=""></option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Islamabad">Islamabad</option>
          </select>
          <p className='label'>City</p>
        </div>
        <div className="container">
          {/* <span> */}
          <div className='form-btn'>
            <button className='btn btn-primary' onClick={saveCustomer}>
              Save
            </button>
          </div>
          {/* </span> */}
        </div>
      </form>
    </div>
  )
}
