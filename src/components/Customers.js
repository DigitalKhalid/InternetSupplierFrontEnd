import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomerContext from '../context/customer/CustomerContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import CustomerForm from './CustomerForm'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from './Pagination'

export const Customers = () => {
    const { blankFields, customers, setCustomer, customersNext, customersCount, getMoreCustomers, getAllCustomers, updateCustomer, addCustomer, deleteCustomer} = useContext(CustomerContext)
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('ASC')
    const [column, setColumn] = useState('first_name')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getAllCustomers(column, sort, searchText)
        //   eslint-disable-next-line
    }, [sort, column, searchText])

    const openNewPopup = () => {
        setOperation('add')
        setCustomer(blankFields)
        togglePopup()
    }

    const openEditPopup = (customer) => {
        const customerEdit = {...customer,'country':customer.subarea.area.city.country.id, 'city':customer.subarea.area.city.id, 'area':customer.subarea.area.id, 'subarea':customer.subarea.id}
        console.log(customerEdit)
        setOperation('update')
        setCustomer(customerEdit)
        togglePopup()
    }

    const openDeletePopup = (customer) => {
        setOperation('delete')
        setCustomer(customer)
        togglePopup()
    }

    const addRecord = () => {
        addCustomer()
        togglePopup()
    }

    const updateRecord = () => {
        updateCustomer()
        togglePopup()
    }

    const deleteRecord = () => {
        deleteCustomer()
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
                <button className="btn btn-primary" onClick={openNewPopup}>Add Customer</button>
            </div>

            {/* List */}
            <InfiniteScroll
                dataLength={customersCount}
                next={getMoreCustomers}
                hasMore={customersNext !== null}
            // loader={<Spinner />}
            >
                <div className='list'>
                    <table>
                        <thead>
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
                        <tbody>
                            {customers.map((customer, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={`${customer.connections>0?'wifi-active':'wifi-inactive'}`}><i className='fa fa-wifi'></i></td>
                                        <td>{customer.first_name + ' ' + customer.last_name}</td>
                                        <td>{customer.contact}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.subarea.subarea}</td>
                                        <td>{customer.subarea.area.area}</td>
                                        <td>{customer.subarea.area.city.city}</td>
                                        <td >
                                            <Link className='action-btn' onClick={() => openDeletePopup(customer)} ><i className='fa fa-trash-can'></i></Link>
                                            <Link className='action-btn' onClick={() => openEditPopup(customer)} ><i className='fa fa-pen-to-square'></i></Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </InfiniteScroll>

            {/* Pagination */}
            <Pagination showedRecords={customers.length} totalRecords={customersCount} nextPage={customersNext} getMoreRecords={getMoreCustomers} />

            {/* Popup Forms */}
            <div>
                {operation === 'update' && <Popup header='Edit Connection' body={<CustomerForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New Connection' body={<CustomerForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete Connection' body='Are you sure to delete this customer?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}
            </div>
        </>
    )
}
