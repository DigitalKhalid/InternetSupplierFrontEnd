import './App.css';
import './assets/css/Admin.css'
import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import PopupState from './context/popup/PopupState.js'
import LoginState from './context/login/LoginState';

import { Sidebar } from './components/Sidebar'
import { NewCustomer } from './components/NewCustomer'
import { CustomersList } from './components/CustomersList.js'
import { Dashboard } from './components/Dashboard.js'
import { Connections } from './components/Connections.js'
import AdminHeader from './components/AdminHeader'
import AdminFooter from './components/AdminFooter'
import CustomerState from './context/customer/CustomerState';
import LoginContext from './context/login/LoginContext';

function App() {  
  useEffect(() => {
    console.log(localStorage.getItem('authtoken'))
  }, [localStorage.getItem('authtoken')])

  return (
    <>
      <LoginState>
        <PopupState>
          <CustomerState>
            <Router>
              <Routes>
                <Route path='/admin/login' element={<Login />} />
                {localStorage.getItem('authtoken') && <Route path='/admin/*' element={
                  <>
                    <AdminHeader />
                    <div className="main">
                      <Sidebar />
                      <Routes>
                        <Route path='' element={
                          <div className="container-content">
                            <div className='content'>
                              <div className="content-body">
                                <Dashboard />
                              </div>
                            </div>
                          </div>} />

                        <Route path='addcustomer' element={
                          <div className="container-content">
                            <div className='content'>
                              <div className="content-header">
                                Add New Customer
                              </div>

                              <div className="content-body">
                                <NewCustomer />
                              </div>
                            </div>
                          </div>} />

                        <Route path='customerslist' element={
                          <div className="container-content">
                            <div className='content'>
                              <div className="content-header">
                                Customers List
                              </div>
                              <div className="content-body">
                                <CustomersList />
                              </div>
                            </div>
                          </div>} />

                        <Route path='connections' element={
                          <div className="container-content">
                            <div className='content'>
                              <div className="content-header">
                                Connections
                              </div>
                              <div className="content-body">
                                <Connections />
                              </div>
                            </div>
                          </div>} />
                      </Routes>
                    </div>
                    <AdminFooter />
                  </>
                } />}
              </Routes>
            </Router>
          </CustomerState>
        </PopupState>
      </LoginState>
    </>
  );
}

export default App;
