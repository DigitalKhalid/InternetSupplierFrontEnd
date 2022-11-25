import '../assets/css/Alert.css'
import React, { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext'

export default function Alerts() {
    const { alert } = useContext(AlertContext)

    return (
        <div>
        {<div  id='alerts' className={`my-alerts alert-${alert.type}`}>
            <strong>{alert.message}</strong>
        </div>}
        </div>
    )
}