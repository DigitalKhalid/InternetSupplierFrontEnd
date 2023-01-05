import '../assets/css/Form.css'
import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../features/login/loginSlice'

const MyAccount = () => {
    const user = useSelector((state)=> state.login.users)
    const dispatch = useDispatch()

    useEffect(() => {
      // dispatch(getAllUsers('?user__id=' + localStorage.getItem('userid')))
      // eslint-disable-next-line
    }, [])
    

    const handleOnChange = (event) => {
        // setuser({ ...user, [event.target.name]: event.target.value })
    }

    return (
        <div className='container form'>
            <form className="row g-2">
                <div className="col-md-7">
                    <p className='title required'><strong>Username</strong></p>
                    <input type="text" className="form-control" id="username" name='username' placeholder="" value={user.id} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-7">
                    <p className='title required'><strong>Old Password</strong></p>
                    <input type="password" className="form-control" autoComplete='off' id="old-password" name='old-password' placeholder="" value={user.oldPassword} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-7">
                    <p className='title required'><strong>New Password</strong></p>
                    <input type="password" className="form-control" autoComplete='off' id="new-password" name='new-password' placeholder="" value={user.newPassword} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-7">
                    <p className='title required'><strong>Confirm Password</strong></p>
                    <input type="password" className="form-control" autoComplete='off' id="password" name='password' placeholder="" value={user.password} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default MyAccount