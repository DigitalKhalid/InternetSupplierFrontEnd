import React, { useEffect, useContext } from 'react'
import Popup from './Popup'
import LoginForm from './LoginForm'
import PopupContext from '../context/popup/PopupContext'

const Login = () => {
    const context = useContext(PopupContext)
    const { togglePopup } = context

    useEffect(() => {
        togglePopup()
        //   eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="login-overlay" />
            <div>
                <Popup header='Login' body={<LoginForm />} btnCancel='Cancel' btnOk='Login' />
            </div>
        </>
    )
}

export default Login