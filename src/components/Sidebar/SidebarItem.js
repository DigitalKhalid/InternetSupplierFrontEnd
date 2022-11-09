import React, { useState } from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

export const SidebarItem = (props) => {
    let { title, icon, childrens, path } = props
    const [open, setOpen] = useState(false)

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
                <Link className="sidebar-title" to={path}>
                    <span>
                    <i className={icon}></i>
                        {title}
                    </span>
                </Link>
            </div>
        )
    }
}
