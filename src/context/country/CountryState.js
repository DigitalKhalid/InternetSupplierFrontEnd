import React, { useContext, useState } from "react";
import CountryContext from './CountryContext'
import AlertContext from "../alert/AlertContext"

const CountryState = (props) => {
    const { toggleAlert } = useContext(AlertContext)

    const host = process.env.REACT_APP_HOST
    const [countries, setCountries] = useState([])

    const blankFields = {
        id: '',
        country: '',
    }

    const [country, setCountry] = useState(blankFields)

    const showAlert = (status) => {
        if (status === 200) {
            toggleAlert('success', 'Information of ' + country.country + ' is updated!')
        } else if (status === 201) {
            toggleAlert('success', 'New Country, ' + country.country + ' is added!')
        } else if (status === 204) {
            toggleAlert('success', country.country + ' has been deleted!')
        } else if (status === 400) {
            toggleAlert('error', '(' + status + ') Invalid request or data.')
        } else if (status === 401) {
            toggleAlert('error', '(' + status + ') Application is unable to recognize your identity. Please login through valid credentials.')
        } else if (status === 403) {
            toggleAlert('warning', '(' + status + ') You are not authorize to perform this action.')
        } else if (status === 404) {
            toggleAlert('error', '(' + status + ') Information not found. Unable to process your requested.')
        } else if (status > 499) {
            toggleAlert('error', '(' + status + ') Application is unable to connect to the server.')
        }
    }


    // Get all Records
    const getAllCountries = async (field, sort, search) => {
        if (sort === 'DESC') {
            field = '-' + field
        }
        if (field !== null) {
            sort = '?ordering=' + field
        }
        if (field === null & search !== '') {
            search = '?search=' + search
        } else if (field !== null && search !== '') {
            search = '&search=' + search
        }

        const url = `${host}countryapi/${sort + search}`
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        });
        const json = await response.json();
        console.log(json)
        setCountries(json)
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
        showAlert(response.status)
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
        showAlert(response.status)

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
        showAlert(response.status)

        // delete record from frontend
        if (response.ok) {
            const CountrysLeft = countries.filter((con) => { return con.id !== country.id })
            setCountries(CountrysLeft)
        }
    }


    return (
        <CountryContext.Provider value={{ blankFields, countries, country, setCountry, getAllCountries, addCountry, updateCountry, deleteCountry }}>
            {props.children}
        </CountryContext.Provider>
    )
}

export default CountryState;