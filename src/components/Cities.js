import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CityContext from '../context/city/CityContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import CityForm from './CityForm'

export const Cities = () => {
    const context = useContext(CityContext)
    const { blankFields, cities, setCity, getAllCities, addCity, deleteCity, updateCity } = context
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('ASC')
    const [column, setColumn] = useState('city')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getAllCities(column, sort, searchText)
        //   eslint-disable-next-line
    }, [sort, column, searchText])

    const openNewPopup = () => {
        setOperation('add')
        setCity(blankFields)
        togglePopup()
    }

    const openEditPopup = (city) => {
        const cityEdit = {...city, 'country':city.country.id}
        setOperation('update')
        setCity(cityEdit)
        togglePopup()
    }

    const openDeletePopup = (city) => {
        setOperation('delete')
        setCity(city)
        togglePopup()
    }

    const addRecord = () => {
        addCity()
        togglePopup()
    }

    const updateRecord = () => {
        updateCity()
        togglePopup()
    }

    const deleteRecord = () => {
        deleteCity()
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
                <button className="btn btn-primary" onClick={openNewPopup}>Add City</button>
            </div>

            {/* List */}
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>

                            <th className='sorting-head' onClick={() => sorting('city')}>city <i className={`${column + sort === 'cityASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'cityDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                            <th className='sorting-head' onClick={() => sorting('country__country')}>Country <i className={`${column + sort === 'country__countryASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'country__countryDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>
                            
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city, index) => {
                            return (
                                <tr key={index}>
                                    <td>{city.id}</td>
                                    <td>{city.city}</td>
                                    <td>{city.country.country}</td>

                                    <td >
                                        <Link className='action-btn' onClick={() => openDeletePopup(city)} ><i className='fa fa-trash-can'></i></Link>
                                        <Link className='action-btn' onClick={() => openEditPopup(city)} ><i className='fa fa-pen-to-square'></i></Link>
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
                {operation === 'update' && <Popup header='Edit city' body={<CityForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New city' body={<CityForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete city' body='Are you sure to delete this city?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}
            </div>
        </>
    )
}