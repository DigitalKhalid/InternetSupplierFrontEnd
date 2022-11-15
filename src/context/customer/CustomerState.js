import React, { useState } from "react";
import CustomerContext from './CustomerContext'

const CustomerState = (props) => {
  const host = ' http://127.0.0.1:8000/'
  const authToken = '56072d4808b19e689c420e1b46a70d3ddf0aea64'
  const allCustomers = []
  const [customers, setCustomers] = useState(allCustomers)
  const [customerId, setCustomerId] = useState('')

  const [customer, setCustomer] = useState(
    {first_name:'',
    last_name:'',
    contact:'',
    email:'',
    biography:'',
    street_address:'',
    area:'',
    city:''
    }
  )

  // const callAPI = async (url, method, body='') => {
  //   const responseWithBody = await fetch(url, {
  //     method: method,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Token ' + authToken
  //     },
  //     }
  //   );

  //   const responseWithOutBody = await fetch(url, {
  //     method: method,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Token ' + authToken
  //     },
  //     body: JSON.stringify(body)
  //     }
  //   );

  //   if(body===''){
  //     responseWithOutBody
  //     const json = await responseWithOutBody.json();
  //     setCustomers(json)
  //   } else {
  //     responseWithBody
  //     const json = await responseWithBody.json();
  //     setCustomers(json)
  //   }

  //   }

    // Get all customers
    const getAllCustomers = async () => {
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
    }


    // Get One Record
    const getCustomer = async (id) => {
      const url = `${host}customerapi/${id}`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + authToken
        },
      });
      const json = await response.json();
      setCustomers(json)
    }

    // Add Record
    const addCustomer = async (customerFields) => {
      let {
        first_name,
        last_name,
        contact,
        email,
        biography,
        street_address,
        area,
        city,
        image,
      } = customerFields

      let customer = {
        "first_name": first_name,
        "last_name": last_name,
        "contact": contact,
        "email": email,
        "biography": biography,
        "steet_address": street_address,
        "area": area,
        "city": city
        // "image": image
      }

      const url = `${host}customerapi/`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + authToken
        },

        body: JSON.stringify(customer)
      });
      const json = await response.json();
      setCustomers(customers.concat(customer))
    }

    // Update Record
    const updateCustomer = async () => {
      const url = `${host}customerapi/${customerId}/`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + authToken
        },

        body: JSON.stringify(customer)
      });
      const json = await response.json();
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
      console.log('delete customer having id ' + id)
      setCustomers(customersLeft)
    }


    return (
      <CustomerContext.Provider value={{ customers, customer, setCustomer, getAllCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer, customerId, setCustomerId }}>
        {props.children}
      </CustomerContext.Provider>
    )
  }

  export default CustomerState;