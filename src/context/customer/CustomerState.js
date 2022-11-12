import React, { useState } from "react";
import CustomerContext from './CustomerContext'

const CustomerState = (props) => {
  const host = ' http://127.0.0.1:8000/'
  const authToken = '56072d4808b19e689c420e1b46a70d3ddf0aea64'

  const allCustomers = [
    {
      "id": 1,
      "first_name": "Waqas",
      "last_name": "Ahmad",
      "contact": "03015339757",
      "biography": "",
      "steet_address": "Street No. 11, Muslimabad, Dhoke Syedan",
      "area": "Kyani Road",
      "city": "Rawalpindi",
      "image": "http://127.0.0.1:8000/media/media/images/avatar.jpg"
    },
    {
      "id": 2,
      "first_name": "Waqas",
      "last_name": "Ahmad",
      "contact": "03015339757",
      "biography": "",
      "steet_address": "Street No. 11, Muslimabad, Dhoke Syedan",
      "area": "Kyani Road",
      "city": "Rawalpindi",
      "image": "http://127.0.0.1:8000/media/images/avatar_Z28t8cp.jpg"
    }
  ]

  const [customers, setCustomers] = useState(allCustomers)

  // Get One Record
  const getCustomer = (id) => {

  }

  // Add Record
  const addCustomer = async (customer_fields) => {
    let {
      first_name,
      last_name,
      contact,
      biography,
      street_address,
      area,
      city,
      image,
    } = customer_fields

    let customer = {
      "first_name": first_name,
      "last_name": last_name,
      "contact": contact,
      "biography": biography,
      "steet_address": street_address,
      "area": area,
      "city": city,
      "image": image
    }

    const url = `${host}customerapi/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token '+authToken
      },
      
      body: JSON.stringify({customer})
    });
    const json = response.json();
    console.log('done')
    // setCustomers(customers.concat(customer))
  }

  // Update Record
  const updateCustomer = async (id) => {
    // const url = `${host}/customerapi/${id}`

    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'auth-token': authToken
    //   },

    //   body: JSON.stringify(data)
    // });
    // const json = response.json();
  }

  // Delete Record
  const deleteCustomer = (id) => {
    const customersLeft = customers.filter((customer) => { return customer.id !== id })
    console.log('delete customer having id ' + id)
    setCustomers(customersLeft)
  }


  return (
    <CustomerContext.Provider value={{ customers, getCustomer, addCustomer, updateCustomer, deleteCustomer }}>
      {props.children}
    </CustomerContext.Provider>
  )
}

export default CustomerState;