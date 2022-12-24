import React, { useContext, useState } from "react";
import CustomerContext from './CustomerContext'
import AlertContext from "../alert/AlertContext"
import getListURL from '../../functions/URLs'

const CustomerState = (props) => {
  const { showAlert } = useContext(AlertContext)

  const host = process.env.REACT_APP_HOST
  const [customers, setCustomers] = useState([])
  const [customersCount, setCustomersCount] = useState(0)
  const [customersNext, setCustomersNext] = useState('')

  const [dealers, setDealers] = useState([])
  const [dealersCount, setDealersCount] = useState(0)
  const [dealersNext, setDealersNext] = useState('')

  const blankFields = {
    id: '',
    customer_type: '',
    first_name: '',
    last_name: '',
    contact: '',
    email: '',
    biography: '',
    street_address: '',
    subarea: ''
  }

  const [customer, setCustomer] = useState(blankFields)

  // Get all Customers
  const getAllCustomers = async (sortField = 'first_name', sort = 'ASC', search = '', filterField = '') => {
    const url = getListURL('customerapirelated', sortField, sort, search, filterField)
    console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setCustomersCount(json.count)
    setCustomers(json.results)
    setCustomersNext(json.next)
  }

  // Append more records used for pagination
  const getMoreCustomers = async () => {
    const url = customersNext
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setCustomers(customers.concat(json.results))
    setCustomersNext(json.next)
  }


  // Get all Dealers
  const getAllDealers = async (sortField = 'first_name', sort = 'ASC', search = '', filterField = '') => {
    const url = getListURL('dealerapirelated', sortField, sort, search, filterField)
    console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setDealersCount(json.count)
    setDealers(json.results)
    setDealersNext(json.next)
  }

  // Append more dealers used for pagination
  const getMoreDealers = async () => {
    const url = dealersNext
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setDealers(dealers.concat(json.results))
    setDealersNext(json.next)
  }

  // Add Record
  const addCustomer = async (customer_type) => {
    // Add record to server
    const url = `${host}customerapi/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },

      body: JSON.stringify(customer)
    });
    showAlert(response.status, customer.first_name + ' ' + customer.last_name)

    // Add record to frontend
    if (response.ok) {
      const json = await response.json();
      setCustomer(json)
      // setCustomers(customers.concat(customer))
      if (customer_type === 'Individual') {
        getAllCustomers()
      } else if (customer_type === 'Dealer') {
        getAllDealers()
      }
    }
  }


  // Update Record
  const updateCustomer = async () => {
    // Update record to server side
    const url = `${host}customerapi/${customer.id}/`

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
      body: JSON.stringify(customer)
    });
    // const json = await response.json();
    showAlert(response.status, customer.first_name + ' ' + customer.last_name)


    // Update record in frontend
    if (response.ok) {
      getAllCustomers()
    }
  }


  // Delete Record
  const deleteCustomer = async (customer_type) => {
    // delete record from server using API
    const url = `${host}customerapi/${customer.id}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });

    // delete record from frontend
    if (customer_type === 'Individual') {
      if (response.ok) {
        const customersLeft = customers.filter((Customer) => { return Customer.id !== customer.id })
        setCustomers(customersLeft)
        setCustomersCount(customersLeft.length)
      } else {
        showAlert(response.status, customer.first_name + ' ' + customer.last_name)
      }

    } else if (customer_type === 'Dealer') {
      if (response.ok) {
        const dealersLeft = dealers.filter((Dealer) => { return Dealer.id !== customer.id })
        setDealers(dealersLeft)
        setDealersCount(dealersLeft.length)
      } else {
        showAlert(response.status, customer.first_name + ' ' + customer.last_name)
      }
    }
  }


  return (
    <CustomerContext.Provider value={{ blankFields, customers, customer, customersCount, customersNext, dealers, dealersCount, dealersNext, getAllDealers, getMoreDealers, setCustomer, getAllCustomers, getMoreCustomers, addCustomer, updateCustomer, deleteCustomer }}>
      {props.children}
    </CustomerContext.Provider>
  )
}

export default CustomerState;