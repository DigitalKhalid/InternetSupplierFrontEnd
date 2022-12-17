import '../assets/css/Error.css'
import '../assets/css/Admin.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className="admin">
            <div className='error-404'>
                <div className='page-content'>
                    <h1 className='error-title'>
                        <strong>Oops!</strong>
                    </h1>

                    <h3>
                        <small>404 - PAGE NOT FOUND</small>
                    </h3>

                    <p>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                    <h2>
                        <button className='btn btn-primary' onClick={handleGoBack}>Go Back</button>
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Error