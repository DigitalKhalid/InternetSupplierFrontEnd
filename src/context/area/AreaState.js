import React, { useContext, useState } from "react";
import AreaContext from './AreaContext'
import AlertContext from "../alert/AlertContext"

const AreaState = (props) => {
    const { toggleAlert } = useContext(AlertContext)

    const host = process.env.REACT_APP_HOST
    const [areas, setAreas] = useState([])

    const blankFields = {
        id: '',
        city: '',
        area: '',
    }

    const [area, setArea] = useState(blankFields)

    const showAlert = (status) => {
        if (status === 200) {
            toggleAlert('success', 'Information of ' + area.area + ' is updated!')
        } else if (status === 201) {
            toggleAlert('success', 'New Area, ' + area.area + ' is added!')
        } else if (status === 204) {
            toggleAlert('success', area.area + ' has been deleted!')
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
    const getAllAreas = async (field = 'area', sort = 'ASC', search = '', filterField='') => {
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

        const url = `${host}areaapirelated/${sort + search + filterField}`
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        });
        const json = await response.json();
        setAreas(json)
    }


    // Add Record
    const addArea = async () => {
        // Add record to server
        const url = `${host}areaapi/`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },

            body: JSON.stringify(area)
        });
        getAllAreas('area', 'ASC', '')
        showAlert(response.status)
    }


    // Update Record
    const updateArea = async () => {
        // Update record to server side
        const url = `${host}areaapi/${area.id}/`

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
            body: JSON.stringify(area)
        });
        // const json = await response.json();
        showAlert(response.status)

        // Update record in frontend
        if (response.ok) {
            getAllAreas('area', 'ASC', '')
        }
    }


    // Delete Record
    const deleteArea = async () => {
        // delete record from server using API
        const url = `${host}areaapi/${area.id}`

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
            const areasLeft = areas.filter((con) => { return con.id !== area.id })
            setAreas(areasLeft)
        }
    }


    return (
        <AreaContext.Provider value={{ blankFields, areas, area, setArea, getAllAreas, addArea, updateArea, deleteArea }}>
            {props.children}
        </AreaContext.Provider>
    )
}

export default AreaState;