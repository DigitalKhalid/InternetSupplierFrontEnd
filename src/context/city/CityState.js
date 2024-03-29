import React, { useContext, useState } from "react";
import CityContext from './CityContext'
import AlertContext from "../alert/AlertContext"
import getListURL from "../../functions/URLs";

const CityState = (props) => {
    const { showAlert, toggleAlert } = useContext(AlertContext)

    const host = process.env.REACT_APP_HOST
    const [cities, setCities] = useState([])
    const [citiesCount, setCitiesCount] = useState(0)
    const [citiesNext, setCitiesNext] = useState('')

    const blankFields = {
        id: '',
        country: '',
        city: '',
    }

    const [city, setCity] = useState(blankFields)

    // Get all Records
    const getAllCities = async (sortField = 'city', sort = 'ASC', search = '', filterField = '') => {
        const url = getListURL('cityapirelated', sortField, sort, search, filterField)

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },
            });
            const json = await response.json();
            setCitiesCount(json.count)
            setCities(json.results)
            setCitiesNext(json.next)

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }

    // Get List
    const getCitiesList = async (sortField = 'city', sort = 'ASC', search = '', filterField = '') => {
        const url = getListURL('citylistapi', sortField, sort, search, filterField)

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },
            });
            const json = await response.json();
            setCities(json)

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }

    // Append more records used for pagination
    const getMoreCities = async () => {
        const url = citiesNext

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },
            });
            const json = await response.json();
            setCities(cities.concat(json.results))
            setCitiesNext(json.next)

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }

    // Add Record
    const addCity = async () => {
        // Add record to server
        const url = `${host}cityapi/`

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },

                body: JSON.stringify(city)
            });
            getAllCities('city', 'ASC', '')
            showAlert(response.status, city.city)

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }


    // Update Record
    const updateCity = async () => {
        // Update record to server side
        const url = `${host}cityapi/${city.id}/`

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },
                body: JSON.stringify(city)
            });
            // const json = await response.json();
            showAlert(response.status, city.city)

            // Update record in frontend
            if (response.ok) {
                getAllCities('city', 'ASC', '')
            }

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }


    // Delete Record
    const deleteCity = async () => {
        // delete record from server using API
        const url = `${host}cityapi/${city.id}`

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },
            });
            showAlert(response.status, city.city)

            // delete record from frontend
            if (response.ok) {
                const citiesLeft = cities.filter((con) => { return con.id !== city.id })
                setCities(citiesLeft)
            }

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }


    return (
        <CityContext.Provider value={{ blankFields, cities, city, citiesCount, citiesNext, getMoreCities, setCity, getAllCities, getCitiesList, addCity, updateCity, deleteCity }}>
            {props.children}
        </CityContext.Provider>
    )
}

export default CityState;