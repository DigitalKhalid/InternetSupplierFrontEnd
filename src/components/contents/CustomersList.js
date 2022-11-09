import React from 'react'
import data from './CustomerList.json'
import './CustomerList.css'
import { Link } from 'react-router-dom'

export const CustomersList = () => {
    return (
        <>
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Contact No.</th>
                            <th>Email</th>
                            <th>Area</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.contactno}</td>
                                    <td>{value.email}</td>
                                    <td>{value.area}</td>
                                    <td >
                                        <Link className='action-btn'><i className='fa fa-trash-can'></i></Link>
                                        <Link className='action-btn'><i className='fa fa-pen-to-square'></i></Link>
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
