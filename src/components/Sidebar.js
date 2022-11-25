import React, { useState } from 'react'
import '../assets/css/Sidebar.css'
import { SidebarItem } from './SidebarItem'
import items from '../data/Sidebar.json'
import logo from '../assets/images/logo.png'
import avatar from '../assets/images/avatar.jpg'


import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

export const Sidebar = () => {
    const dispatch = useDispatch();
    const { withdrawMoney, depositMoney } = bindActionCreators(actionCreators, dispatch);

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
                        <strong>{localStorage.getItem('username')}</strong>
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

                <div>
                    <button className="btn btn-primary mx-2 my-2" onClick={() => withdrawMoney(500)}>-</button>
                    <button className="btn btn-primary mx-2 my-2" onClick={() => depositMoney(100)}>+</button>
                </div>
            </div>

        </>
    )
}
