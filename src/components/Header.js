import React from 'react'
import Logo from './logo.png'

export const Header = () => {
    return (
        <nav>
            <div className="navbar">
                <div className="navbar-items">
                    hello
                </div>
                <div className="nav-msg">
                    welcome admin
                </div>
                <div className="nav-btn">
                    <button className="btn btn-primary btn-sm">Logout</button>
                </div>
            </div>
        </nav>
        // <nav className="navbar navbar-expand-lg bg-light">
        //     <div className="container-fluid">
        //         <a className="navbar-brand" href="/">
        //             <img src={Logo} alt="Logo" style={{ height: '50px', width: '180px' }} />
        //         </a>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
        //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //             <span class="navbar-text mx-2">
        //                 Welcome! Admin
        //             </span>
        //             </ul>
        //             <button className="btn btn-primary btn-sm float-right mx-1">Logout</button>
        //         </div>
        //     </div>
        // </nav>
    )
}