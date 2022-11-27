import '../assets/css/List.css'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CustomerContext from '../context/customer/CustomerContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import EditCustomerForm from './EditCustomerForm'

export const CustomersList = () => {
    const context = useContext(CustomerContext)
    const { customers, setCustomer, getAllCustomers, deleteCustomer, updateCustomer } = context
    const { togglePopup } = useContext(PopupContext)

    useEffect(() => {
        getAllCustomers()
        //   eslint-disable-next-line
    }, [])

    const openEditPopup = (customer) => {
        setCustomer(customer)
        togglePopup()
    }

    const updateCustomerClose = () => {
        updateCustomer()
        togglePopup()
    }

    return (
        <>
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Contact No.</th>
                            <th>Email</th>
                            <th>Area</th>
                            <th>City</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => {
                            return (
                                <tr key={index}>
                                    <td>{customer.id}</td>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.contact}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.area}</td>
                                    <td>{customer.city}</td>
                                    <td >
                                        <Link className='action-btn' onClick={() => deleteCustomer(customer.id)} ><i className='fa fa-trash-can'></i></Link>
                                        <Link className='action-btn' onClick={() => openEditPopup(customer)} ><i className='fa fa-pen-to-square'></i></Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="my-pagination">
                <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                        <a className="page-link" href='/'>Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="/">1</a></li>
                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="/">Next</a>
                    </li>
                </ul>
            </div>
            <div>
                <Popup header='Edit Customer' body={<EditCustomerForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateCustomerClose} />
            </div>
        </>
    )
}
