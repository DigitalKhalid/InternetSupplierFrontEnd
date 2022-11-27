import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ConnectionContext from '../context/connection/ConnectionContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import ConnectionForm from './ConnectionForm'
import CustomerContext from '../context/customer/CustomerContext'

export const Connections = () => {
    const context = useContext(ConnectionContext)
    const { blankFields, connections, setConnection, getAllConnections, addConnection, deleteConnection, updateConnection } = context
    const { togglePopup } = useContext(PopupContext)
    const { customers, getAllCustomers } = useContext(CustomerContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('ASC')
    const [column, setColumn] = useState('connection_id')

    useEffect(() => {
        getAllConnections(column, sort)
        getAllCustomers()
        //   eslint-disable-next-line
    }, [sort, column])

    const openNewPopup = () => {
        setOperation('add')
        setConnection(blankFields)
        togglePopup()
    }

    const openEditPopup = (connection) => {
        setOperation('update')
        setConnection(connection)
        togglePopup()
    }

    const openDeletePopup = (connection) => {
        setOperation('delete')
        setConnection(connection)
        togglePopup()
    }

    const openStatusPopup = (connection) => {
        setOperation('status')
        setConnection({ ...connection, 'status': connection.status === 'Active' ? 'Inactive' : 'Active' })
        togglePopup()
    }

    const addRecord = () => {
        addConnection()
        togglePopup()
    }

    const updateRecord = () => {
        updateConnection()
        togglePopup()
    }

    const deleteRecord = () => {
        deleteConnection()
        togglePopup()
    }

    const sorting = (col) => {
        setColumn(col)
        if (sort === 'ASC') {
            setSort('DESC')

        } else if (sort === 'DESC') {
            setSort('ASC')
        }
        console.log(column + sort)
    }


    return (
        <>
            {/* Headers */}
            <div className="list-headers">
                <input type="text" className="search-control" id="search" name='search' placeholder="Search"></input>
                <button className="btn btn-primary" onClick={openNewPopup}>Add Connection</button>
            </div>

            {/* List */}
            <div className='list'>
                <table className='sortable'>
                    <thead>
                        <tr>
                            <th></th>

                            <th className='sorting-head' onClick={() => sorting('connection_id')}>Connection ID <i className={`${column + sort === 'connection_idASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'connection_idDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                            <th className='sorting-head' onClick={() => sorting('customer')}>Customer <i className={`${column + sort === 'customerASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'customerDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                            <th className='sorting-head' onClick={() => sorting('installation_date')}>Installation Date <i className={`${column + sort === 'installation_dateASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'installation_dateDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                            <th className='sorting-head' onClick={() => sorting('package')}>Package <i className={`${column + sort === 'packageASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'packageDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                            <th className='sorting-head' onClick={() => sorting('status')}>Status <i className={`${column + sort === 'statusASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'statusDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {connections.map((connection, index) => {
                            return (
                                <tr key={index}>
                                    <td className="status-light">
                                        <button className={`${connection.status === 'Active' ? 'connection-active' : 'connection-inactive'}`} onClick={() => openStatusPopup(connection)} ></button>
                                    </td>
                                    <td>{connection.connection_id}</td>
                                    <td>
                                        {customers.map((customer) => {
                                            return (
                                                connection.customer === customer.id && customer.first_name + ' ' + customer.last_name
                                            )
                                        })
                                        }
                                    </td>
                                    <td>{connection.installation_date}</td>
                                    <td>{connection.package}</td>
                                    <td>{connection.status}</td>
                                    <td >
                                        <Link className='action-btn' onClick={() => openDeletePopup(connection)} ><i className='fa fa-trash-can'></i></Link>
                                        <Link className='action-btn' onClick={() => openEditPopup(connection)} ><i className='fa fa-pen-to-square'></i></Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="my-pagination">
                <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                        <a className="page-link" href='/'>Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="/">1</a></li>
                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="/">Next</a>
                    </li>
                </ul>
            </div>

            {/* Popup Forms */}
            <div>
                {operation === 'update' && <Popup header='Edit Connection' body={<ConnectionForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New Connection' body={<ConnectionForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete Connection' body='Are you sure to delete this connection?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}

                {operation === 'status' && <Popup header='Toggle Status' body='Are you sure to change the status of this connection?' btnCancel='No' btnOk='Yes' btnOkClick={updateRecord} alerts={false} />}
            </div>
        </>
    )
}
