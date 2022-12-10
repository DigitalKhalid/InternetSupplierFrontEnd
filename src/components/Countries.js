import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CountryContext from '../context/country/CountryContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import CountryForm from './CountryForm'
import Pagination from './Pagination'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../components/Spinner'

export const Countries = () => {
    const context = useContext(CountryContext)
    const { blankFields, countries, setCountry, countriesCount, countriesNext, getAllCountries, getMoreCountries, addCountry, deleteCountry, updateCountry } = context
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
            <div className='list' id='list'>
                <InfiniteScroll
                    scrollableTarget='list'
                    dataLength={countries.length}
                    next={getMoreCountries}
                    hasMore={countries.length < countriesCount}
                    loader={<Spinner/>}
                >
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
                </InfiniteScroll>
            </div>

            {/* Pagination */}
            <Pagination showedRecords={countries.length} totalRecords={countriesCount} nextPage={countriesNext} getMoreRecords={getMoreCountries} />

            {/* Popup Forms */}
            <div>
                {operation === 'update' && <Popup header='Edit Country' body={<CountryForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New Country' body={<CountryForm />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete Country' body='Are you sure to delete this country?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}
            </div>
        </>
    )
}