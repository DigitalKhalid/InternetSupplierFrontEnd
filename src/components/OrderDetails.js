import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OrderDetailContext from '../context/orderdetail/OrderDetailContext'
import OrderContext from '../context/order/OrderContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import OrderDetailForm from './OrderDetailForm'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from './Pagination'
import Spinner from './Spinner'
import { format } from 'date-fns'

export const OrderDetails = () => {
    const { blankFields, orderDetails, setOrderDetail, getAllOrderDetails, updateOrderDetail, addOrderDetail, deleteOrderDetail } = useContext(OrderDetailContext)
    const { order } = useContext(OrderContext)
    const navigate = useNavigate()
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('ASC')
    const [column, setColumn] = useState('product__title')

    useEffect(() => {
        if (order.id) {
            getAllOrderDetails(column, sort, order.id, 'order')
        } else {
            navigate('/admin/invoices')
        }
        //   eslint-disable-next-line
    }, [sort, column])

    const openNewPopup = () => {
        setOperation('add')
        setOrderDetail({ ...blankFields, 'order': order.id })
        togglePopup()
    }

    const openEditPopup = (orderDetail) => {
        const orderDetailEdit = { ...orderDetail, 'product': orderDetail.product.id }
        setOperation('update')
        setOrderDetail(orderDetailEdit)
        togglePopup()
    }

    const openDeletePopup = (orderDetail) => {
        setOperation('delete')
        setOrderDetail(orderDetail)
        togglePopup()
    }

    const addRecord = () => {
        addOrderDetail()
        togglePopup()
    }

    const updateRecord = () => {
        updateOrderDetail()
        togglePopup()
    }

    const deleteRecord = () => {
        deleteOrderDetail()
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
            <p>
                Bill No. <strong>{order.order_id}</strong>
                <br />
                Dated: <strong>{format(new Date(order.date_created), 'dd-MM-yyyy')}</strong>
                <br />
                Total Amount: <strong>{orderDetails.reduce((total, value) => total = total + (value.sale_price * value.qty), 0)}</strong>
            </p>
            <div className="list-headers">
                <button className="btn btn-warning" onClick={()=>navigate(-1)}><i className='fa fa-arrow-left'></i></button>
                <button className="btn btn-primary" onClick={openNewPopup}>Add Item</button>
            </div>

            {/* List */}
            <div className='list' id='list'>
                <table>
                    <thead className='list-head'>
                        <tr>
                            <th className='sorting-head' onClick={() => sorting('product')}>Item Description <i className={`${column + sort === 'productASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'productDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='list-body'>
                        {orderDetails.map((detail, index) => {
                            return (
                                <tr key={index}>
                                    <td>{detail.product.title} | {detail.product.sku} ({detail.product.catagory.title})</td>
                                    <td>{detail.qty}</td>
                                    <td>{detail.sale_price}</td>
                                    <td>{detail.sale_price * detail.qty}</td>
                                    <td >
                                        <Link className='action-btn' onClick={() => openDeletePopup(detail)} ><i className='fa fa-trash-can'></i></Link>
                                        <Link className='action-btn' onClick={() => openEditPopup(detail)} ><i className='fa fa-pen-to-square'></i></Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {/* <Pagination showedRecords={orderDetails.length} totalRecords={orderDetailsCount} nextPage={orderDetailsNext} getMoreRecords={getMoreOrderDetails} /> */}

            {/* Popup Forms */}
            <div>
                {operation === 'update' && <Popup header='Edit OrderDetail' body={<OrderDetailForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New OrderDetail' body={<OrderDetailForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete OrderDetail' body='Are you sure to delete this item from the order?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}
            </div>
        </>
    )
}