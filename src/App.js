import './assets/css/Admin.css'
import './assets/css/Themes.css'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import PopupState from './context/popup/PopupState.js'

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

// import { useDispatch } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { actionCreators } from './state/index'
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
import PaymentState from './context/payment/PaymentState';
import { Payments } from './components/Payments';
import Invoice from './reports/Invoice';
import InvoiceState from './context/invoice/InvoiceState';
import Dealers from './components/Dealers'
import Bill from './reports/Bill';
import MyAccount from './components/MyAccount'
import Settings from './components/Settings';
import About from './components/About';
import BarChart from './components/BarChart';
import { Complaints } from './components/Complaints';
// import LoadingBar from 'react-top-loading-bar'

function App() {
  // const dispatch = useDispatch();
  // const { authenticate } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    localStorage.getItem('theme') ? applyTheme(localStorage.getItem('theme')) : applyTheme('light')
    // authenticate(localStorage.getItem('authtoken'), localStorage.getItem('username'))
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <AlertState>
        <PopupState>
          <ConnectionState>
            <CustomerState>
              <CountryState>
                <CityState>
                  <AreaState>
                    <SubAreaState>
                      <ProductState>
                        <OrderState>
                          <PaymentState>
                            <OrderDetailState>
                              <InvoiceState>
                                <Router>
                                  <Routes>
                                    <Route path='login' element={<Login />} />
                                    <Route path='error' element={<Error />} />

                                    {<Route path='/*' element={
                                      <div className='admin'>
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
                                                    Customers
                                                    <div className='alerts'>
                                                      <Alerts />
                                                    </div>
                                                  </div>
                                                  <div className="content-body">
                                                    <Customers />
                                                  </div>
                                                </div>
                                              </div>} />

                                            <Route path='dealers' element={
                                              <div className="container-content">
                                                <div className='content'>
                                                  <div className="content-header">
                                                    Dealers
                                                    <div className='alerts'>
                                                      <Alerts />
                                                    </div>
                                                  </div>
                                                  <div className="content-body">
                                                    <Dealers />
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

                                            <Route path='orders/invoices' element={
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

                                            <Route path='orders/invoice/invoicedetails' element={
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

                                            <Route path='orders/payments' element={
                                              <div className="container-content">
                                                <div className='content'>
                                                  <div className="content-header">
                                                    Payments
                                                    <div className='alerts'>
                                                      <Alerts />
                                                    </div>
                                                  </div>
                                                  <div className="content-body">
                                                    <Payments />
                                                  </div>
                                                </div>
                                              </div>} />

                                            <Route path='library/locations/countries' element={
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

                                            <Route path='library/locations/cities' element={
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

                                            <Route path='library/locations/areas' element={
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

                                            <Route path='library/locations/subareas' element={
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

                                            <Route path='store/packages' element={
                                              <div className="container-content">
                                                <div className='content'>
                                                  <div className="content-header">
                                                    Packages
                                                    <div className='alerts'>
                                                      <Alerts />
                                                    </div>
                                                  </div>
                                                  <div className="content-body">
                                                    <Products productType='Package' />
                                                  </div>
                                                </div>
                                              </div>} />

                                            <Route path='store/products' element={
                                              <div className="container-content">
                                                <div className='content'>
                                                  <div className="content-header">
                                                    Products
                                                    <div className='alerts'>
                                                      <Alerts />
                                                    </div>
                                                  </div>
                                                  <div className="content-body">
                                                    <Products productType='Product' />
                                                  </div>
                                                </div>
                                              </div>} />

                                            <Route path='store/services' element={
                                              <div className="container-content">
                                                <div className='content'>
                                                  <div className="content-header">
                                                    Services
                                                    <div className='alerts'>
                                                      <Alerts />
                                                    </div>
                                                  </div>
                                                  <div className="content-body">
                                                    <Products productType='Service' />
                                                  </div>
                                                </div>
                                              </div>} />

                                            <Route path='myaccount' element={
                                              <div className="container-content">
                                                <div className='content'>
                                                  <div className="content-header">
                                                    My Account
                                                    <div className='alerts'>
                                                      <Alerts />
                                                    </div>
                                                  </div>
                                                  <div className="content-body">
                                                    <MyAccount />
                                                  </div>
                                                </div>
                                              </div>} />

                                            <Route path='settings' element={
                                              <div className="container-content">
                                                <div className='content'>
                                                  <div className="content-header">
                                                    Settings
                                                    <div className='alerts'>
                                                      <Alerts />
                                                    </div>
                                                  </div>
                                                  <div className="content-body">
                                                    <Settings />
                                                  </div>
                                                </div>
                                              </div>} />

                                            <Route path='complaints' element={
                                              <div className="container-content">
                                                <div className='content'>
                                                  <div className="content-header">
                                                    Complaints
                                                    <div className='alerts'>
                                                      <Alerts />
                                                    </div>
                                                  </div>
                                                  <div className="content-body">
                                                    <Complaints />
                                                  </div>
                                                </div>
                                              </div>} />

                                            <Route path='About' element={
                                              <div className="container-content">
                                                <div className='content'>
                                                  <div className="content-header">
                                                    About
                                                    <div className='alerts'>
                                                      <Alerts />
                                                    </div>
                                                  </div>
                                                  <div className="content-body">
                                                    <About />
                                                  </div>
                                                </div>
                                              </div>} />

                                          </Routes>
                                        </div>
                                        <AdminFooter />
                                      </div>
                                    } />}

                                    <Route path='/order/invoice/print-a4' element={<Invoice />} />
                                    <Route path='/payment/bill/print' element={<Bill />} />
                                    <Route path='/barchart' element={<BarChart />} />
                                  </Routes>
                                </Router>
                              </InvoiceState>
                            </OrderDetailState>
                          </PaymentState>
                        </OrderState>
                      </ProductState>
                    </SubAreaState>
                  </AreaState>
                </CityState>
              </CountryState>
            </CustomerState>
          </ConnectionState>
        </PopupState>
      </AlertState>
    </>
  );
}

export default App;
