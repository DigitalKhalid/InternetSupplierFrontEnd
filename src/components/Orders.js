import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OrderContext from '../context/order/OrderContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import OrderForm from './OrderForm'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from './Pagination'
// import ConnectionContext from '../context/connection/ConnectionContext'
import Spinner from './Spinner'
import { format } from 'date-fns'

export const Orders = () => {
    const { blankFields, orders, setOrder, ordersNext, ordersCount, getMoreOrders, getAllOrders, updateOrder, addOrder, deleteOrder } = useContext(OrderContext)
    // const { connection, setConnection, getConnectionID, addConnection, getAllConnections } = useContext(ConnectionContext)
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('ASC')
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
        const OrderEdit = { ...order, 'connection': order.connection.id }
        setOperation('update')
        setOrder(OrderEdit)
        togglePopup()
    }

    const openDetail = (order) => {
        setOperation('detail')
        console.log('detail')
        setOrder(order)
    }

    const openDeletePopup = (order) => {
        setOperation('delete')
        setOrder(order)
        togglePopup()
    }

    const addRecord = () => {
        addOrder()
        togglePopup()
        navigate('/admin/invoicedetails')
    }

    const updateRecord = () => {
        updateOrder()
        togglePopup()
    }

    const deleteRecord = () => {
        deleteOrder()
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
                <button className="btn btn-primary" onClick={openNewPopup}>Add Invoice</button>
            </div>

            {/* List */}
            <div className='list' id='list'>
                <InfiniteScroll
                    scrollableTarget='list'
                    dataLength={orders.length}
                    next={getMoreOrders}
                    hasMore={orders.length < ordersCount}
                    loader={<Spinner/>}
                >
                    <table>
                        <thead className='list-head'>
                            <tr>
                                <th className='sorting-head' onClick={() => sorting('order_id')}>Bill No <i className={`${column + sort === 'order_idASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'order_idDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('date_created')}>Date <i className={`${column + sort === 'date_createdASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'date_createdDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('connection__connection_id')}>Connection <i className={`${column + sort === 'connection__connection_idASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'connection__connection_idDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('value')}>Value <i className={`${column + sort === 'valueASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'valueDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>
                                
                                <th className='sorting-head' onClick={() => sorting('status')}>Status <i className={`${column + sort === 'statusASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'statusDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='list-body'>
                            {orders.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{order.order_id}</td>
                                        <td>{format(new Date(order.date_created), 'dd-MM-yyyy')}</td>
                                        {/* <td>{order.date_created}</td> */}
                                        <td>{order.connection.connection_id}</td>
                                        <td>{order.value}</td>
                                        <td>{order.status}</td>
                                        <td >
                                            <Link className='action-btn' onClick={() => openDeletePopup(order)} ><i className='fa fa-trash-can'></i></Link>
                                            <Link className='action-btn' onClick={() => openEditPopup(order)} ><i className='fa fa-pen-to-square'></i></Link>
                                            <Link className='action-btn' onClick={() => openDetail(order)} to='/admin/invoicedetails' ><i className='fa fa-rectangle-list'></i></Link>
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
            </div>
        </>
    )
}