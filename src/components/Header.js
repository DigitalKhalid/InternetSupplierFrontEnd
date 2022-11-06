import React from 'react'
import Logo from './logo.png'

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={Logo} alt="Logo" style={{ height: '50px', width: '180px' }} />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <a className="nav-link active text-right" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-right" href="/">Link</a>
                        </li> */}
                    </ul>
                    <span class="navbar-text mx-2">
                        Welcome! Admin
                    </span>
                    <button className="btn btn-primary btn-sm float-right mx-1">Logout</button>
                    {/* <button className="btn btn-primary btn-sm float-right mx-1">Register</button> */}
                </div>
            </div>
        </nav>
    )
}