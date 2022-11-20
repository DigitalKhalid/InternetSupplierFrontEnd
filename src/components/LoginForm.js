import React, {useContext, useEffect} from 'react'
import LoginContext from '../context/login/LoginContext'

function LoginForm() {
  const context = useContext(LoginContext)
  const { credentials, setCredentials, blankFields } = context

  useEffect(() => {
    setCredentials(blankFields)
  }, [])
  
  const handleOnChange = (event) => {
      setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
      <div className='container'>
          <form className="row g-2">
              <div className="col-md-8">
                  <p className='title'><strong>User Name</strong></p>
                  <input type="text" className="form-control" id="username" name='username' placeholder="" defaultValue={credentials.username} onChange={handleOnChange} ></input>
                  <p className='label'></p>
              </div>

              <div className="col-md-8">
                  <p className='title'><strong>Password</strong></p>
                  <input type="password" className="form-control" id="password" name='password' autoComplete='on' placeholder="" defaultValue={credentials.password} onChange={handleOnChange} ></input>
                  <p className='label'></p>
              </div>
          </form>
      </div>
  )
}

export default LoginForm