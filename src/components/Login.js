import React, { useEffect, useContext } from 'react'
import Popup from './Popup'
import LoginForm from './LoginForm'
import PopupContext from '../context/popup/PopupContext'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthToken } from '../features/login/loginSlice'


const Login = () => {
    const dispatch = useDispatch()
    const credentials = useSelector((state) => state.login.credentials)
    const context = useContext(PopupContext)
    const { togglePopup } = context

    const navigate = useNavigate()

    useEffect(() => {
        togglePopup()

        if (localStorage.getItem('authtoken')) {            
            togglePopup()
            navigate('/')
        }
        //   eslint-disable-next-line
    }, [localStorage.getItem('authtoken')])

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