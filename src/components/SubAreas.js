import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SubAreaContext from '../context/subarea/SubAreaContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import SubAreaForm from './SubAreaForm'

export const SubAreas = () => {
    const context = useContext(SubAreaContext)
    const { blankFields, setSubArea, subAreas, setArea, getAllSubAreas, addSubArea, deleteSubArea, updateSubArea } = context
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('ASC')
    const [column, setColumn] = useState('subarea')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getAllSubAreas(column, sort, searchText)
        //   eslint-disable-next-line
    }, [sort, column, searchText])

    const openNewPopup = () => {
        setOperation('add')
        setSubArea(blankFields)
        togglePopup()
    }

    const openEditPopup = (subArea) => {
        const subAreaEdit = {...subArea, 'area':subArea.area.id, 'city':subArea.area.city.id, 'country':subArea.area.city.country.id}
        setOperation('update')
        // setArea(subArea)
        setSubArea(subAreaEdit)
        togglePopup()
    }

    const openDeletePopup = (subArea) => {
        setOperation('delete')
        setSubArea(subArea)
        togglePopup()
    }

    const addRecord = () => {
        addSubArea()
        togglePopup()
    }

    const updateRecord = () => {
        updateSubArea()
        togglePopup()
    }

    const deleteRecord = () => {
        deleteSubArea()
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
                <button className="btn btn-primary" onClick={openNewPopup}>Add Subarea</button>
            </div>

            {/* List */}
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>

                            <th className='sorting-head' onClick={() => sorting('subarea')}>Subarea <i className={`${column + sort === 'subareaASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'subareaDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>
                            
                            <th className='sorting-head' onClick={() => sorting('area__area')}>Area <i className={`${column + sort === 'area__areaASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'area__areaDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>
                            
                            <th className='sorting-head' onClick={() => sorting('area__city__city')}>City <i className={`${column + sort === 'area__city__cityASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'area__city__cityDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                            <th className='sorting-head' onClick={() => sorting('area__city__country__country')}>Country <i className={`${column + sort === 'area__city__country__countryASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'area__city__country__countryDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>
                            
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subAreas.map((subArea, index) => {
                            return (
                                <tr key={index}>
                                    <td>{subArea.id}</td>
                                    <td>{subArea.subarea}</td>
                                    <td>{subArea.area.area}</td>
                                    <td>{subArea.area.city.city}</td>
                                    <td>{subArea.area.city.country.country}</td>

                                    <td >
                                        <Link className='action-btn' onClick={() => openDeletePopup(subArea)} ><i className='fa fa-trash-can'></i></Link>
                                        <Link className='action-btn' onClick={() => openEditPopup(subArea)} ><i className='fa fa-pen-to-square'></i></Link>
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
                {operation === 'update' && <Popup header='Edit Area' body={<SubAreaForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New Area' body={<SubAreaForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete Area' body='Are you sure to delete this Subarea?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}
            </div>
        </>
    )
}