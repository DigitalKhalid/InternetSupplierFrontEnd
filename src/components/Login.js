import React, { useEffect, useContext } from 'react'
import Popup from './Popup'
import LoginForm from './LoginForm'
import PopupContext from '../context/popup/PopupContext'
import LoginContext from '../context/login/LoginContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const context = useContext(PopupContext)
    const { togglePopup } = context

    const { authToken, getToken } = useContext(LoginContext)
    const navigate = useNavigate()

    useEffect(() => {
        togglePopup()
        //   eslint-disable-next-line
    }, [])

    const authenticate = () => {
        getToken()
        togglePopup()
        navigate('/admin')
    }

    return (
        <>
            {/* <div className="login-overlay" /> */}
            <div>
                <Popup header='Login' body={<LoginForm />} btnCancel='Cancel' btnOk='Login' btnOkClick={authenticate} />
            </div>
        </>
    )
}

export default Login