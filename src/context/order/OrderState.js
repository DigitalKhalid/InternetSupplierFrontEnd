import React, { useContext, useState } from "react";
import OrderContext from './OrderContext'
import AlertContext from "../alert/AlertContext"
import getListURL from '../../functions/URLs'
import { useSelector } from "react-redux";

const OrderState = (props) => {
  const { showAlert, toggleAlert } = useContext(AlertContext)

  const host = process.env.REACT_APP_HOST
  const [orders, setOrders] = useState([])
  const [ordersCount, setOrdersCount] = useState(0)
  const [ordersNext, setOrdersNext] = useState('')

  const settings = useSelector((state) => state.setting.settings)

  const getOrderID = () => {
    let serial = Math.max(...orders.map(o => (o.id))) + 1
    const orderID = settings.order_id_prefix + serial.toString().padStart(5, '0')
    return orderID
  }

  const blankFields = {
    id: '',
    date_created: '',
    order_id: getOrderID(),
    connection: '',
    value: '0',
    status: 'Pending'
  }

  const [order, setOrder] = useState(blankFields)

  // Get all Records
  const getAllOrders = async (sortField = 'order_id', sort = 'DESC', search = '', filterField = '') => {
    const url = getListURL('orderapirelated', sortField, sort, search, filterField)

    try {
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

      // For delete relative payment
      let paymentOrder = json.results[0]
      paymentOrder = { ...paymentOrder, 'status': paymentOrder.payment_count === 1 ? 'Pending' : 'Partial', 'connection': paymentOrder.connection.id }
      setOrder(paymentOrder)

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }

  // Append more records used for pagination
  const getMoreOrders = async () => {
    const url = ordersNext

    try {
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

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }

  // Add Record
  const addOrder = async (newOrder = order) => {
    // Add record to server
    const url = `${host}orderapi/`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
        },

        body: JSON.stringify(newOrder)
      });
      showAlert(response.status, newOrder.order_id)

      // Add record to frontend
      if (response.ok) {
        const json = await response.json();
        setOrder(json)
        // setOrders(orders.concat(order))
        getAllOrders()
      }

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }


  // Update Record
  const updateOrder = async () => {
    // Update record to server side
    const url = `${host}orderapi/${order.id}/`

    try {
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

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }


  // Delete Record
  const deleteOrder = async () => {
    // delete record from server using API
    const url = `${host}orderapi/${order.id}`

    try {
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
        setOrdersCount(ordersCount - 1)
      } else {
        showAlert(response.status, order.order_id)
      }

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }


  return (
    <OrderContext.Provider value={{ blankFields, orders, order, ordersCount, ordersNext, setOrder, getOrderID, getAllOrders, getMoreOrders, addOrder, updateOrder, deleteOrder }}>
      {props.children}
    </OrderContext.Provider>
  )
}

export default OrderState;