import React, { useState } from 'react'
import './SideMenu.css'

export const SideMenu = () => {
    const buttonHeight = 50

    const subMenuStyle = {
        overflow: 'hidden',
        height: 0,
    }

    const toggleSubMenu = (id, items, event) => {
        let menu = document.getElementById(id)
        if (menu.style.height === '0px') {
            document.getElementById(id).style.height = `${buttonHeight*items}px`
            document.getElementById(id).style.transition = '0.2s'
            document.getElementById(`${id}-dropdown`).style.transform ='rotate(90deg)'
            
        } else {
            document.getElementById(id).style.height = 0
            document.getElementById(id).style.transition = '0.2s'
            document.getElementById(`${id}-dropdown`).style.transform ='rotate(0deg)'
        }
    }

    return (
        <div>
            <div className='side-menu'>
                <div className="close-btn">
                    <i className='fa fa-times'></i>
                </div>

                <div className="menu">
                    <div className="item"><button><i className='fa fa-desktop'></i>Dashboard</button></div>

                    <div className="item">
                        <button className='sub-btn' onClick={() => toggleSubMenu('customers', 2)}><i className='fa fa-users'></i>Customers <i className='fa fa-angle-right dropdown' id='customers-dropdown'></i></button>

                        <div className="sub-menu" style={subMenuStyle} id='customers'>
                            <button className='sub-item'><i className='fa fa-user-plus'></i>Add New</button>
                            <button className='sub-item'><i className='fa fa-list'></i>View List</button>
                        </div>
                    </div>

                    <div className="item">
                        <button className='sub-btn' onClick={() => toggleSubMenu('subdealers', 2)}><i className='fa fa-user'></i>Sub Dealers<i className='fa fa-angle-right dropdown' id='subdealers-dropdown'></i></button>

                        <div className="sub-menu" style={subMenuStyle} id='subdealers'>
                            <button className='sub-item'><i className='fa-solid fa-person-circle-plus'></i>Add New</button>
                            <button className='sub-item'><i className='fa fa-list'></i>View List</button>
                        </div>
                    </div>

                    <div className="item"><button><i className='fa fa-wifi'></i>Connections</button></div>
                    <div className="item"><button><i className='fa fa-cube'></i>Packages</button></div>
                    <div className="item"><button><i className='fa fa-message'></i>Complaints</button></div>
                    <div className="item"><button><i className='fa fa-user-tie'></i>My Account</button></div>
                    <div className="item"><button><i className='fa fa-sliders'></i>Settings</button></div>
                    <div className="item"><button><i className='fa fa-circle-info'></i>About</button></div>
                </div>
            </div>
        </div>
    )
}
