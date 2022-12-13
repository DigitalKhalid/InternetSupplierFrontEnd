import './App.css';
import './assets/css/Admin.css'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import PopupState from './context/popup/PopupState.js'
import LoginState from './context/login/LoginState';

import { Sidebar } from './components/Sidebar'
import { Customers } from './components/Customers.js'
import { Dashboard } from './components/Dashboard.js'
import { Connections } from './components/Connections.js'
import AdminHeader from './components/AdminHeader'
import AdminFooter from './components/AdminFooter'
import CustomerState from './context/customer/CustomerState';
import Alerts from './components/Alerts';
import AlertState from './context/alert/AlertState';
import applyTheme from './functions/Theme';

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from './state/index'
import ConnectionState from './context/connection/ConnectionState';
import CountryState from './context/country/CountryState';
import { Countries } from './components/Countries';
import { Cities } from './components/Cities';
import CityState from './context/city/CityState';
import { Areas } from './components/Areas'
import AreaState from './context/area/AreaState'
import SubAreaState from './context/subarea/SubAreaState';
import { SubAreas } from './components/SubAreas';
import Error from './components/Error';
import { Products } from './components/Products';
import ProductState from './context/product/ProductState';
import { Orders } from './components/Orders';
import { OrderDetails } from './components/OrderDetails';
import OrderState from './context/order/OrderState';
import OrderDetailState from './context/orderdetail/OrderDetailState';

function App() {
  const dispatch = useDispatch();
  const { authenticate } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    localStorage.getItem('theme') ? applyTheme(localStorage.getItem('theme')) : applyTheme('light')
    authenticate(localStorage.getItem('authtoken'), localStorage.getItem('username'))
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <AlertState>
        <LoginState>
          <PopupState>
            <ConnectionState>
              <CustomerState>
                <CountryState>
                  <CityState>
                    <AreaState>
                      <SubAreaState>
                        <ProductState>
                          <OrderState>
                            <OrderDetailState>
                              <Router>
                                <Routes>
                                  <Route path='/admin/login' element={<Login />} />
                                  <Route path='/error' element={<Error />} />

                                  {<Route path='/admin/*' element={
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

                                          <Route path='customers' element={
                                            <div className="container-content">
                                              <div className='content'>
                                                <div className="content-header">
                                                  Customers List
                                                  <div className='alerts'>
                                                    <Alerts />
                                                  </div>
                                                </div>
                                                <div className="content-body">
                                                  <Customers />
                                                </div>
                                              </div>
                                            </div>} />

                                          <Route path='connections' element={
                                            <div className="container-content">
                                              <div className='content'>
                                                <div className="content-header">
                                                  Connections
                                                  <div className='alerts'>
                                                    <Alerts />
                                                  </div>
                                                </div>
                                                <div className="content-body">
                                                  <Connections />
                                                </div>
                                              </div>
                                            </div>} />

                                          <Route path='countries' element={
                                            <div className="container-content">
                                              <div className='content'>
                                                <div className="content-header">
                                                  Countries
                                                  <div className='alerts'>
                                                    <Alerts />
                                                  </div>
                                                </div>
                                                <div className="content-body">
                                                  <Countries />
                                                </div>
                                              </div>
                                            </div>} />

                                          <Route path='cities' element={
                                            <div className="container-content">
                                              <div className='content'>
                                                <div className="content-header">
                                                  Cities
                                                  <div className='alerts'>
                                                    <Alerts />
                                                  </div>
                                                </div>
                                                <div className="content-body">
                                                  <Cities />
                                                </div>
                                              </div>
                                            </div>} />

                                          <Route path='areas' element={
                                            <div className="container-content">
                                              <div className='content'>
                                                <div className="content-header">
                                                  Areas
                                                  <div className='alerts'>
                                                    <Alerts />
                                                  </div>
                                                </div>
                                                <div className="content-body">
                                                  <Areas />
                                                </div>
                                              </div>
                                            </div>} />

                                          <Route path='subareas' element={
                                            <div className="container-content">
                                              <div className='content'>
                                                <div className="content-header">
                                                  Sub Areas
                                                  <div className='alerts'>
                                                    <Alerts />
                                                  </div>
                                                </div>
                                                <div className="content-body">
                                                  <SubAreas />
                                                </div>
                                              </div>
                                            </div>} />

                                          <Route path='packages' element={
                                            <div className="container-content">
                                              <div className='content'>
                                                <div className="content-header">
                                                  Packages
                                                  <div className='alerts'>
                                                    <Alerts />
                                                  </div>
                                                </div>
                                                <div className="content-body">
                                                  <Products productCatagory='Package' />
                                                </div>
                                              </div>
                                            </div>} />

                                          <Route path='invoices' element={
                                            <div className="container-content">
                                              <div className='content'>
                                                <div className="content-header">
                                                  Invoices
                                                  <div className='alerts'>
                                                    <Alerts />
                                                  </div>
                                                </div>
                                                <div className="content-body">
                                                  <Orders />
                                                </div>
                                              </div>
                                            </div>} />

                                          <Route path='invoicedetails' element={
                                            <div className="container-content">
                                              <div className='content'>
                                                <div className="content-header">
                                                  Invoice Details
                                                  <div className='alerts'>
                                                    <Alerts />
                                                  </div>
                                                </div>
                                                <div className="content-body">
                                                  <OrderDetails />
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
                            </OrderDetailState>
                          </OrderState>
                        </ProductState>
                      </SubAreaState>
                    </AreaState>
                  </CityState>
                </CountryState>
              </CustomerState>
            </ConnectionState>
          </PopupState>
        </LoginState>
      </AlertState>
    </>
  );
}

export default App;
