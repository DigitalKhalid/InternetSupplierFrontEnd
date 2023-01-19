import React, { useContext, useState } from "react";
import SubAreaContext from './SubAreaContext'
import AlertContext from "../alert/AlertContext"
import getListURL from "../../functions/URLs";

const SubAreaState = (props) => {
    const { showAlert, toggleAlert } = useContext(AlertContext)

    const host = process.env.REACT_APP_HOST
    const [subAreas, setSubAreas] = useState([])
    const [subAreasCount, setSubAreasCount] = useState(0)
    const [subAreasNext, setSubAreasNext] = useState('')

    const blankFields = {
        id: '',
        area: '',
        subarea: '',
    }

    const [subArea, setSubArea] = useState(blankFields)


    // Get all Records
    const getAllSubAreas = async (sortField = 'subarea', sort = 'ASC', search = '', filterField = '') => {
        const url = getListURL('subareaapirelated', sortField, sort, search, filterField)

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },
            });
            const json = await response.json();
            setSubAreasCount(json.count)
            setSubAreas(json.results)
            setSubAreasNext(json.next)

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }

    // Get List
    const getSubAreasList = async (sortField = 'subarea', sort = 'ASC', search = '', filterField = '') => {
        const url = getListURL('subarealistapi', sortField, sort, search, filterField)

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },
            });
            const json = await response.json();
            setSubAreas(json)

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }

    // Append more records used for pagination
    const getMoreSubAreas = async () => {
        const url = subAreasNext

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },
            });
            const json = await response.json();
            setSubAreas(subAreas.concat(json.results))
            setSubAreasNext(json.next)

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }

    // Add Record
    const addSubArea = async () => {
        // Add record to server
        const url = `${host}subareaapi/`

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },

                body: JSON.stringify(subArea)
            });
            getAllSubAreas('Subarea', 'ASC', '')
            showAlert(response.status, subArea.subarea)

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }


    // Update Record
    const updateSubArea = async () => {
        // Update record to server side
        const url = `${host}subareaapi/${subArea.id}/`

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },
                body: JSON.stringify(subArea)
            });
            // const json = await response.json();
            showAlert(response.status, subArea.subarea)

            // Update record in frontend
            if (response.ok) {
                getAllSubAreas()
            }

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }


    // Delete Record
    const deleteSubArea = async () => {
        // delete record from server using API
        const url = `${host}subareaapi/${subArea.id}`

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('authtoken')
                },
            });
            showAlert(response.status, subArea.subarea)

            // delete record from frontend
            if (response.ok) {
                const SubareasLeft = subAreas.filter((con) => { return con.id !== subArea.id })
                setSubAreas(SubareasLeft)
            }

        } catch (error) {
            toggleAlert('error', error.message)
        }
    }


    return (
        <SubAreaContext.Provider value={{ blankFields, subAreas, subArea, subAreasCount, subAreasNext, setSubArea, getAllSubAreas, getSubAreasList, getMoreSubAreas, addSubArea, updateSubArea, deleteSubArea }}>
            {props.children}
        </SubAreaContext.Provider>
    )
}

export default SubAreaState;