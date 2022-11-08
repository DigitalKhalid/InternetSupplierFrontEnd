import React, { useState } from 'react'
import './Sidebar.css'
import './Sidebar.json'

export const SidebarItem = (props) => {
    let { title, icon, childrens, path } = props
    const [open, setOpen] = useState(false)

    if (childrens) {
        return (
            <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
                <button className="sidebar-title" onClick={() => setOpen(!open)}>
                    <span>
                        <i className={icon}></i>
                        {title}
                    </span>
                    <i className='fa fa-angle-right toggle-btn'></i>
                </button>
                <button className="sidebar-content">
                    {childrens.map((item, index) => {
                        return (
                            <SidebarItem key={index} title={item.title} icon={item.icon} childrens={item.childrens} path={item.path}/>
                        )
                    })}
                </button>
            </div>
        )
    } else {
        return (
            <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
                <button className="sidebar-title" onClick={() => setOpen(!open)}>
                    <span>
                    <i className={icon}></i>
                        {title}
                    </span>
                </button>
            </div>
        )
    }
}
