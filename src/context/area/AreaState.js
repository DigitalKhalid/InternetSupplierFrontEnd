import React, { useContext, useState } from "react";
import AreaContext from './AreaContext'
import AlertContext from "../alert/AlertContext"
import getListURL from '../../functions/URLs'

const AreaState = (props) => {
    const { showAlert } = useContext(AlertContext)

    const host = process.env.REACT_APP_HOST
    const [areas, setAreas] = useState([])
    const [areasCount, setAreasCount] = useState(0)
    const [areasNext, setAreasNext] = useState('')

    const blankFields = {
        id: '',
        city: '',
        area: '',
    }

    const [area, setArea] = useState(blankFields)


    // Get all Records
    const getAllAreas = async (sortField = 'area', sort = 'ASC', search = '', filterField = '') => {
        const url = getListURL('areaapirelated', sortField, sort, search, filterField)

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        });
        const json = await response.json();
        setAreasCount(json.count)
        setAreas(json.results)
        setAreasNext(json.next)
    }

    // Append more records used for pagination
    const getMoreAreas = async () => {
        const url = areasNext
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        });
        const json = await response.json();
        setAreas(areas.concat(json.results))
        setAreasNext(json.next)
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
        <AreaContext.Provider value={{ blankFields, areas, area, areasCount, areasNext, setArea, getAllAreas, getMoreAreas, addArea, updateArea, deleteArea }}>
            {props.children}
        </AreaContext.Provider>
    )
}

export default AreaState;