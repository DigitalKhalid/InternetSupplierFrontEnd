import '../assets/css/Form.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCredentials } from '../features/login/loginSlice'

function LoginForm() {
    const [credentials, setCredentials] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        //   eslint-disable-next-line
    }, [])

    const handleOnChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    
    const handleOnBlur = () => {
        dispatch(updateCredentials(credentials))
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