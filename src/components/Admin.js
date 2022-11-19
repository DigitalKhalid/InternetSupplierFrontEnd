import '../assets/css/Admin.css'
import React from 'react'
import CustomerState from '../context/customer/CustomerState'
// import PopupState from '../context/popup/PopupState.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sidebar } from './Sidebar.js'
import { NewCustomer } from './NewCustomer'
import { CustomersList } from './CustomersList.js'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'

export const Admin = () => {
    return (
        <>
            {/* <PopupState> */}
                <CustomerState>
                    <Router>
                        {/* Admin */}
                        <AdminHeader />
                        <div className="main">
                            <Sidebar />
                            <Routes>
                                <Route
                                    path='/admin'
                                    element={
                                        <div className="container-content">
                                            <div className='content'>
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
                                                    <NewCustomer />
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
                        <AdminFooter />
                    </Router>
                </CustomerState>
            {/* </PopupState> */}
        </>
    )
}
