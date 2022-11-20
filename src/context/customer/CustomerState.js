import React, { useContext, useState, useEffect} from "react";
import CustomerContext from './CustomerContext'
import LoginContext from "../login/LoginContext";

const CustomerState = (props) => {
  const {authToken, setAuthToken} = useContext(LoginContext)

  const host = process.env.REACT_APP_HOST
  // const authToken = '56072d4808b19e689c420e1b46a70d3ddf0aea64'
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
    console.log('get all customer: ' + authToken)
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

      body: JSON.stringify(updateCustomer) // using new copy of customer to update record having no id and image keys.
    });
    const json = await response.json();

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

    const json = await response.json()

    // delete record from frontend
    const customersLeft = customers.filter((customer) => { return customer.id !== id })
    console.log('delete customer having id ' + id)
    setCustomers(customersLeft)
  }


  return (
    <CustomerContext.Provider value={{ blankFields, customers, customer, setCustomer, getAllCustomers, addCustomer, updateCustomer, deleteCustomer }}>
      {props.children}
    </CustomerContext.Provider>
  )
}

export default CustomerState;