import React, { useContext, useState } from "react";
import SubAreaContext from './SubAreaContext'
import AlertContext from "../alert/AlertContext"

const SubAreaState = (props) => {
    const { toggleAlert } = useContext(AlertContext)

    const host = process.env.REACT_APP_HOST
    const [subAreas, setSubAreas] = useState([])

    const blankFields = {
        id: '',
        area: '',
        subarea: '',
    }

    const [subArea, setSubArea] = useState(blankFields)

    const showAlert = (status) => {
        if (status === 200) {
            toggleAlert('success', 'Information of ' + subArea.subarea + ' is updated!')
        } else if (status === 201) {
            toggleAlert('success', 'New SubArea, ' + subArea.subarea + ' is added!')
        } else if (status === 204) {
            toggleAlert('success', subArea.subarea + ' has been deleted!')
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
    const getAllSubAreas = async (field = 'Subarea', sort = 'ASC', search = '', filterField='') => {
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

        const url = `${host}subareaapirelated/${sort + search + filterField}`
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        });
        const json = await response.json();
        setSubAreas(json)
    }


    // Add Record
    const addSubArea = async () => {
        // Add record to server
        const url = `${host}subareaapi/`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },

            body: JSON.stringify(subArea)
        });
        getAllSubAreas('Subarea', 'ASC', '')
        showAlert(response.status)
    }


    // Update Record
    const updateSubArea = async () => {
        // Update record to server side
        const url = `${host}subareaapi/${subArea.id}/`

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
            body: JSON.stringify(subArea)
        });
        // const json = await response.json();
        showAlert(response.status)

        // Update record in frontend
        if (response.ok) {
            getAllSubAreas('Subarea', 'ASC', '')
        }
    }


    // Delete Record
    const deleteSubArea = async () => {
        // delete record from server using API
        const url = `${host}subareaapi/${subArea.id}`

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
            const SubareasLeft = subAreas.filter((con) => { return con.id !== subArea.id })
            setSubAreas(SubareasLeft)
        }
    }


    return (
        <SubAreaContext.Provider value={{ blankFields, subAreas, subArea, setSubArea, getAllSubAreas, addSubArea, updateSubArea, deleteSubArea }}>
            {props.children}
        </SubAreaContext.Provider>
    )
}

export default SubAreaState;