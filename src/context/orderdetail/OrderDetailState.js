import React, { useContext, useState } from "react";
import OrderDetailContext from './OrderDetailContext'
import AlertContext from "../alert/AlertContext"
import getListURL from '../../functions/URLs'

const OrderDetailState = (props) => {
  const { showAlert } = useContext(AlertContext)

  const host = process.env.REACT_APP_HOST
  const [orderDetails, setOrderDetails] = useState([])
  const [orderDetailsCount, setOrderDetailsCount] = useState(0)
  const [orderDetailsNext, setOrderDetailsNext] = useState('')

  const blankFields = {
    id: '',
    orderDetail: '',
    product: '',
    qty: '',
    sale_price: '0'
  }

  const [orderDetail, setOrderDetail] = useState(blankFields)

  // Get all Records
  const getAllOrderDetails = async (sortField = 'product__title', sort = 'ASC', search = '', filterField = '') => {
    const url = getListURL('orderdetailapirelated', sortField, sort, search, filterField)
    console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setOrderDetails(json)
    console.log(json)
  }

  // Add Record
  const addOrderDetail = async () => {
    // Add record to server
    const url = `${host}orderdetailapi/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },

      body: JSON.stringify(orderDetail)
    });
    showAlert(response.status, orderDetail.product)

    // Add record to frontend
    if (response.ok) {
      const json = await response.json();
      setOrderDetail(json)
      setOrderDetails(orderDetails.concat(orderDetail))
    }
  }


  // Update Record
  const updateOrderDetail = async () => {
    // Update record to server side
    const url = `${host}orderdetailapi/${orderDetail.id}/`

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
      body: JSON.stringify(orderDetail)
    });
    showAlert(response.status, orderDetail.product)


    // Update record in frontend
    if (response.ok) {
      getAllOrderDetails()
    }
  }


  // Delete Record
  const deleteOrderDetail = async () => {
    // delete record from server using API
    const url = `${host}orderdetailapi/${orderDetail.id}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });

    // delete record from frontend
    if (response.ok) {
      const OrderDetailsLeft = orderDetails.filter((OrderDetail) => { return OrderDetail.id !== orderDetail.id })
      setOrderDetails(OrderDetailsLeft)
    } else {
      showAlert(response.status, orderDetail.product)
    }
  }


  return (
    <OrderDetailContext.Provider value={{ blankFields, orderDetails, orderDetail, setOrderDetail, getAllOrderDetails, addOrderDetail, updateOrderDetail, deleteOrderDetail }}>
      {props.children}
    </OrderDetailContext.Provider>
  )
}

export default OrderDetailState;