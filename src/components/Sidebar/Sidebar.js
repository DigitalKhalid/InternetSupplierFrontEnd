import React, { useState } from 'react'
import './Sidebar.css'
import { SidebarItem } from './SidebarItem'
import items from './Sidebar.json'

export const Sidebar = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        props.expand(!sidebarOpen)
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <>
            <div className={`${sidebarOpen ? "sidebar-open-btn hide" : "sidebar-open-btn"}`} onClick={toggleSidebar}>
                <i className='fa fa-bars'></i>
            </div>

            <div className={`${sidebarOpen ? "sidebar" : "sidebar close"}`}>
                <div className="sidebar-close-btn" onClick={toggleSidebar}>
                    {/* <i className='fa fa-times'></i> */}
                </div>

                <div className='sidebar-menu'>
                    {items.map((item, index) => {
                        return (
                            <SidebarItem key={index} title={item.title} icon={item.icon} childrens={item.childrens} path={items.path} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
