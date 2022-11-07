import React, { useState } from 'react'
import './SideMenu.css'

export const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    // const style = {
    //     overflow: 'hidden',
    //     height: 0,
    //     transition: '2s ease'
    // }

    const toggleSubMenu = (id) => {
        let item = document.getElementById(id)
        console.log(item.style.height)
        if (item.style.height === '0px') {
            document.getElementById(id).style.overflow = 'hidden'
            document.getElementById(id).style.height = '100px'
            document.getElementById(id).style.transition = '0.2s'
        } else {
            document.getElementById(id).style.overflow = 'hidden'
            document.getElementById(id).style.height = 0
            document.getElementById(id).style.transition = '0.2s'
        }
    }

    return (
        <div>
            <div className='side-menu'>
                <div className="menu">
                    <div className="item"><button><i className='fa fa-desktop'></i>Dashboard</button></div>

                    <div className="item">
                        <button className='sub-btn' onClick={() => toggleSubMenu('customers')}><i className='fa fa-users'></i>Customers <i className='fa fa-angle-right dropdown'></i></button>
                        <div className="sub-menu" id='customers'>
                            <button className='sub-item'><i className='fa fa-user-plus'></i>Add New</button>
                            <button className='sub-item'><i className='fa fa-list'></i>View List</button>
                        </div>
                    </div>

                    <div className="item">
                        <button className='sub-btn' onClick={() => toggleSubMenu('subdealers')}><i className='fa fa-user'></i>Sub Dealers<i className='fa fa-angle-right dropdown'></i></button>
                        <div className="sub-menu" id='subdealers'>
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
