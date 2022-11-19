import React, { useState } from 'react'
import LoginContext from './LoginContext'

const LoginState = (props) => {

    return (
        <LoginContext.Provider value={'hi'}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState