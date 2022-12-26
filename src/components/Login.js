import React, { useEffect, useContext } from 'react'
import Popup from './Popup'
import LoginForm from './LoginForm'
import PopupContext from '../context/popup/PopupContext'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthToken } from '../features/login/loginSlice'
import ConnectionContext from '../context/connection/ConnectionContext'
// import OrderContext from '../context/order/OrderContext'


const Login = () => {
    const dispatch = useDispatch()
    const credentials = useSelector((state) => state.login.credentials)
    const user = useSelector((state) => state.login.user)

    const context = useContext(PopupContext)
    const { updateConnectionStatus } = useContext(ConnectionContext)
    const { togglePopup } = context

    const navigate = useNavigate()

    useEffect(() => {
        togglePopup()
        //   eslint-disable-next-line
    }, [])

    const authenticate = () => {
        dispatch(getAuthToken(credentials))
        if (user.token) {
            togglePopup()
            navigate('/')
            // updateConnectionStatus()
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