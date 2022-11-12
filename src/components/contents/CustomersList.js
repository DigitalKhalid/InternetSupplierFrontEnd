import React, {useContext} from 'react'
import './CustomerList.css'
import { Link } from 'react-router-dom'
import CustomerContext from '../../context/customer/CustomerContext'

export const CustomersList = () => {
    const context = useContext(CustomerContext)
    const {customers, updateCustomer, deleteCustomer} = context

    const editCustomer = ()=>{

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
                                    <td>{customer.city}</td>
                                    <td>{customer.area}</td>
                                    <td >
                                        <Link className='action-btn' onClick={()=>deleteCustomer(customer.id)} ><i className='fa fa-trash-can'></i></Link>
                                        <Link className='action-btn' onClick={editCustomer} ><i className='fa fa-pen-to-square'></i></Link>
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
        </>
    )
}
