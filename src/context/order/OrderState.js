import React, { useContext, useState } from "react";
import OrderContext from './OrderContext'
import AlertContext from "../alert/AlertContext"
import getListURL from '../../functions/URLs'

const OrderState = (props) => {
  const { showAlert } = useContext(AlertContext)

  const host = process.env.REACT_APP_HOST
  const [orders, setOrders] = useState([])
  const [ordersCount, setOrdersCount] = useState(0)
  const [ordersNext, setOrdersNext] = useState('')

  const blankFields = {
    id: '',
    date_created: new Date().getDate(),
    order_id: '',
    connection: '',
    value: '0',
    status: 'Pending'
  }

  const [order, setOrder] = useState(blankFields)

  // Get all Records
  const getAllOrders = async (sortField = 'first_name', sort = 'ASC', search = '', filterField = '') => {
    const url = getListURL('orderapirelated', sortField, sort, search, filterField)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setOrdersCount(json.count)
    setOrders(json.results)
    setOrdersNext(json.next)
  }

  // Append more records used for pagination
  const getMoreOrders = async () => {
    const url = ordersNext
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setOrders(orders.concat(json.results))
    setOrdersNext(json.next)
  }

  // Add Record
  const addOrder = async () => {
    // Add record to server
    const url = `${host}orderapi/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },

      body: JSON.stringify(order)
    });
    showAlert(response.status, order.order_id)

    // Add record to frontend
    if (response.ok) {
      const json = await response.json();
      setOrder(json)
      setOrders(orders.concat(order))
    }
  }


  // Update Record
  const updateOrder = async () => {
    // Update record to server side
    const url = `${host}orderapi/${order.id}/`

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
      body: JSON.stringify(order)
    });
    showAlert(response.status, order.order_id)


    // Update record in frontend
    if (response.ok) {
      getAllOrders()
    }
  }


  // Delete Record
  const deleteOrder = async () => {
    // delete record from server using API
    const url = `${host}orderapi/${order.id}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });

    // delete record from frontend
    if (response.ok) {
      const OrdersLeft = orders.filter((Order) => { return Order.id !== order.id })
      setOrders(OrdersLeft)
    } else {
      showAlert(response.status, order.order_id)
    }
  }


  return (
    <OrderContext.Provider value={{ blankFields, orders, order, ordersCount, ordersNext, setOrder, getAllOrders, getMoreOrders, addOrder, updateOrder, deleteOrder }}>
      {props.children}
    </OrderContext.Provider>
  )
}

export default OrderState;