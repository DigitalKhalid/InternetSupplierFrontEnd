import React, { useContext, useState, useEffect } from "react";
import CustomerContext from './CustomerContext'
import LoginContext from "../login/LoginContext";
import AlertContext from "../alert/AlertContext"

const CustomerState = (props) => {
  const { authToken, setAuthToken } = useContext(LoginContext)
  const { toggleAlert } = useContext(AlertContext)

  const host = process.env.REACT_APP_HOST
  const [customers, setCustomers] = useState([])
  const blankFields = {
    id: '',
    first_name: '',
    last_name: '',
    contact: '',
    email: '',
    biography: '',
    street_address: '',
    area: '',
    city: '',
    image: ''
  }

  const [customer, setCustomer] = useState(blankFields)

  const removeKeys = (key) => {
    const copy = customer // make a copy of dictionary
    delete copy[key] // remove id and image fields (keys of dictionary)
    setCustomer(copy)
  }

  useEffect(() => {
    setAuthToken(localStorage.getItem('authtoken'))
  }, [authToken])

  const showAlert = (status)=>{
  if (status === 200) {
    toggleAlert('success', 'Information of ' + customer.first_name + ' ' + customer.last_name + ' is updated!')
  } else if (status === 201){
    toggleAlert('success', 'New customer, ' + customer.first_name + ' ' + customer.last_name + ' is added!')
  } else if (status === 400){
    toggleAlert('error', '(' + status + ') Unable to recognize your action. Please contact vendor.')
  } else if (status === 401){
    toggleAlert('error', '(' + status + ') Application is unable to recognize your identity. Please login through valid credentials.')
  } else if (status === 403){
    toggleAlert('warning', '(' + status + ') You are not authorize to perform this action.')
  } else if (status === 404){
    toggleAlert('error', '(' + status + ') Information not found. Unable to process your requested.')
  } else if (status > 499){
    toggleAlert('error', '(' + status + ') Application is unable to connect to the server.')
  }}


  // Get all Records
  const getAllCustomers = async () => {
    console.log(authToken)
    const url = `${host}customerapi/`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken
      },
    });
    const json = await response.json();
    setCustomers(json)
    showAlert(response.status)
  }


  // Add Record
  const addCustomer = async () => {
    removeKeys(('id', 'image'))

    // Add record to server
    const url = `${host}customerapi/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken
      },

      body: JSON.stringify(customer)
    });
    showAlert(response.status)

    // Add record to frontend
    const json = await response.json();
    setCustomers(customers.concat(customer))
  }


  // Update Record
  const updateCustomer = async () => {
    removeKeys(('id', 'image'))

    // Update record to server side
    const url = `${host}customerapi/${customer.id}/`

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken
      },
      body: JSON.stringify(customer)
    });
    const json = await response.json();
    showAlert(response.status)


      // Update record in frontend
      let newCustomers = JSON.parse(JSON.stringify(customers))
    for (let index = 0; index < customers.length; index++) {
      const element = newCustomers[index];
      if (element.id === customer.id) {
        newCustomers[index] = customer
        break
      }
    }
    setCustomers(newCustomers)
  }


  // Delete Record
  const deleteCustomer = async (id) => {
    // delete record from server using API
    const url = `${host}customerapi/${id}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + authToken
      },
    });

    // delete record from frontend
    const customersLeft = customers.filter((customer) => { return customer.id !== id })
    setCustomers(customersLeft)
  }


  return (
    <CustomerContext.Provider value={{ blankFields, customers, customer, setCustomer, getAllCustomers, addCustomer, updateCustomer, deleteCustomer }}>
      {props.children}
    </CustomerContext.Provider>
  )
}

export default CustomerState;