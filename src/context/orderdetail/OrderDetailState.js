import React, { useContext, useState } from "react";
import OrderDetailContext from './OrderDetailContext'
import AlertContext from "../alert/AlertContext"
import getListURL from '../../functions/URLs'
import { autoUpdateOrderPackageDetails } from '../../functions/Orders'

const OrderDetailState = (props) => {
  const { showAlert } = useContext(AlertContext)
  const host = process.env.REACT_APP_HOST
  const [orderDetails, setOrderDetails] = useState([])

  const blankFields = {
    id: '',
    order: '',
    product: '',
    qty: '1',
    sale_price: '0'
  }

  const defaultPackageDetailFields = {
    id: '',
    package: '',
    valid_from: '',
    valid_to: ''
  }

  const [orderDetail, setOrderDetail] = useState(blankFields)
  const [hasPackage, setHasPackage] = useState(false)
  const [orderPackageDetail, setOrderPackageDetail] = useState(defaultPackageDetailFields)

  // Get all Records
  const getAllOrderDetails = async (sortField = 'product__title', sort = 'ASC', search = '', filterField = '') => {
    const url = getListURL('orderdetailapirelated', sortField, sort, search, filterField)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setOrderDetails(json)
    setHasPackage(json.map((item) => item.product.catagory.title === 'Package' ? true : false))
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
      getAllOrderDetails('', 'ASC', localStorage.getItem('orderid'), 'order')
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
    showAlert(response.status, 'item')

    // Update record in frontend
    if (response.ok) {
      await autoUpdateOrderPackageDetails(orderDetail)
      getAllOrderDetails('product__title', 'ASC', localStorage.getItem('orderid'), 'order')
    }
  }


  // Update Order Package Details
  const updateOrderPackageDetail = async () => {
    const url = `${host}orderpackagedetailapi/${orderPackageDetail.id}/`

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
      body: JSON.stringify(orderPackageDetail),
    });
    showAlert(response.status, 'package validity')

    // Update record in frontend
    if (response.ok) {
      getAllOrderDetails('product__title', 'ASC', localStorage.getItem('orderid'), 'order')
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
      showAlert(response.status)
    }
  }


  return (
    <OrderDetailContext.Provider value={{ blankFields, orderDetails, orderDetail, hasPackage, orderPackageDetail, updateOrderPackageDetail, setOrderPackageDetail, setOrderDetail, getAllOrderDetails, addOrderDetail, updateOrderDetail, deleteOrderDetail }}>
      {props.children}
    </OrderDetailContext.Provider>
  )
}

export default OrderDetailState;