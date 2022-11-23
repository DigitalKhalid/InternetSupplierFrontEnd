import React, { useState, useEffect, useContext } from 'react'
import LoginContext from './LoginContext'
import AlertContext from '../alert/AlertContext'

const LoginState = (props) => {
  const host = process.env.REACT_APP_HOST
  const { toggleAlert } = useContext(AlertContext)

  const blankFields = {
    username: '',
    password: '',
  }

  const [credentials, setCredentials] = useState(blankFields)

  useEffect(() => {
    console.log(localStorage.getItem('authtoken'))
  }, [])

  const showAlert = (status) => {
    if (status === 200) {
      toggleAlert('success', 'Welcome! ' + credentials.username)
    } else if (status > 399 && status < 405) {
      toggleAlert('error', 'Invalid username or password.')
    } else if (status > 499) {
      toggleAlert('error', '(' + status + ') Application is unable to connect to the server.')
    }
  }

  // Get AuthToken
  const getToken = async () => {
    const url = `${host}gettoken/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },

      body: JSON.stringify(credentials)
    });

    const json = await response.json();
    showAlert(response.status)

    if (response.ok) {
      localStorage.setItem('authtoken', json.token)
      localStorage.setItem('username', credentials.username)
    }
  }

  return (
    <LoginContext.Provider value={{ credentials, setCredentials, getToken, blankFields }}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginState