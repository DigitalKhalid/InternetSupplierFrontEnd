import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AreaContext from '../context/area/AreaContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import AreaForm from './AreaForm'
import Pagination from '../components/Pagination'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../components/Spinner'

export const Areas = () => {
    const context = useContext(AreaContext)
    const { blankFields, areas, areasCount, areasNext, setArea, getAllAreas, getMoreAreas, addArea, deleteArea, updateArea } = context
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('ASC')
    const [column, setColumn] = useState('area')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getAllAreas(column, sort, searchText)
        //   eslint-disable-next-line
    }, [sort, column, searchText])

    const openNewPopup = () => {
        setOperation('add')
        setArea(blankFields)
        togglePopup()
    }

    const openEditPopup = (area) => {
        const areaEdit = { ...area, 'city': area.city.id, 'country': area.city.country.id }
        setOperation('update')
        setArea(areaEdit)
        togglePopup()
    }

    const openDeletePopup = (area) => {
        setOperation('delete')
        setArea(area)
        togglePopup()
    }

    const addRecord = () => {
        addArea()
        togglePopup()
    }

    const updateRecord = () => {
        updateArea()
        togglePopup()
    }

    const deleteRecord = () => {
        deleteArea()
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
                <button className="btn btn-primary" onClick={openNewPopup}>Add Area</button>
            </div>

            {/* List */}
            <div className='list' id='list'>
                <InfiniteScroll
                    scrollableTarget='list'
                    dataLength={areas.length}
                    next={getMoreAreas}
                    hasMore={areas.length < areasCount}
                    loader={<Spinner/>}
                >
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>

                                <th className='sorting-head' onClick={() => sorting('area')}>Area <i className={`${column + sort === 'areaASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'areaDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('city__city')}>City <i className={`${column + sort === 'city__cityASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'city__cityDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('city__country__country')}>Country <i className={`${column + sort === 'city__country__countryASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'city__country__countryDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {areas.map((area, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{area.id}</td>
                                        <td>{area.area}</td>
                                        <td>{area.city.city}</td>
                                        <td>{area.city.country.country}</td>

                                        <td >
                                            <Link className='action-btn' onClick={() => openDeletePopup(area)} ><i className='fa fa-trash-can'></i></Link>
                                            <Link className='action-btn' onClick={() => openEditPopup(area)} ><i className='fa fa-pen-to-square'></i></Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>

            {/* Pagination */}
            <Pagination showedRecords={areas.length} totalRecords={areasCount} nextPage={areasNext} getMoreRecords={getMoreAreas} />

            {/* Popup Forms */}
            <div>
                {operation === 'update' && <Popup header='Edit Area' body={<AreaForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New Area' body={<AreaForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete Area' body='Are you sure to delete this area?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}
            </div>
        </>
    )
}