import React, { useEffect, useContext } from 'react'
import Popup from './Popup'
import LoginForm from './LoginForm'
import PopupContext from '../context/popup/PopupContext'
import LoginContext from '../context/login/LoginContext'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ConnectionContext from '../context/connection/ConnectionContext'

const Login = () => {
    const login = useSelector(state => state.authenticate)
    const context = useContext(PopupContext)
    const {updateConnectionStatus} = useContext(ConnectionContext)
    const { togglePopup } = context

    const { getToken } = useContext(LoginContext)

    const navigate = useNavigate()

    useEffect(() => {
        togglePopup()
        //   eslint-disable-next-line
    }, [])

    const authenticate = () => {
        getToken()
        if (login.authtoken !== null) {
            togglePopup()
            navigate('/admin')
            updateConnectionStatus()
        }
    }

    return (
        <>
            <div>
                <Popup header='Login' body={<LoginForm />} btnOk='Login' btnOkClick={authenticate} />
            </div>
        </>
    )
}

export default Login