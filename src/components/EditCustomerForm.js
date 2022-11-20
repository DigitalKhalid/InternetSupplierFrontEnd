import '../assets/css/NewCustomer.css'
import React, { useContext } from 'react'
import CustomerContext from '../context/customer/CustomerContext'

const EditCustomerForm = () => {
    const context = useContext(CustomerContext)
    const { customer, setCustomer } = context

    const handleOnChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    return (
        <div className='container'>
            <form className="row g-2">
                <div className="col-md-5">
                    <p className='title required'><strong>Full Name</strong></p>
                    <input type="text" className="form-control" id="first_name" name='first_name' placeholder="" defaultValue={customer.first_name} onChange={handleOnChange} ></input>
                    <p className='label'>First Name</p>
                </div>

                <div className="col-md-5">
                    <p className='title'><strong></strong></p>
                    <input type="text" className="form-control" id="last_name" name='last_name' placeholder="" defaultValue={customer.last_name} onChange={handleOnChange} ></input>
                    <p className='label'>Last Name</p>
                </div>

                <div className="col-md-5">
                    <p className='title required'><strong>Email Address</strong></p>
                    <input type="email" className="form-control" id="email" name='email' placeholder="" defaultValue={customer.email} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-5">
                    <p className='title required'><strong>Contact No.</strong></p>
                    <input type="text" className="form-control" id="contact" name='contact' placeholder="" defaultValue={customer.contact} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title required'><strong>Address</strong></p>
                    <input type="text" className="form-control" id="address" name='street_address' placeholder="" defaultValue={customer.street_address} onChange={handleOnChange} ></input>
                    <p className='label'>Street Address</p>
                </div>

                <div className="col-md-5">
                    {/* <p className='title'><strong></strong></p> */}
                    <input type="text" className="form-control" id="area" name='area' placeholder="" defaultValue={customer.area} onChange={handleOnChange} ></input>
                    <p className='label'>Area</p>
                </div>

                <div className="col-md-5">
                    {/* <p className='title'><strong></strong></p> */}
                    <select className="form-select" id='city' name='city' aria-label="Default select example" defaultValue={customer.city} onChange={handleOnChange}>
                        <option defaultValue=''></option>
                        <option defaultValue="Rawalpindi">Rawalpindi</option>
                        <option defaultValue="Islamabad">Islamabad</option>
                    </select>
                    <p className='label'>City</p>
                </div>
            </form>
        </div>
    )
}

export default EditCustomerForm