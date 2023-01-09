import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OrderContext from '../context/order/OrderContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import OrderForm from './OrderForm'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from './Pagination'
import Spinner from './Spinner'
import { format } from 'date-fns'
import PaymentForm from './PaymentForm'
import PaymentContext from '../context/payment/PaymentContext'

export const Orders = () => {
    const { blankFields, orders, order, setOrder, ordersNext, ordersCount, getMoreOrders, getAllOrders, updateOrder, addOrder, deleteOrder } = useContext(OrderContext)
    const { payment, setPayment, addPayment } = useContext(PaymentContext)
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('DESC')
    const [column, setColumn] = useState('order_id')
    const [searchText, setSearchText] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        getAllOrders(column, sort, searchText)
        //   eslint-disable-next-line
    }, [sort, column, searchText])

    const openNewPopup = () => {
        setOperation('add')
        setOrder(blankFields)
        togglePopup()
    }

    const openEditPopup = (order) => {
        const orderEdit = { ...order, 'connection': order.connection.id }
        setOperation('update')
        setOrder(orderEdit)
        togglePopup()
    }

    const openDetail = (order) => {
        setOperation('detail')
        setOrder({ ...order, 'value': order.details.reduce((total, value) => total = total + value.qty * value.sale_price, 0) })
        localStorage.setItem('orderid', order.id)
    }

    const openPaymentPopup = (order) => {
        setOperation('payment')

        setPayment({ ...payment, 'order': order.id, 'amount': order.details.reduce((total, value) => total = total + value.qty * value.sale_price, 0) - order.payments.reduce((total, value) => total = total + value.amount, 0) })

        const orderEdit = { ...order, 'connection': order.connection.id, 'package': order.connection.package, 'status': 'Completed', 'value': order.details.reduce((total, value) => total = total + value.qty * value.sale_price, 0), 'balance': order.details.reduce((total, value) => total = total + value.qty * value.sale_price, 0) - order.payments.reduce((total, value) => total = total + value.amount, 0) }

        setOrder(orderEdit)
        togglePopup()
    }

    const openDeletePopup = (order) => {
        setOperation('delete')
        setOrder(order)
        togglePopup()
    }

    const addRecord = () => {
        addOrder()
        togglePopup()
        // navigate('/admin/invoicedetails')
    }

    const updateRecord = () => {
        updateOrder()
        togglePopup()
    }

    const deleteRecord = () => {
        deleteOrder()
        togglePopup()
    }

    const addPaymentRecord = async () => {
        if (payment.amount > 0) {
            await addPayment(order)
            await updateOrder()
        }
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
                <button className="btn btn-primary" onClick={openNewPopup}>New Order</button>
            </div>

            {/* List */}
            <div className='list' id='list'>
                <InfiniteScroll
                    scrollableTarget='list'
                    dataLength={orders.length}
                    next={getMoreOrders}
                    hasMore={orders.length < ordersCount}
                    loader={<Spinner />}
                >
                    <table>
                        <thead className='list-head'>
                            <tr>
                                <th className='sorting-head' onClick={() => sorting('order_id')}>Bill No <i className={`${column + sort === 'order_idASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'order_idDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('date_created')}>Date/ Time <i className={`${column + sort === 'date_createdASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'date_createdDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('connection__connection_id')}>Connection <i className={`${column + sort === 'connection__connection_idASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'connection__connection_idDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th>Value</th>
                                <th>Balance</th>
                                <th>Status</th>

                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='list-body'>
                            {orders.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{order.order_id}</td>
                                        <td>{format(new Date(order.date_created), 'dd-MM-yyyy - hh:mm a')}</td>
                                        <td>{order.connection.connection_id}</td>
                                        <td>{order.details.reduce((total, value) => total = total + value.qty * value.sale_price, 0)}</td>
                                        <td>{order.details.reduce((total, value) => total = total + value.qty * value.sale_price, 0) - order.payments.reduce((total, value) => total = total + value.amount, 0)}</td>
                                        <td>{order.status}</td>
                                        <td >
                                            <Link className='action-btn' onClick={() => openDeletePopup(order)} ><i className='fa fa-trash-can'></i></Link>

                                            <Link className='action-btn' onClick={() => openEditPopup(order)} ><i className='fa fa-pen-to-square'></i></Link>

                                            <Link className={`${order.status === 'Pending' ? 'action-btn' : 'action-btn disable'}`} onClick={() => openDetail(order)} to='/orders/invoice/invoicedetails' ><i className='fa fa-rectangle-list'></i></Link>

                                            <Link className={`${order.status !== 'Completed' ? 'action-btn green' : 'action-btn disable'}`} onClick={() => openPaymentPopup(order)}><i className='fa fa-money-bill'></i></Link>

                                            <div className="dropdown">
                                                <span className='action-btn' to={'/payment/bill/print'} onClick={() => localStorage.setItem('orderid', order.id)} target='_blank' rel="noopener noreferrer"><i className='fa fa-print'></i>
                                                    <div className="dropdown-content">
                                                        <Link to={'/payment/bill/print'} onClick={() => localStorage.setItem('orderid', order.id)} target='_blank' rel="noopener noreferrer">Bill</Link>
                                                        <Link to={'/order/invoice/print-a4'} onClick={() => localStorage.setItem('orderid', order.id)} target='_blank' rel="noopener noreferrer">A4</Link>
                                                    </div>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>

            {/* Pagination */}
            <Pagination showedRecords={orders.length} totalRecords={ordersCount} nextPage={ordersNext} getMoreRecords={getMoreOrders} />

            {/* Popup Forms */}
            <div>
                {operation === 'update' && <Popup header='Edit Order' body={<OrderForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New Order' body={<OrderForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete Order' body='Are you sure to delete this order?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}

                {operation === 'payment' && <Popup header='Payment' body={<PaymentForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addPaymentRecord} />}
            </div>
        </>
    )
}