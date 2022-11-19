import React, { useState } from 'react'
import './Sidebar.css'
import { SidebarItem } from './SidebarItem'
import items from './Sidebar.json'
import logo from '../logo.png'
import avatar from '../../components/avatar.jpg'


export const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <>
            <div className={`${sidebarOpen ? "sidebar-open-btn hide" : "sidebar-open-btn"}`} onClick={toggleSidebar}>
                <i className='fa fa-bars'></i>
            </div>


            <div className={`${sidebarOpen ? "sidebar" : "sidebar close"}`}>
                {/* close button to sidebar */}
                <div className="sidebar-close-btn" onClick={toggleSidebar}>
                    <i className='fa fa-times'></i>
                </div>

                <div className="user-info">
                    <img className="avatar" src={avatar} alt="Logo" />
                    <div className='user'>
                        <p>Welcome!</p>
                        <h3>Admin</h3>
                    </div>
                </div>
                <hr />

                <div className='sidebar-menu'>
                    {items.map((item, index) => {
                        return (
                            <SidebarItem key={index} title={item.title} icon={item.icon} childrens={item.childrens} path={item.path} />
                        )
                    })}
                </div>
                <hr />
                {/* <div className="copywrite">
                    <a href='https://bizzsole.com' target='_blank' rel="noreferrer" className="bizz-footer">
                        <img src={logo} alt="BizzSole" />
                    </a>
                </div> */}
            </div>

        </>
    )
}
