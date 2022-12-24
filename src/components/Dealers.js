import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomerContext from '../context/customer/CustomerContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import CustomerForm from './CustomerForm'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from './Pagination'
import ConnectionContext from '../context/connection/ConnectionContext'
import Spinner from './Spinner'

export const Dealers = () => {
    const { blankFields, dealers, setCustomer, dealersNext, dealersCount, getMoreDealers, getAllDealers, updateCustomer, addCustomer, deleteCustomer } = useContext(CustomerContext)
    const { connection, setConnection, getConnectionID, addConnection, getAllConnections } = useContext(ConnectionContext)
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('ASC')
    const [column, setColumn] = useState('first_name')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getAllDealers(column, sort, searchText)
        getAllConnections()
        //   eslint-disable-next-line
    }, [sort, column, searchText])

    const openNewPopup = () => {
        setOperation('add')
        setCustomer({ ...blankFields, 'customer_type': 'Dealer' })
        togglePopup()
    }

    const openEditPopup = (customer) => {
        const customerEdit = { ...customer, 'country': customer.subarea.area.city.country.id, 'city': customer.subarea.area.city.id, 'area': customer.subarea.area.id, 'subarea': customer.subarea.id }
        setOperation('update')
        setCustomer(customerEdit)
        togglePopup()
    }

    const openDeletePopup = (customer) => {
        setOperation('delete')
        setCustomer(customer)
        togglePopup()
    }

    const openAddConnectionPopup = (customer) => {
        const connectionID = getConnectionID()
        console.log(connectionID)
        setOperation('addConnection')
        setConnection({ ...connection, 'connection_id':connectionID, 'customer': customer.id, 'subarea': customer.subarea.id })
        togglePopup()
    }

    const addRecord = () => {
        addCustomer('Dealer')
        togglePopup()
    }

    const updateRecord = () => {
        updateCustomer()
        togglePopup()
    }

    const deleteRecord = () => {
        deleteCustomer('Dealer')
        togglePopup()
    }

    const addNewConnection = () => {
        addConnection('Dealer')
        togglePopup()
        getAllDealers()
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
                <button className="btn btn-primary" onClick={openNewPopup}>Add Dealer</button>
            </div>

            {/* List */}
            <div className='list' id='list'>
                <InfiniteScroll
                    scrollableTarget='list'
                    dataLength={dealers.length}
                    next={getMoreDealers}
                    hasMore={dealers.length < dealersCount}
                    loader={<Spinner/>}
                >
                    <table>
                        <thead className='list-head'>
                            <tr>
                                <th></th>
                                <th className='sorting-head' onClick={() => sorting('first_name')}>Name <i className={`${column + sort === 'first_nameASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'first_nameDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th>Contact</th>
                                <th>Email</th>

                                <th className='sorting-head' onClick={() => sorting('subarea')}>Subarea <i className={`${column + sort === 'subareaASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'subareaDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('subarea__area__area')}>Area <i className={`${column + sort === 'subarea__area__areaASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'subarea__area__areaDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('city')}>City <i className={`${column + sort === 'cityASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'cityDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='list-body'>
                            {dealers.map((dealer, index) => {
                                return (
                                    <tr key={index}>
                                        {dealer.connections ? <td className={`${dealer.connections.status === 'Active' ? 'wifi-active' : 'wifi-inactive'}`}><i className='fa fa-wifi'></i></td> : <td className='wifi-null' onClick={() => openAddConnectionPopup(dealer)}><i className='fa fa-wifi'></i></td>}
                                        <td>{dealer.first_name + ' ' + dealer.last_name}</td>
                                        <td>{dealer.contact}</td>
                                        <td>{dealer.email}</td>
                                        <td>{dealer.subarea.subarea}</td>
                                        <td>{dealer.subarea.area.area}</td>
                                        <td>{dealer.subarea.area.city.city}</td>
                                        <td >
                                            <Link className='action-btn' onClick={() => openDeletePopup(dealer)} ><i className='fa fa-trash-can'></i></Link>
                                            <Link className='action-btn' onClick={() => openEditPopup(dealer)} ><i className='fa fa-pen-to-square'></i></Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>

            {/* Pagination */}
            <Pagination showedRecords={dealers.length} totalRecords={dealersCount} nextPage={dealersNext} getMoreRecords={getMoreDealers} />

            {/* Popup Forms */}
            <div>
                {operation === 'update' && <Popup header='Edit Dealer' body={<CustomerForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New Dealer' body={<CustomerForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete Delete' body='Are you sure to delete this dealer?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}

                {operation === 'addConnection' && <Popup header='Add Connection' body='Are you sure to add connection for this dealer?' btnCancel='No' btnOk='Yes' btnOkClick={addNewConnection} alerts={false} />}
            </div>
        </>
    )
}

export default Dealers;