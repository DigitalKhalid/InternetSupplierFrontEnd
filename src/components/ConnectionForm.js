import '../assets/css/Form.css'
import React, { useContext, useEffect } from 'react'
import ConnectionContext from '../context/connection/ConnectionContext'
import CustomerContext from '../context/customer/CustomerContext'

const ConnectionForm = () => {
    const context = useContext(ConnectionContext)
    const { connection, setConnection } = context

    const { customers, getAllCustomers } = useContext(CustomerContext)

    useEffect(() => {
      getAllCustomers('first_name', 'ASC', '')
      // eslint-disable-next-line
    }, [])
    
    const handleOnChange = (event) => {
        setConnection({ ...connection, [event.target.name]: event.target.value })
    }

    return (
        <div className='container form'>
            <form className="row g-2">
                <div className="col-md-5">
                    <p className='title required'><strong>Connection ID</strong></p>
                    <input type="text" className="form-control" id="connection_id" name='connection_id' placeholder="" value={connection.connection_id} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-5">
                    <p className='title'><strong>Customer</strong></p>
                    <select className="form-select" id="customer" name='customer' placeholder="" value={connection.customer} onChange={handleOnChange}>
                        <option value=""></option>
                        {customers.map((customer) => {
                            return (
                                <option key={customer.id} value={customer.id}>{customer.first_name + ' ' + customer.last_name}</option>
                            )
                        })}
                    </select>
                    <p className='label'></p>
                </div>

                <div className="col-md-5">
                    <p className='title required'><strong>Installation Date</strong></p>
                    <input type="date" className="form-control" id="installation_date" name='installation_date' placeholder="" value={connection.installation_date} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-5">
                    <p className='title required'><strong>Package</strong></p>
                    <input type="text" className="form-control" id="package" name='package' placeholder="" value={connection.package} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-5">
                    <p className='title'><strong>Status</strong></p>
                    <select className="form-select" id='status' name='status' value={connection.status} onChange={handleOnChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default ConnectionForm