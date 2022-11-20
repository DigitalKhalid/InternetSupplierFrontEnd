import React, { useState } from 'react'
import AlertContext from './AlertContext'

const AlertState = (props) => {
    const blankFields = {
        type: '',
        message: '',
    }
    
    const [alert, setAlert] = useState(blankFields)
    
    const toggleAlert = (type, message)=>{
        setAlert({'type':type, 'message':message})

        setTimeout(() => {
            setAlert(blankFields)
        }, 6000);
    }

    return (
        <AlertContext.Provider value={{alert, setAlert, toggleAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState