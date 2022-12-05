import React, { useState } from 'react'
import AlertContext from './AlertContext'

const AlertState = (props) => {
    const blankFields = {
        type: '',
        message: '',
    }
    
    const [alert, setAlert] = useState(blankFields)
    
    const showAlert = (status, recordTitle) => {
        if (status === 200) {
            toggleAlert('success', 'Information of ' + recordTitle + ' is updated!')
        } else if (status === 201) {
            toggleAlert('success', 'New Area, ' + recordTitle + ' is added!')
        } else if (status === 204) {
            toggleAlert('success', recordTitle + ' has been deleted!')
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

    const toggleAlert = (type, message)=>{
        setAlert({'type':type, 'message':message})

        setTimeout(() => {
            setAlert(blankFields)
        }, 6000);
    }

    return (
        <AlertContext.Provider value={{alert, setAlert, toggleAlert, showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState