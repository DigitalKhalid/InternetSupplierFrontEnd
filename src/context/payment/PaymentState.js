import React, { useContext, useState } from "react";
import PaymentContext from './PaymentContext'
import AlertContext from "../alert/AlertContext"
import getListURL from '../../functions/URLs'

const PaymentState = (props) => {
  const { showAlert } = useContext(AlertContext)

  const host = process.env.REACT_APP_HOST
  const [payments, setPayments] = useState([])
  const [paymentsCount, setPaymentsCount] = useState(0)
  const [paymentsNext, setPaymentsNext] = useState('')

  const blankFields = {
    id: '',
    date_created: '',
    payment_type: 'Debit',
    order: '',
    amount: '0'
  }

  const [payment, setPayment] = useState(blankFields)

  // Get all Records
  const getAllPayments = async (sortField = 'order', sort = 'DESC', search = '', filterField = '') => {
    const url = getListURL('paymentapirelated', sortField, sort, search, filterField)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setPaymentsCount(json.count)
    setPayments(json.results)
    setPaymentsNext(json.next)
  }

  // Append more records used for pagination
  const getMorePayments = async () => {
    const url = paymentsNext
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setPayments(payments.concat(json.results))
    setPaymentsNext(json.next)
  }

  // Add Record
  const addPayment = async () => {
    // Add record to server
    const url = `${host}paymentapi/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },

      body: JSON.stringify(payment)
    });
    showAlert(response.status, '')

    // Add record to frontend
    if (response.ok) {
      const json = await response.json();
      setPayment(json)
      setPayments(payments.concat(payment))
    }
  }


  // Update Record
  const updatePayment = async () => {
    // Update record to server side
    const url = `${host}paymentapi/${payment.id}/`

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
      body: JSON.stringify(payment)
    });
    showAlert(response.status, '')


    // Update record in frontend
    if (response.ok) {
      getAllPayments()
    }
  }


  // Delete Record
  const deletePayment = async () => {
    // delete record from server using API
    const url = `${host}paymentapi/${payment.id}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });

    // delete record from frontend
    if (response.ok) {
      const PaymentsLeft = payments.filter((Payment) => { return Payment.id !== payment.id })
      setPayments(PaymentsLeft)
      setPaymentsCount(paymentsCount-1)
    } else {
      showAlert(response.status, '')
    }
  }


  return (
    <PaymentContext.Provider value={{ blankFields, payments, payment, paymentsCount, paymentsNext, setPayment, getAllPayments, getMorePayments, addPayment, updatePayment, deletePayment }}>
      {props.children}
    </PaymentContext.Provider>
  )
}

export default PaymentState;