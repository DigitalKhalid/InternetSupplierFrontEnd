import React from 'react'
import { Sidebar } from './Sidebar/Sidebar.js'
import '../components/Content.css'
import { User } from './contents/User'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CustomersList } from './contents/CustomersList.js'
import CustomerState from '../context/CustomerState'

export const Content = () => {
    return (
        <>
            <CustomerState>
                <Router>
                    <div className="main">
                        <Sidebar />
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <div className="container-content">
                                        <div className='content'>
                                            <div className="content-header">
                                                Dashboard
                                            </div>

                                            <div className="content-body">

                                            </div>
                                        </div>
                                    </div>
                                }
                            />

                            <Route
                                path='/admin/addcustomer'
                                element={
                                    <div className="container-content">
                                        <div className='content'>
                                            <div className="content-header">
                                                Add New Customer
                                            </div>

                                            <div className="content-body">
                                                <User />
                                            </div>
                                        </div>
                                    </div>
                                }
                            />

                            <Route
                                path='/admin/customerslist'
                                element={
                                    <div className="container-content">
                                        <div className='content'>
                                            <div className="content-header">
                                                Customers List
                                            </div>
                                            <div className="content-body">
                                                <CustomersList />
                                            </div>
                                        </div>
                                    </div>
                                }
                            />

                            <Route
                                path='/admin/connections'
                                element={
                                    <div className="container-content">
                                        <div className='content'>
                                            <div className="content-header">
                                                Connections
                                            </div>
                                            <div className="content-body">

                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        </Routes>
                    </div>
                </Router>
            </CustomerState>
        </>
    )
}
