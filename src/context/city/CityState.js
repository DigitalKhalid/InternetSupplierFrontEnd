import React, { useContext, useState } from "react";
import CityContext from './CityContext'
import AlertContext from "../alert/AlertContext"

const CityState = (props) => {
    const { toggleAlert } = useContext(AlertContext)

    const host = process.env.REACT_APP_HOST
    const [cities, setCities] = useState([])

    const blankFields = {
        id: '',
        country: '',
        city: '',
    }

    const [city, setCity] = useState(blankFields)

    const showAlert = (status) => {
        if (status === 200) {
            toggleAlert('success', 'Information of ' + city.city + ' is updated!')
        } else if (status === 201) {
            toggleAlert('success', 'New city, ' + city.city + ' is added!')
        } else if (status === 204) {
            toggleAlert('success', city.city + ' has been deleted!')
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
    const getAllCities = async (field = 'city', sort = 'ASC', search = '', filterField='') => {
        console.log(field)
        console.log(filterField)
        if (sort === 'DESC') {
            field = '-' + field
        }

        if (field !== null) {
            sort = '?ordering=' + field
        }

        if (field === null & search !== '') {
            if (filterField !== '') {
                search = '?' + filterField + '=' + search
            } else {
                search = '?search=' + search
            }

        } else if (field !== null & search !== '') {
            if (filterField !== '') {
                search = '&' + filterField + '=' + search
            } else {
                search = '&search=' + search
            }
        }

        const url = `${host}cityapirelated/${sort + search}`
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
        setCities(json)
    }


    // Add Record
    const addCity = async () => {
        // Add record to server
        const url = `${host}cityapi/`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },

            body: JSON.stringify(city)
        });
        getAllCities('city', 'ASC', '')
        showAlert(response.status)
    }


    // Update Record
    const updateCity = async () => {
        // Update record to server side
        const url = `${host}cityapi/${city.id}/`

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
            body: JSON.stringify(city)
        });
        // const json = await response.json();
        showAlert(response.status)

        // Update record in frontend
        if (response.ok) {
            getAllCities('city', 'ASC', '')
        }
    }


    // Delete Record
    const deleteCity = async () => {
        // delete record from server using API
        const url = `${host}cityapi/${city.id}`

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
            const citiesLeft = cities.filter((con) => { return con.id !== city.id })
            setCities(citiesLeft)
        }
    }


    return (
        <CityContext.Provider value={{ blankFields, cities, city, setCity, getAllCities, addCity, updateCity, deleteCity }}>
            {props.children}
        </CityContext.Provider>
    )
}

export default CityState;