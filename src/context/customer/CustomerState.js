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

  const blankFields = {
    id: '',
    first_name: '',
    last_name: '',
    contact: '',
    email: '',
    biography: '',
    street_address: '',
    subarea: ''
  }

  const [customer, setCustomer] = useState(blankFields)

  // Get all Records
  const getAllCustomers = async (sortField = 'first_name', sort = 'ASC', search = '', filterField = '') => {
    const url = getListURL('customerapirelated', sortField, sort, search, filterField)

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

  // Add Record
  const addCustomer = async () => {
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
      setCustomers(customers.concat(customer))
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
  const deleteCustomer = async () => {
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
    if (response.ok) {
      const customersLeft = customers.filter((Customer) => { return Customer.id !== customer.id })
      setCustomers(customersLeft)
    } else {
      showAlert(response.status, customer.first_name + ' ' + customer.last_name)
    }
  }


  return (
    <CustomerContext.Provider value={{ blankFields, customers, customer, customersCount, customersNext, setCustomer, getAllCustomers, getMoreCustomers, addCustomer, updateCustomer, deleteCustomer }}>
      {props.children}
    </CustomerContext.Provider>
  )
}

export default CustomerState;