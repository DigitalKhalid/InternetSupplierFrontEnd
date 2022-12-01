import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CountryContext from '../context/country/CountryContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import CountryForm from './CountryForm'

export const Countries = () => {
    const context = useContext(CountryContext)
    const { blankFields, countries, setCountry, getAllCountries, addCountry, deleteCountry, updateCountry } = context
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('ASC')
    const [column, setColumn] = useState('Country_id')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getAllCountries(column, sort, searchText)
        //   eslint-disable-next-line
    }, [sort, column, searchText])

    const openNewPopup = () => {
        setOperation('add')
        setCountry(blankFields)
        togglePopup()
    }

    const openEditPopup = (Country) => {
        setOperation('update')
        setCountry(Country)
        togglePopup()
    }

    const openDeletePopup = (country) => {
        setOperation('delete')
        setCountry(country)
        togglePopup()
    }

    const addRecord = () => {
        addCountry()
        togglePopup()
    }

    const updateRecord = () => {
        updateCountry()
        togglePopup()
    }

    const deleteRecord = () => {
        deleteCountry()
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
                <button className="btn btn-primary" onClick={openNewPopup}>Add Country</button>
            </div>

            {/* List */}
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>

                            <th className='sorting-head left' onClick={() => sorting('country')}>Country <i className={`${column + sort === 'countryASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'countryDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map((country, index) => {
                            return (
                                <tr key={index}>
                                    <td>{country.id}</td>
                                    <td className='left'>{country.country}</td>

                                    <td >
                                        <Link className='action-btn' onClick={() => openDeletePopup(country)} ><i className='fa fa-trash-can'></i></Link>
                                        <Link className='action-btn' onClick={() => openEditPopup(country)} ><i className='fa fa-pen-to-square'></i></Link>
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
                {operation === 'update' && <Popup header='Edit Country' body={<CountryForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New Country' body={<CountryForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete Country' body='Are you sure to delete this country?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}
            </div>
        </>
    )
}