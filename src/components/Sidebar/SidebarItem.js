import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'

export const SidebarItem = (props) => {
    let { title, icon, childrens, path } = props
    const [open, setOpen] = useState(false)
    
    let location = useLocation();
    
    useEffect(() => {
        console.log(location.pathname)

    }, [location])

    if (childrens) {
        return (
            <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
                <span className="sidebar-title" onClick={() => setOpen(!open)}>
                    <span>
                        <i className={icon}></i>
                        {title}
                    </span>
                    <i className='fa fa-angle-right toggle-btn'></i>
                </span>

                <span className="sidebar-content">
                    {childrens.map((item, index) => {
                        return (
                            <SidebarItem key={index} title={item.title} icon={item.icon} childrens={item.childrens} path={item.path}/>
                        )
                    })}
                </span>
            </div>
        )
    } else {
        return (
            <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
                <Link className={`${location.pathname=== path ? "sidebar-title active":"sidebar-title"}`} to={path}>
                    <span>
                    <i className={icon}></i>
                        {title}
                    </span>
                </Link>
            </div>
        )
    }
}
