import '../assets/css/Form.css'
import React, { useContext, useEffect, useState } from 'react'
import LoginContext from '../context/login/LoginContext'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthToken, updateCredentials } from '../features/login/loginSlice'

function LoginForm() {
    const context = useContext(LoginContext)
    const [credentials, setCredentials] = useState('')
    // const { credentials, setCredentials, blankFields } = context
    const dispatch = useDispatch()

    useEffect(() => {
        // setCredentials(blankFields)
        //   eslint-disable-next-line
    }, [])

    const handleOnChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
        // dispatch(updateCredentials({[event.target.name]: event.target.value}))
    }
    
    const handleOnBlur = () => {
        dispatch(updateCredentials(credentials))
    }

    const submitForm = () => {
        dispatch(getAuthToken(credentials))
    }

    return (
        <div className='container form'>

            <form className="row g-2">
                <div className="col-md-10">
                    <p className='title'><strong>User Name</strong></p>
                    <input type="text" className="form-control" id="username" name='username' placeholder="" defaultValue={credentials.username} onChange={handleOnChange} onBlur={handleOnBlur}></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title'><strong>Password</strong></p>
                    <input type="password" className="form-control" id="password" name='password' autoComplete='off' placeholder="" defaultValue={credentials.password} onChange={handleOnChange} onBlur={handleOnBlur}></input>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm