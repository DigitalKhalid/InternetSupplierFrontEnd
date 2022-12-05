import React, { useContext, useState } from "react";
import CountryContext from './CountryContext'
import AlertContext from "../alert/AlertContext"
import getListURL from "../../functions/URLs";

const CountryState = (props) => {
    const { showAlert } = useContext(AlertContext)

    const host = process.env.REACT_APP_HOST
    const [countries, setCountries] = useState([])
    const [countriesCount, setCountriesCount] = useState(0)
    const [countriesNext, setCountriesNext] = useState('')

    const blankFields = {
        id: '',
        country: '',
    }

    const [country, setCountry] = useState(blankFields)

    // Get all Records
    const getAllCountries = async (sortField = 'country', sort = 'ASC', search = '', filterField = '') => {
        const url = getListURL('countryapi', sortField, sort, search, filterField)
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        });
        const json = await response.json();
        setCountriesCount(json.count)
        setCountries(json.results)
        setCountriesNext(json.next)
    }

    // Append more records used for pagination
    const getMoreCountries = async () => {
        const url = countriesNext
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        });
        const json = await response.json();
        setCountries(countries.concat(json.results))
        setCountriesNext(json.next)
    }

    // Add Record
    const addCountry = async () => {
        // Add record to server
        const url = `${host}countryapi/`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },

            body: JSON.stringify(country)
        });
        getAllCountries('country', 'ASC', '')
        showAlert(response.status, country.country)
    }


    // Update Record
    const updateCountry = async () => {
        // Update record to server side
        const url = `${host}countryapi/${country.id}/`

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
            body: JSON.stringify(country)
        });
        // const json = await response.json();
        showAlert(response.status, country.country)

        // Update record in frontend
        if (response.ok) {
            getAllCountries('country', 'ASC', '')
        }
    }


    // Delete Record
    const deleteCountry = async () => {
        // delete record from server using API
        const url = `${host}countryapi/${country.id}`

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        });
        showAlert(response.status, country.country)

        // delete record from frontend
        if (response.ok) {
            const CountrysLeft = countries.filter((con) => { return con.id !== country.id })
            setCountries(CountrysLeft)
        }
    }


    return (
        <CountryContext.Provider value={{ blankFields, countries, countriesCount, countriesNext, country, setCountry, getAllCountries, getMoreCountries, addCountry, updateCountry, deleteCountry }}>
            {props.children}
        </CountryContext.Provider>
    )
}

export default CountryState;