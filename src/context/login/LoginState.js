import React, { useState, useEffect } from 'react'
import LoginContext from './LoginContext'

const LoginState = (props) => {
    const host = process.env.REACT_APP_HOST
    const [authToken, setAuthToken] = useState(null)

    const blankFields = {
        username: '',
        password: '',
    }

    const [credentials, setCredentials] = useState(blankFields)
    
    useEffect(() => {
        setAuthToken(localStorage.getItem('authtoken'))
      }, [authToken])
      
    // Get AuthToken
    const getToken = async () => {
        const url = `${host}gettoken/`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authToken
            },

            body: JSON.stringify(credentials)
        });

        const json = await response.json();
        setAuthToken(json.token)
        localStorage.setItem('authtoken', json.token)
        localStorage.setItem('username', credentials.username)
    }

    return (
        <LoginContext.Provider value={{credentials, setCredentials, getToken, authToken, setAuthToken}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState