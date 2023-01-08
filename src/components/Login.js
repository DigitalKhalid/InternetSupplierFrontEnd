import React, { useEffect, useContext } from 'react'
import Popup from './Popup'
import LoginForm from './LoginForm'
import PopupContext from '../context/popup/PopupContext'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthToken } from '../features/login/loginSlice'
import AlertContext from '../context/alert/AlertContext'
import { updateConnectionOrderRenewal } from '../functions/Orders'

const Login = () => {
    const dispatch = useDispatch()
    const { toggleAlert } = useContext(AlertContext)
    const credentials = useSelector((state) => state.login.credentials)
    const user = useSelector((state) => state.login.user)
    const error = useSelector((state) => state.login.error)
    const context = useContext(PopupContext)
    const { togglePopup } = context

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
            togglePopup()
            navigate('/')
            // window.location.reload()
        } else if (error) {
            toggleAlert('error', error)
        } else {
            togglePopup()
        }
        //   eslint-disable-next-line
    }, [user])

    const authenticate = () => {
        dispatch(getAuthToken(credentials))
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