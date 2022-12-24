import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import PaymentContext from '../context/payment/PaymentContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import PaymentForm from './PaymentForm'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from './Pagination'
import Spinner from './Spinner'
import { format } from 'date-fns'
import OrderContext from '../context/order/OrderContext'

export const Payments = () => {
    const { payments, setPayment, paymentsNext, paymentsCount, getMorePayments, getAllPayments, updatePayment, deletePayment } = useContext(PaymentContext)
    const { updateOrder, getAllOrders } = useContext(OrderContext)
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('DESC')
    const [column, setColumn] = useState('order__order_id')
    const [searchText, setSearchText] = useState('')


    useEffect(() => {
        getAllPayments(column, sort, searchText)
        //   eslint-disable-next-line
    }, [sort, column, searchText])

    const openEditPopup = (payment) => {
        const paymentEdit = { ...payment, 'connection': payment.connection.id }
        setOperation('update')
        setPayment(paymentEdit)
        togglePopup()
    }

    const openDeletePopup = (payment) => {
        setOperation('delete')
        getAllOrders('order_id', 'ASC', payment.order.id, 'id')
        setPayment(payment)
        togglePopup()
    }

    const updateRecord = () => {
        updatePayment()
        togglePopup()
    }

    const deleteRecord = () => {
        deletePayment()
        updateOrder()
        togglePopup()
    }

    const sorting = (col) => {
        setColumn(col)
        if (sort === 'ASC') {
            setSort('DESC')

        } else if (sort === 'DESC') {
            setSort('ASC')
        }
    }

    return (
        <>
            {/* Headers */}
            <div className="list-headers">
                <input type="text" className="search-control" id="search" name='search' placeholder="Search" onChange={(event) => setSearchText(event.target.value)}></input>
                {/* <button className="btn btn-primary">Add Payment</button> */}
            </div>

            {/* List */}
            <div className='list' id='list'>
                <InfiniteScroll
                    scrollableTarget='list'
                    dataLength={payments.length}
                    next={getMorePayments}
                    hasMore={payments.length < paymentsCount}
                    loader={<Spinner />}
                >
                    <table>
                        <thead className='list-head'>
                            <tr>
                                <th className='sorting-head' onClick={() => sorting('order__order_id')}>Order No. <i className={`${column + sort === 'order__order_idASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'order__order_idDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('date_created')}>Date/ Time <i className={`${column + sort === 'date_createdASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'date_createdDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('received_by__first_name')}>Received By <i className={`${column + sort === 'received_by__first_nameASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'received_by__first_nameDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>
                                
                                <th className='sorting-head' onClick={() => sorting('payment_type')}>Payment Type <i className={`${column + sort === 'payment_typeASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'payment_typeDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th>Amount</th>

                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='list-body'>
                            {payments.map((payment, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{payment.order.order_id}</td>
                                        {payment.date_created && <td>{format(new Date(payment.date_created), 'dd-MM-yyyy - hh:mm a')}</td>}
                                        <td>{payment.cashier_name}</td>
                                        <td>{payment.payment_type}</td>
                                        <td>{payment.amount}</td>
                                        <td >
                                            <Link className='action-btn' onClick={() => openDeletePopup(payment)} ><i className='fa fa-trash-can'></i></Link>
                                            <Link className='action-btn disable' onClick={() => openEditPopup(payment)} ><i className='fa fa-pen-to-square'></i></Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>

            {/* Pagination */}
            <Pagination showedRecords={payments.length} totalRecords={paymentsCount} nextPage={paymentsNext} getMoreRecords={getMorePayments} />

            {/* Popup Forms */}
            <div>
                {operation === 'update' && <Popup header='Edit Payment' body={<PaymentForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'delete' && <Popup header='Delete Payment' body='Are you sure to delete this Payment?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}
            </div>
        </>
    )
}