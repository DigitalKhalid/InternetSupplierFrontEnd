import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ConnectionContext from '../context/connection/ConnectionContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import ConnectionForm from './ConnectionForm'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from './Pagination'
import Spinner from '../components/Spinner'
import AlertContext from '../context/alert/AlertContext'

export const Connections = () => {
    const context = useContext(ConnectionContext)
    const { blankFields, connections, connectionsCount, connectionsNext, setConnection, getAllConnections, getMoreConnections, addConnection, deleteConnection, updateConnection } = context
    const { toggleAlert } = useContext(AlertContext)
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('DESC')
    const [column, setColumn] = useState('connection_id')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getAllConnections(column, sort, searchText)
        //   eslint-disable-next-line
    }, [sort, column, searchText])

    const openNewPopup = () => {
        setOperation('add')
        setConnection(blankFields)
        togglePopup()
    }

    const openEditPopup = (connection) => {
        const connectionEdit = { ...connection, 'customer': connection.customer.id, 'package': connection.package?connection.package.id:connection.package, 'subarea': connection.subarea.id }

        setOperation('update')
        setConnection(connectionEdit)
        togglePopup()
    }

    const openDeletePopup = (connection) => {
        setOperation('delete')
        setConnection(connection)
        togglePopup()
    }

    const openInvoicePopup = ()=>{
        console.log('Invoice')
    }

    const openStatusPopup = (connection) => {
        setOperation('status')
        if (connection.package) {
            setConnection({ ...connection, 'status': connection.status === 'Active' ? 'Inactive' : 'Active', 'customer': connection.customer.id, 'package': connection.package.id, 'subarea': connection.subarea.id })
            togglePopup()
            
        } else {
            toggleAlert('error', 'Unable to activate, please subscribe for a package first!')
        }
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
    }


    return (
        <>
            {/* Headers */}
            <div className="list-headers">
                <input type="text" className="search-control" id="search" name='search' placeholder="Search" onChange={(event) => setSearchText(event.target.value)}></input>
                <button className="btn btn-primary" onClick={openNewPopup}>Add Connection</button>
            </div>

            {/* List */}
            <div className='list' id='list'>
                <InfiniteScroll
                    scrollableTarget='list'
                    dataLength={connections.length}
                    next={getMoreConnections}
                    hasMore={connections.length < connectionsCount}
                    loader={<Spinner />}
                >
                    <table className='sortable'>
                        <thead>
                            <tr>
                                <th></th>

                                <th className='sorting-head' onClick={() => sorting('connection_id')}>Connection ID <i className={`${column + sort === 'connection_idASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'connection_idDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('subarea__subarea')}>Subarea <i className={`${column + sort === 'subarea__subareaASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'subarea__subareaDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('customer')}>Customer <i className={`${column + sort === 'customerASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'customerDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('installation_date')}>Installation Date <i className={`${column + sort === 'installation_dateASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'installation_dateDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('package')}>Package <i className={`${column + sort === 'packageASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'packageDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>
                                
                                <th className='sorting-head' onClick={() => sorting('expiry_date')}>Expiry <i className={`${column + sort === 'expiry_dateASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'expiry_dateDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

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
                                        <td>{connection.subarea.subarea}</td>
                                        <td>{connection.customer.first_name + ' ' + connection.customer.last_name}</td>
                                        <td>{connection.installation_date}</td>
                                        {connection.package ? <td>{connection.package.title}</td> : <td>{connection.package}</td>}
                                        <td>{connection.expiry_date}</td>
                                        <td>{connection.status}</td>
                                        <td >
                                            <Link className='action-btn' onClick={() => openDeletePopup(connection)} ><i className='fa fa-trash-can'></i></Link>
                                            <Link className='action-btn' onClick={() => openEditPopup(connection)} ><i className='fa fa-pen-to-square'></i></Link>
                                            <Link className='action-btn' onClick={() => openInvoicePopup(connection)} ><i className='fa fa-file-invoice'></i></Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>

            {/* Pagination */}
            <Pagination showedRecords={connections.length} totalRecords={connectionsCount} nextPage={connectionsNext} getMoreRecords={getMoreConnections} />

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